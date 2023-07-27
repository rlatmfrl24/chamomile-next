---
title: Android Project에 ViewModel 적용하기
date: 2020-10-22 09:10:73
category: Android
draft: false
---

## 개요

Android Project에 다양한 라이브러리와 패턴들을 적용하고 구현했다면, 이제 **ViewModel**에 데이터를 전달하여 관리하도록 적용해야한다. 해당 포스트에서는 앞서 프로젝트에 적용한 [Koin](https://sulfurbottom.netlify.com/Android/android-project에-koin-적용하기)과 [AAC ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel?hl=ko)을 활용한 예시를 다루겠다.

## 적용

### 1. ViewModel 정의

```kotlin
class MainViewModel(private val userRepository: UserRepository): ViewModel() {
    ...
}
```

### 2. DI 적용

`AppModule.kt`

```kotlin
...
viewModel { MainViewModel(get()) }
```

### 3. Activity Injection

`MainActivity.kt`

```kotlin
class MainActivity : BaseActivity() {
    private val mainViewModel: MainViewModel by viewModel()
}
```

> `viewModel()`을 통해 ViewModel 인스턴스를 생성할 경우, 당연하지만 별도의 새로운 Lifecycle이 생성된다. 은근히 놓치기 쉬운 부분이다.

### 4. Fragment Injection

`MainFragment.kt`

```kotlin
class MainFragment: Fragment() {
    private val mainViewModel: MainViewModel by sharedViewModel()
}
```

> 여기서 **ViewModel**은 Activity의 *ViewModel*을 공유한다. 마찬가지로 Activity 내의 모든 Fragment은 같은 ViewModel을 공유하므로, 이를 통해 데이터를 공유할 수 있다.
