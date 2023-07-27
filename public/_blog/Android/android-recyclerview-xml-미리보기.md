---
title: Android RecyclerView XML 미리보기
date: 2020-10-20 13:10:57
category: Android
draft: false
---

## 소개

Android 레이아웃 편집 시 XML 화면에서 RecyclerView의 기본 미리보기 대신 만들어놓은 Layout을 미리보기볼 수 있는 기능이 있다. 설정도 매우 간단하고 이렇게 적용해 두면 해당 RecyclerView가 실제로 어떻게 표시될 지 미리 볼 수 있다.

## 적용

```xml
...
<androidx.recyclerview.widget.RecyclerView
    android:id="@+id/recyclerview_list"
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:clipToPadding="false"
    app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager"
    tools:listitem="@layout/recycler_item"
    tools:itemCount="3"
/>
...
```

`tools:listitem`은 해당 Recyclerview의 Item 미리보기를 설정하는 옵션이다

`tools:itemCount`는 해당 Recyclerview의 미리보기 아이템 개수를 설정하는 옵션이다
