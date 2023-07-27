---
title: Material App Bar 적용하기
date: 2020-10-21 14:10:32
category: Android
draft: false
---

## 개요

이번 포스트에서는 [Material.io](https://material.io)에서 제공하는 **Material App Bar**를 적용하는 방법을 다뤄보겠다.

## 적용

기본적으로 Layout Root는 `NestScrollView`라고 가정하고 다음과 같이 XML을 구성해주면 된다.

```xml
<androidx.coordinatorlayout.widget.CoordinatorLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <com.google.android.material.appbar.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:elevation="0dp">

        <com.google.android.material.appbar.MaterialToolbar
            android:id="@+id/toolbar_main"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:background="@color/white"
            app:menu="@menu/menu_default">

            <TextView
                android:id="@+id/tv_title_main"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                style="@style/TitleTextAppearance"
                android:text="Header"
                android:layout_gravity="center"/>

        </com.google.android.material.appbar.MaterialToolbar>
    </com.google.android.material.appbar.AppBarLayout>

    <androidx.core.widget.NestedScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="com.google.android.material.appbar.AppBarLayout$ScrollingViewBehavior"
        android:fillViewport="true">
        ...
    </androidx.core.widget.NestedScrollView>
</androidx.coordinatorlayout.widget.CoordinatorLayout>
```
