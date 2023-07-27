---
title: Two-way Databinding 적용해보기
date: 2020-10-21 15:10:75
category: Android
draft: false
---

## 개요

이전의 Databinding의 방식이 ViewModel의 데이터를 Layout XML의 화면에 전달하는 방식이었다면 **Two-way Databinding(양방향 데이터바인딩)** 은 화면에서의 입력이 반대로 ViewModel의 데이터에 영향을 주는 연결방식을 말한다.

따라서, ViewModel의 데이터가 화면에 연결됨과 동시에 화면에서의 데이터 변경 동작이 ViewModel의 데이터에 반영되는 구현방식이다.

> 이 포스트에서 참고할 점이 있는데, [Android 공식 문서](https://developer.android.com/topic/libraries/data-binding/two-way?hl=ko)에서는 양방향 데이터 바인딩 구현에 **ViewModel**을 `BaseObservable`을 활용해서 구현했지만, 나는 *AAC*의 `ViewModel` 클래스를 활용할 것이다. 그리고 해당 클래스에서는 `@Bindable` *Annotation*을 사용할 경우, Build시 에러가 발생하므로 반드시 `BindingAdapter`를 활용해야한다.

## 구현

### 1. Android Two-way Binding 지원

Android에서는 기본적으로 양방향 데이터바인딩을 지원하는 클래스가 존재한다. 모두 사용자 입력이 입력하는 View들로 이 클래스들을 활용할 경우에는 별도의 `BindingAdapter`를 구현할 필요없다. 예를 들어, `EditText` 클래스를 활용할 경우 다음과 같이 활용하면 된다.

```xml
<EditText
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:inputType="text"
    android:text="@={viewModel.contents}"/>
```

Android 차원에서 기본적으로 양방향 데이터바인딩을 지원하는 클래스는 다음과 같다.

- `AbsListView` -> `android:selectedItemPosition`
- `CalendarView` -> `android:date`
- `CompoundButton` -> `android:checked`
- `DatePicker` -> `android:year, android:month, android:day`
- `NumberPicker` -> `android:value`
- `RadioGroup` -> `android:checkedButton`
- `RatingBar` -> `android:rating`
- `SeekBar` -> `android:progress`
- `TabHost` -> `android:currentTab`
- `TextView` -> `android:text`
- `TimePicker` -> `android:hour, android:minute`

### 2. **Binding Adapter** 구현

만약 **Custom View**에 대해서 양방향 데이터바인딩을 적용하고자 할때는 `BindingAdapter` 구현이 가장 핵심이다

`BindingAdapter.kt`

```kotlin
object BindingAdapter {

    //Custom View Binding
    @JvmStatic
    @BindingAdapter("value")
    fun setCustomViewComponent(view: CustomView, value: String?) {
        val old = view.et_input.text.toString()
        if (old != value && !value.isNullOrBlank()){
            //Data 화면 입력
            view.et_input.setText(value)
        }
    }

    @JvmStatic
    // Databinding으로 연결된 Attribute명 뒤에 `AttrChanged`가 붙는다
    @BindingAdpater("valueAttrChanged")
    // 연결되는 함수명에 대한 주의가 필요하다(InverseBindingListener)
    fun setCustomViewComponentInverseBindingListener(view: CustomView, listener: InverseBindingListener?) {
        // String Data 데이터 변경을 적용한다.
        val watcher = object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                listener?.onChange()
            }
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int){}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        }
        view.et_input.addTextChangedListener(watcher)
    }

    @JvmStatic
    @InverseBindingAdapter(attribute="value", event="valueAttrChanged")
    //Custom View에 대한 Inverse Binding Adapter
    //BindingAdpater와 InverseBindingListener를 연결해준다
    fun bindingValue(view: CustomView): String {
        return view.et_input.text.toString()
    }
}
```

### 3. Custom View Two-way Databinding

*Custom View*에 대한 `BindingAdapter` 구현이 완료되면 다음과 같이 적용할 수 있다

```xml
<com.soulkey.project.lib.view.CustomView
    android:id="@+id/custom_view_test"
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    app:value="@={viewModel.content}"
/>
```

## 후기

양방향 데이터바인딩은 Activity와 같은 구성요소 구현 단계에서 불필요한 데이터 연결 코드들을 생략하게 하고 화면과 구성요소 간 데이터를 전달을 효율적으로 지원한다는 장점이 있지만, 구현이 복잡하기 때문에 적용에 세심한 고려가 필요하다.
