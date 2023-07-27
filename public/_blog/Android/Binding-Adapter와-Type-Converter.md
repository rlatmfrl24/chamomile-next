---
title: Binding Adapter와 Type Converter
date: 2021-03-08 09:25:84
category: Android
draft: false
---

## 개요

Binding Adapter와 Type Converter는 완전히 다른 개념이지만, 개인적으로는 이 두가지는 프로젝트 개발 당시에 동시에 이슈가 터지는 항목이다.

왜냐면 나는 데이터 모델링과 Data binding 적용 시에 자료형 선언 및 관리에 세심한 주의를 기울이지 않는 큰 단점이 있기 때문이다

데이터 모델링 당시에 기본 자료형이 아닌 Customize된 자료형을 쓰거나, Enum Class를 사용할 경우에는 Data Binding이나 Room Database에 적용할 때는 별도의 자료형 변환을 적용해 주어야 하는데, 매번 까먹고 있다가 구글링하는 수고를 반복하고 있다.

어쨌건 추후에 생기는 낭비를 줄이기 위해, Custom 자료형을 사용하는 경우 Binding Adapter과 Room Database 적용을 위해 주의해야 할 점을 기록해둔다.

## Custom 자료형

나는 프로젝트 제작 당시에 **Enum**을 Entity에 적용하여 데이터 클래스를 다음과 같이 만들었다.

```kotlin
@Parcelize
@Entity
data class Recipe(
        @PrimaryKey(autoGenerate = true) val recipeId: Long?,
        @ColumnInfo var name: String,
        @ColumnInfo var primaryMakingStyle: MakingStyle,
        @ColumnInfo var secondaryMakingStyle: MakingStyle?,
        @ColumnInfo var glass: String,
        @ColumnInfo var garnish: String?,
        @ColumnInfo var applyMockTest: Boolean
) : Parcelable {
        fun combineMakingStylesToString(): String {
                val makingStyleString = primaryMakingStyle.name
                val secondStyle = secondaryMakingStyle?: return makingStyleString
                return makingStyleString + " / " + secondStyle.name
        }
}
```
해당 Entity의 `primaryMakingStyle`과 `secondaryMakingStyle`은 `MakingStyle`이라는 Enum Class를 자료형으로 사용하는 필드이다.

```kotlin
enum class MakingStyle {
    Build,
    Stir,
    Float,
    Shake,
    Blend,
    None
}
```


## Room Database 적용 - Type Converter

기본적으로 Room Database는 기본 자료형이 아닌 Custom 자료형을 지원하지 않기 때문에, 해당 자료형을 포함한 Entity에 대한 Type Convertor를 요구한다.

따라서 이를 위한 Type Convertor를 다음과 같이 정의해준다.
```kotlin
import androidx.room.TypeConverter

companion object {
    class Converters {
        @TypeConverter
        fun makingStyleToString(makingStyle: MakingStyle?): String? {
            return makingStyle?.name
        }
        @TypeConverter
        fun stringToMakingStyles(value: String?): MakingStyle {
            return if (value.isNullOrEmpty()) {
                MakingStyle.None
            } else {
                MakingStyle.valueOf(value)
            }
        }
    }
}
```
이렇게 정의한 Type Convertor를 다음과 같이 Room Database에서 적용시켜준다.

```kotlin
@Database(entities = [Recipe::class, Ingredient::class], version = 2)
@TypeConverters(Constants.Companion.Converters::class)
abstract class AppDatabase: RoomDatabase() {
    abstract fun recipeDao(): RecipeDao
}
```

이러면 이제 Entity에 `MakingStyle`이라는 Enum 자료형이 있더라고 해당 Type Convertor가 Room에는 `String` 자료형으로 저장하고, 코드 안에서는 Enum으로써 동작할 수 있도록 변환해준다.


## Data Binding 적용 - Binding Adapter

만약 Custom 자료형을 가진 Entity와 View가 Data binding을 통해 연결된다면 어떤 문제가 있을까?

앞서 언급한 `Recipe` 클래스는 `MakingStyle`라고 정의된 Enum Class를 사용하지만, View에서는 이를 `String` 자료형으로 사용한다. 만약 사용자가 View에서 `MakingStyle`를 인식하여 적용하더라도 이는 데이터가 `String` 형태이기 때문에 Databinding으로 연결된 `Recipe` 클래스의 `MakingStyle` 자료형과 충돌이 발생하는 것이다.

이를 해소하기 위하여 Databinding에서 Binding Adapter를 다음과 같이 정의해준다.

```kotlin
class BindingAdapter {
    object MakingStyleConverter {
        @BindingAdapter("text")
        @JvmStatic
        fun setMakingStyle(view: AutoCompleteTextView, value: MakingStyle?){
            if (view.text.toString() != value?.name) {
                view.setText(value?.name)
            }
        }

        @InverseBindingAdapter(attribute = "text")
        @JvmStatic
        fun getMakingStyle(view: AutoCompleteTextView) : MakingStyle{
            return MakingStyle.valueOf(view.text.toString())
        }

        @BindingAdapter("textAttrChanged")
        @JvmStatic
        fun setMakingStyleListener(
            view: AutoCompleteTextView,
            attrChange: InverseBindingListener
        ) {
            view.setOnItemClickListener { _, _, _, _ ->
                attrChange.onChange()
            }
        }
    }
}
```

해당 코드에 대해 설명하자만, 사용자로부터 `MakingStyle`을 입력받는 View는 `AutoCompleteView`라는 클래스 형태를 사용한다.

먼저 `setMakingStyle` 함수는 Databinding을 통해 Entity의 `MakingStyle` 자료형을 `String` 자료형으로 변환하여 해당 View의 `text` 필드로 전달해준다.

반대로 `getMakingStyle` 함수는 View의 `text` 필드의 문자열 데이터를 `MakingStyle` 형태의 자료형으로 변환하여 전달하는 함수이다.

마지막 `setMakingStyleListener`는 양방향 데이터바인딩을 성립시켜주는 함수로 앞서 정의한 `setMakingStyle`과 `getMakingStyle`을 연결시켜주는 역할을 한다.

이렇게 Binding Adapter를 정의해주면, Databinding에서 `AutoCompleteView`의 `text` 필드에서 `MakingStyle` Enum 자료형에 대한 양방향 데이터 바인딩을 사용할 수 있게 된다.

## 마무리

이번 포스트에서는 Custom 자료형을 `Enum`클래스를 예시로 들었지만, 더욱더 다양한 자료형이 될 수 있다.

핵심은 프로젝트의 Entity가 Custom 자료형을 사용할 경우, 해당 Entity를 사용하는 Room과 Databinding에 Side Effect가 발생하고 그를 Handling하기 위한 **Type Converter**와 **Binding Adapter**가 필요하다는 사실이다.

앞으로 데이터 모델링 시에 자료형에 따른 변환 클래스들에 대한 고려를 유의하도록 하자.