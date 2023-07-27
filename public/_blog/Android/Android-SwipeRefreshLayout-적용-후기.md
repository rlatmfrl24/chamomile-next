---
title: Android SwipeRefreshLayout 적용 후기
date: '2019-10-17 00:00:11'
draft: false
category: 'Android'
---

Material Design에서 많이 쓰이는 _Swipe to Refresh_ 개념을 Android 상에서 지원해주는 **SwipeRefreshLayout**이 있다. 해당 라이브러리를 적용해본 후기를 남겨본다.

## 적용

### gradle 추가

```groovy

implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0-alpha03'

```

### XML 추가

```xml

<androidx.swiperefreshlayout.widget.SwipeRefreshLayout

    android:id="@+id/layout_swipe_article"

    android:layout_width="match_parent"

    android:layout_height="0dp"

    app:layout_constraintTop_toTopOf="parent"

    app:layout_constraintBottom_toBottomOf="parent">



    ...



</androidx.swiperefreshlayout.widget.SwipeRefreshLayout>

```

### Swipe 동작 구현

```kotlin

layout_swipe_article.setOnRefreshListener {articleViewModel.triggerUpdate()}

```

## 후기

굉장히 간편하게 적용이 가능해서 놀랍다. 하지만... 개인적으로 구현하고나니 굉장히 짜증나는 라이브러리이다. 해당 라이브러리는 상하좌우 모든 방향의 Swipe To Refresh를 지원하기 때문에, 만약 RecyclerView의 좌우 Swipe랑 같이 쓰게되면 동작이 맞물려서 제대로 동작하지가 않는다. 개인적으로 Swipe 인식 방향을 Custom할 수 있게 해줬으면 좋겠다. 나중에 해결법을 찾으면 다시 메모해둘 생각이다.
