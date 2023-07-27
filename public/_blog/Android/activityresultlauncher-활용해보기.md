---
title: ActivityResultLauncher 활용해보기
date: 2020-10-20 14:10:84
category: Android
draft: false
---

## 개요

특정 Activity를 실행할 때, `startActivityForResult`를 통해 실행하면, 실행된 Activity로 종료되고 원래 Activity로 돌아올 때 결과값을 전달받을 수 있다.
이런 동작은 보통 다음과 같은 프로세스로 구현된다.

1. A Activity에서 `startActivityForResult(intent, requestCode)`로 B Activity를 실행한다.
2. B Activity에서 동작을 수행하고 A Activity로 전달할 데이터를 다음과 같이 저장하고 종료한다.

```kotlin
intent.putExtra("key", data)
setResult(resultCode, intent)
finish()
```

3. A Activity로 돌아올 때, Lifecycle에 의해 `onActivityResult()`가 수행된다.

```kotlin
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    ...
}
```

보통은 이런 방식으로 화면을 처리한다

## `prepareCall()`

하지만 Android 공식 문서는 새로운 Result 처리방식을 제안하고 있다.

참고문서: [활동으로부터 결과 가져오기](https://developer.android.com/training/basics/intents/result?hl=ko)

`prepareCall()`이라는 Android API를 활용한 방식이다. 적용방법은 다음과 같다.

1. **Gradle Dependency**에 다음을 추가한다.

```groovy
implementation 'androidx.activity:activity-ktx:1.2.0-alpha02'
implementation 'androidx.fragment:fragment-ktx:1.3.0-alpha02'
```

2. 결과를 수신할 Activity에 ActivityResultLauncher를 다음과 같이 선언한다.

```kotlin
private val resultLauncher = prepareCall(StartActivityForResult()) {
    ...
}
```

3. 동작을 수행하고 결과를 가져올 Activity를 다음과 같이 실행한다.

```kotlin
resultLauncher.launch(intent)
```

4. 결과를 저장하고 종료하는 방식은 이전 방식과 동일

## 후기

해당 클래스는 이전의 단방향 데이터 전달이 아닌 다양한 케이스를 결과 데이터 전달을 위한 개념이지만, 아직 이해가 부족하여 사용케이스를 발전시키지 못했다. 이후에 활용사례와 응용방식이 생기면 추가할 예정이다.
