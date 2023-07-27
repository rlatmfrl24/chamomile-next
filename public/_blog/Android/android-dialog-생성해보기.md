---
title: Android Dialog 생성해보기
date: 2020-10-21 10:10:14
category: Android
draft: false
---

## 개요

Android에서 대기화면이나 로딩화면을 표시하고 사용자의 입력을 차단하기 위해 Dialog를 사용하는 경우가 있다. 이럴때 단순한 Dialog 예시에 더해서, 검은색 불투명한 배경화면을 갖는 Dialog의 사용 예시를 정리해보았다.

## 구현

```kotlin
Dialog(requireContext(), android.R.style.Theme_Black_NoTitleBar_Fullscreen).apply {
    ColorDrawable(Color.BLACK).apply {
        alpha = 200
        window?.setBackgroundDrawable(this)
    }
    requestWindowFeature(Window.FEATURE_NO_TITLE)
    setContentView(R.layout.dialog_dg_screening_loading)
}.show()
```

## [Material Diaglogs](https://github.com/afollestad/material-dialogs) Library

위의 구현처럼 Android에서 Dialog API를 제공하지만, 해당 라이브러리를 사용하면 보다 간편하게 Dialog를 작성할 수 있다.
특히나 Bottom Sheets가 매우 매력적인 기능이니 필요하다면 고려해보는 것이 좋다

## 후기

이런 Dialog와 별개로 [Material.io](https://material.io)에서 지원하는 Date Picker 도 존재한다.

[Android Date Picker Dialog 생성하고 적용하기](https://sulfurbottom.netlify.com/Android/android-date-picker-dialog-생성하고-적용하기)
