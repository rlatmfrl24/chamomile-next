---
title: Room Database에 1:N 관계 정의하기
date: 2021-03-08 14:10:84
category: Android
draft: false
---

## 개요

Room Database를 활용하여 데이터 모델링을 하다보면, Entity간에 1:N, 또는 N:N 관계를 정의해야할 경우가 생긴다. 물론 해당 케이스에 대해서 [Room 공식 문서](https://developer.android.com/training/data-storage/room/relationships?hl=ko)에 잘 설명되어있지만, 내가 겪었던 시행착오와 함께 정리하여 추후에 적용할 때도 이해를 돕고자 한다.

## 사례 구성

일단 이해를 돕기 위하여 실제로 적용했던 프로젝트의 데이터 모델링 예시를 그대로 들고 왔다.

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

해당 모델은 칵테일 레시피이며, 1:N 관계에서 '1'의 역할을 할 Entity이다.

그리고 이 레시피와 연결될 'N'개의 재료 Entity는 다음과 같다.
```kotlin
package com.soulkey.craftsmanbartender.lib.model

import android.os.Parcelable
import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey
import kotlinx.parcelize.Parcelize


@Parcelize
@Entity(tableName = "ingredients")
data class Ingredient(
        @PrimaryKey(autoGenerate = true) val ingredientId: Long?,
        @ColumnInfo var recipeBasicId: Long?,
        @ColumnInfo val name: String,
        @ColumnInfo val amount: Float?,
        @ColumnInfo val unit: String
) : Parcelable
```

이로써 각각의 '레시피'와 '재료'의 Entity는 선언되었지만 이 두 Entity간의 관계를 정립되지 않았다. 따라서 이 두 Entity 간의 관계를 정의해주는 새로운 Entity를 정의한다.

```kotlin
package com.soulkey.craftsmanbartender.lib.model

import android.os.Parcelable
import androidx.room.*
import kotlinx.parcelize.Parcelize

@Parcelize
data class RecipeWithIngredient(
    @Embedded val basic: Recipe,
    @Relation(
        parentColumn = "recipeId",
        entityColumn = "recipeBasicId"
    )
    val ingredients: List<Ingredient>
) : Parcelable
```

해당 Entity에서 주목해야할 점은 `@Embedded` 와 `@Relation`의 Annotation이다.

이 Entity는 `Recipe` 클래스를 `@Embedded`하면서 해당 클래스의 Field를 사용할 수 있게된다.

또한, ingredients 필드의 Entity들은 `Ingredient`의 자료형 선언으로 인해 해당 Entity의 List로 선언되었고, 해당 필드의 각 Entity들은 `recipeBasicId` 필드의 값을 `recipeId`의 값을 값고 있는 Entity와 연결되게 된다. 즉, `Recipe` 클래스의 `recipeId` 값과 `Ingredient` 클래스의 `recipeBasicId`로 1:N 관계가 정의되는 것이다

이렇게 각 Entity들을 정의해주면 Room에서 각 Entity 간의 관계를 정의하여 사용할 수 있다.

## CRUD

만약 이렇게 Relation을 사용하여 Entity를 구성했다면, 각 Entity들간의 CRUD에도 각별히 주의를 기울여야 한다.

### 조회

Entity를 조회하는 DAO는 다음과 같이 정의한다
```kotlin
@Transaction
@Query("SELECT * FROM Recipe")
suspend fun getAllRecipes(): List<RecipeWithIngredient>
```

주목할 점은 '1'의 역할을 하는 `Recipe` Table에서 Query를 조회한다는 점이다.

### 생성 및 수정

```kotlin
@Transaction
@Insert(onConflict = OnConflictStrategy.REPLACE)
suspend fun createRecipe(recipe: Recipe, ingredients: List<Ingredient>){
    val recipeId = insertRecipe(recipe)
    ingredients.map {
        it.apply { recipeBasicId = recipeId }
    }.also { insertIngredients(it) }
}

@Transaction
@Update
suspend fun updateRecipeWithIngredient(recipe: Recipe, ingredients: List<Ingredient>) {
    updateRecipe(recipe)
    deleteIngredients(getIngredientsByRecipeID(recipe.recipeId!!))
    ingredients.map {
        it.apply { recipeBasicId = recipe.recipeId }
    }.also { insertIngredients(ingredients) }
}
```

생성 시에는 먼저 `Recipe`를 생성하여 해당 레시피의 ID를 받은 뒤, 각 재료의 `recipeBasicId` 필드에 연결될 레시피 ID를 넣어줘야한다.
해당 프로세스는 비동기로 동작하도록 `@Transaction` Annotation과 Coroutine 적용을 위한 `suspend` 선언을 추가해주어야 한다

수정도 마찬가지로 수정사항을 적용한 뒤 해당 수정사항들을 최신화시키기 위한 갱신 로직을 추가해주어야한다. 동작 방식은 생성과 유사하니 참고한다.

### 삭제

```kotlin
@Transaction
@Delete
suspend fun deleteRecipe(recipe: Recipe, ingredients: List<Ingredient>) {
    deleteRecipeBasic(recipe)
    deleteIngredients(ingredients)
}
```

삭제 시에도 생성 및 수정과 유사하게 해당 Recipe를 삭제한 후 연관된 재료 항목들을 전부 삭제해줘야한다.

## 마무리

여기까지 Room Database에서의 Relation 적용 사례를 정리해보았다. 위에서 정리한 사례보다 좀더 깔끔하게 명확하게 사용할 수 있는 여지가 있긴하지만 어느정도 사용성있게 정리할 수 있었다. 해당 Relation은 N:N 관계에서도 사용할 수 있기에 해당 내용을 바탕으로 좀 더 연구한다면 잘 사용할 수 있을 것이다.