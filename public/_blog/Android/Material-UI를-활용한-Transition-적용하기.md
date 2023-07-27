---
title: Material UI를 활용한 Transition 적용하기
date: 2021-03-08 14:14:84
category: Android
draft: false
---

## 개요

Android 개발자는 UI를 구현하기 위한 많은 Custom View와 라이브러리들을 사용한다(물론 하나하나 직접 만드시는 괴물들도 많지만...) 특히나 나처럼 1인 개발을 하지만 UI를 세심하게 못짜는 사람들을 위한 UI Framework도 존재한다. 그중 가장 대표적인 Android UI Framework가 바로 [Material UI](https://material.io) 일것이다.

이번 포스트에서는 Material UI Framework를 적용하고, 여기서 제공하는 Transition API를 적용하는 법을 다뤄볼 것이다.

*왜 Transtion API냐고? 다른 API는 그냥 적용하면 쓸수 있었는데 이 망할 API만 제대로 동작하질 않아서 고치는데 며칠이 걸렸기 때문이다...*

## 적용

사실 적용법은 특별한 것 없이 [Material UI - Motion](https://material.io/develop/android/theming/motion)에 나온 그대로하면 된다. 기본적으로 AndroidX의 기본 기능인 **Shared Element API**를 활용한 Transiton이므로 해당 [문서](https://developer.android.com/training/transitions/start-activity?hl=ko)를 같이 참조하면 이해에 더욱 도움이 될것이다.

다만 불편한 점은 해당 문서는 Databinding을 고려하지 않았기에 Databinding이 적용된 프로젝트에는 그대로 적용하기 어렵다는 점이다.

따라서 내가 적용한 프로젝트 코드를 활용하여 Activity A -> Activity B로 이동하는 코드를 살펴보자

### Theme.xml

먼저 프로젝트 전체 AppTheme에 다음을 추가해준다.

```xml
<item name="android:windowContentTransitions">true</item>
<item name="android:windowActivityTransitions">true</item>

<!-- specify enter and exit transitions -->
<item name="android:windowEnterTransition">@android:transition/explode</item>
<item name="android:windowExitTransition">@android:transition/explode</item>
```

### Activity A

```kotlin
private val binding : ActivityRecipeBinding by lazy {
    DataBindingUtil.setContentView(this, R.layout.activity_recipe)
}

override fun onCreate(savedInstanceState: Bundle?) {
    window.requestFeature(Window.FEATURE_ACTIVITY_TRANSITIONS)
    setExitSharedElementCallback(MaterialContainerTransformSharedElementCallback())
    window.sharedElementsUseOverlay = false

    super.onCreate(savedInstanceState)
    ...
```

화면전환을 통해 퇴장할 Activity A에다 `onCreate` 메소드가 호출되기 이전에 3가지 코드 스니펫(`requestFeature, setExitSharedElementCallback, sharedElementsUseOverlay`)을 호출하여준다. 

오타에 주의하자. **Exit**를 반드시 확인해야한다.

### Activity B

이제 화면전환을 통해 화면으로 들어오는 Activity B에는 다음과 같이 코드 스니펫을 추가한다.

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    window.requestFeature(Window.FEATURE_ACTIVITY_TRANSITIONS)
    setEnterSharedElementCallback(MaterialContainerTransformSharedElementCallback())

    window.sharedElementEnterTransition = MaterialContainerTransform().apply {
        addTarget(R.id.layout_recipe_detail)
        containerColor = Color.WHITE
        fadeMode = MaterialContainerTransform.FADE_MODE_CROSS
        interpolator = FastOutSlowInInterpolator()
        duration = 400L
    }
    window.sharedElementReturnTransition = MaterialContainerTransform().apply {
        addTarget(R.id.layout_recipe_detail)
        containerColor = Color.WHITE
        fadeMode = MaterialContainerTransform.FADE_MODE_CROSS
        interpolator = FastOutSlowInInterpolator()
        duration = 400L
    }

    super.onCreate(savedInstanceState)
```

Activity A와 마찬가지로 `requestFeature`를 추가하고 `setEnterSharedElementCallback`를 추가해준다. 여기서도 **Enter**를 주의하자. 한번 헷갈리면 원인을 찾느라 한참 고생한다.

그 다음으로 `sharedElementEnterTransitoin`, `sharedElementReturnTransition`을 정의해준다. 이는 화면 전환의 효과를 정의하는 부분이기에 본인에게 맞게 적절하게 조정하면 된다. 전자는 해당 화면에 진입할 때, 후자는 해당 화면에서 이전 화면으로 돌아갈 때의 Transition 이므로 둘다 잊지 않고 정의해주자.

**여기서 주의할 점이 있는데, `Duration` 속성이다. Material UI 공식문서의 `Duration` 속성은 300L / 250L로 제시해두었다. 내 경우에는 이대로 적용하게 되면 Transiton의 Animation이 완료되기 이전에 Transition이 끝나버려 화면이 깜빡거리는 현상이 발생했다. 즉, 본인이 직접 적용해보고 `Duration` 속성을 잘 조절해야만 적절한 화면전환 애니메이션을 적용할 수 있다**

## Fade Through

만약 Shared Element가 없다면 좀더 단순한 방식으로 화면 전환을 적용할 수 있다.

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enterTransition = MaterialFadeThrough()
    exitTransition = MaterialFadeThrough()
}
```

이런 방식으로 좀더 단순화할 수 있다. 물론 이 경우에도 Fragment간의 전환, Activity간의 전환, View의 간의 전환에 따라 적용법이 다르므로 문서를 참고하여 유연하게 적용하면 좋다. 여기에 더불어 *Shared axis*와 같은 기능도 있는데, 그건 나중에 프로젝트하다가 적용할 일이 있으면 따로 다루겠다.

## 마무리

Material UI의 Motion API를 활용하여 Transition을 적용하는 법을 다루어보았다. 잘 만들어진 API니 잘 활용하면 좋겠지만, 언젠가는 Android 공식문서의 `transitionSet`이나 **Animation API**를 다룰 날이 오겠지만, 우선 Mock-up 단계의 Animation을 적용하고 싶다면 좋은 예가 될것이다.