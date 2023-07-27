---
title: Android Coroutine 핧아보기
date: 2020-03-08 10:22:84
category: Android
draft: false
---

## 개요

솔직히 이 포스트를 작성하면서도 **"나는 정말 Coroutine을 이해한 것이 맞는가?"** 라는 생각이 엄청나게 든다. 그러므로 이 포스트는 **Coroutine에 대한 지식 공유** 가 아닌 **좌충우돌 Coroutine 적용기** 정도로 보면 된다.

나중에 Corouinte에 대한 개념이 어느정도 정리된다면, 이 포스트를 수정하도록 하겠다.

## 비동기 프로세스

Android 프로그래밍에 있어서 **Background 작업에 대한 비동기 프로세스 처리**는 언제나 중요한 목표였으며, 이를 위한 다양한 해결법이 모색되어왔다. 그중 최근까지 가장 좋은 해결책이자 프론트엔드 엔지니어들의 핵심 키워드가 되어왔던 것이 **ReactiveX** 였다.

이는 **RxJava** 라고하는 `Java` 형태를 모체로 하는 Stream API 기반의 함수형 프로그래밍으로, 각 언어나 플랫폼에 따라 *RxAndroid*, *RxSwift*와 같은 다양한 형태로 제공되는 비동기 처리 라이브러리이다. 그동안 숱한 개발자들은 비동기 처리 문제를 **ReactiveX** 를 통해 해결해왔다.

그러나 **ReactiveX**는 그동안의 패러다임과 너무 다른 형태의 구조를 지니고 있었기때문에, 러닝 커브가 가파르게 형성되어 진입장벽이 매우 높았다. 나 역시 RxJava를 적용한 프로젝트를 시도해보았지만 어설픈 형태의 구조와 코드들만 남게 되는 수준에 그쳤다. (뭔가 Dagger2가 생각나는 기분...)

## Coroutine의 등장

Android에서는 이런 문제를 해결하기 위해, 러닝 커브가 낮고 쉽게 적용할 수 있는 **Coroutine** 라이브러리를 제공한다. 물론 이해를 위해서는 구글에서 제공하는 **[Coroutine](https://developer.android.com/kotlin/coroutines?hl=ko)** 문서를 참고하는 것이 좋다.

## 적용

```kotlin
suspend fun fetchDocs() {                             // Dispatchers.Main
    val result = get("https://developer.android.com") // Dispatchers.IO for `get`
    show(result)                                      // Dispatchers.Main
}

suspend fun get(url: String) = withContext(Dispatchers.IO) { /* ... */ }
```

네트워크 호출과 같은 백그라운드에서 동작해야할 장기 작업을 `suspend` 키워드로 선언하여 비동기 함수로 만들고 다음과 같이 호출하여 사용한다.

```kotlin
viewModelScope.launch {
    fetchDocs()
}
```

여기서 `Scope`라는 개념이 도입되는데 이는 `CoroutineScope`라는 개념이다. 이는 `launch`나 `async`를 통해 만들어진 코루틴을 추적하여 관리한다.
즉, ViewModel Side에서 비동기 함수를 실행하려면 `viewModelScope`, View Side에서 비동기 함수를 실행하려면 `lifecycleScope`를 사용하면 된다.

## Dispatcher

비동기 작업을 어떤 쓰레드에서 작업할 것인지 할당하는 클래스로써, 앞서 ~적용~ 파트의 예제 코드에서도 사용된 `withContext`나 `launch`와 함께 사용한다. 비동기 작업의 성격과 내용에 따라 Dispatcher를 통해 적합한 쓰레드에 할당하며 Context Switching을 적절하게 관리해줘야한다.

## 결론

Coroutine은 결국 안드로이드에서 성능과 직결되는 문제는 Thread 관리 및 비동기 처리와 관련된 기능이다. 내가 제일 약한 개념이기도하고, 다수 복잡한 개념들이 포함되어있다. **Thread**의 개념과 더불어 꾸준히 공부해나가며 보다 좋은 성능의 앱을 만들기 위한 요소로써 활용해보겠다.