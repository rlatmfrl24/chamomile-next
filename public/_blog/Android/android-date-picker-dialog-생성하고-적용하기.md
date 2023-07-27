---
title: Android Date Picker Dialog 생성하고 적용하기
date: 2020-10-21 10:10:35
category: Android
draft: false
---

## 개요

Android Vanila 버전은 Date Picker UI를 지원하지 않고 있다. Material UI는 이를 보완하는 Material Design 형식의 Date Picker를 지원하다. 구현 자체는 단순하지만 제대로 문서화 되어있지 않으므로 나중에 활용할 수 있도록 정리해두었다.

## 구현

### 1. Builder 구현

```kotlin

//Builder 구현
val builder = MaterialDatePicker.Builder.datePicker()
    .setTheme(R.style.DatePickerTheme)
    .setInputMode(MaterialDatePicker.INPUT_MODE_CALENDAR)
```

MaterialDatePicker는 다소 설정에 까다로운 부분이 있다.

1. 날짜를 달력에서 선택하는 방식과 직접 날짜를 입력하는 방식이 존재
   - 나의 경우에는 직접 입력 방식은 에러도 많고 UI도 사용하기 불편해서 제거한다
2. 지원 색상 Customize이 어렵다. (기본적으로 `PrimaryColor`와 `PrimaryColorDark`를 사용)

위 2가지 문제를 해결하기 위해서 `setTheme`를 활용하여 Customize했다,

### 2. Theme 설정

`style.xml`에서 MaterialDatePicker에서 사용할 테마를 설정한다.

```xml
<style name="DatePickerTheme" parent="ThemeOverlay.MaterialComponents.MaterialCalendar">
    <!-- 색상 변환 -->
    <item name="colorPrimary">@color/colorAccent</item>
    <item name="colorPrimaryDark">@color/colorAccent</item>
    <item name="colorAccent">@color/colorAccent</item>
    <!-- 폰트 변환 -->
    <item name="fontFamily">@font/spoqa_han_sans_bold</item>
    <!-- 직접 입력 버튼 숨김 -->
    <item name="materialCalendarHeaderToggleButton">@style/CalendarToggleButton</item>
</style>

<style name="CalendarToggleButton" parent="Widget.MaterialComponents.Button">
    <item name="android:visibility">gone</item>
</style>
```

### 3. Dialog 실행

```kotlin
// 현재 날짜로 초기화
builder.setSelection(MaterialDatePicker.todayInUtcMilliseconds())

builder.build().also { picker ->
    //Dialog 실행
    picker.show(supportFragmentManager, picker.toString())
    picker.addOnCancelListener {
        // Dialog 취소 시 동작
        Timber.v("diver:/ Date Picker was Cancelled")
    }
    picker.addOnNegativeButtonClickListener {
        // 취소 버튼 클릭 시 동작
        Timber.v("diver:/ Date Picker Negative Button was clicked")
    }
    picker.addOnPositiveButtonClickListener {
        // 확인 버튼 클릭 시 동작
        applicationViewModel.setInspectionDate(DateTime(it))
    }
}
```