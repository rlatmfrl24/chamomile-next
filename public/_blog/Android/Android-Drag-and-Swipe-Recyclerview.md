---
title: Android Drag and Swipe Recyclerview
date: '2019-09-27 00:00:11'
draft: false
category: 'Android'
---

## Drag and Swipe RecyclerView

RecyclerView에서 대표적으로 활용되는 Interaction Gesture는 Drag와 Swipe가 있다. 이와 관련된 유용한 Article이 있기에 정리해둔다.

[Drag and Swipe RecyclerView](http://dudmy.net/android/2018/05/02/drag-and-swipe-recyclerview/)

## Interaction 관련 내용 추가

RecyclerView에 Drag 동작시 해당 Item를 강조하고 싶은 경우가 있다.

이런 경우를 위해선 RecyclerView에 적용되는 ItemTouchListener를 Custom 해줘야한다. 나같은 경우에는 해당 Item에 Elevation을 주는 방식으로 적용했다.
거기다 Drag의 방향에서 따라서 상위 Scrollview를 Scroll 해주는 로직도 추가했다.

```kotlin
override fun onChildDraw(c: Canvas, recyclerView: RecyclerView, viewHolder: RecyclerView.ViewHolder, dX: Float, dY: Float, actionState: Int, isCurrentlyActive: Boolean) {
    super.onChildDraw(c, recyclerView, viewHolder, dX, dY, actionState, isCurrentlyActive)
    if (isCurrentlyActive && actionState == ItemTouchHelper.ACTION_STATE_DRAG) {
        //Drag할때 해당 Item에 Elevation 효과 부여
        viewHolder.itemView.card_preferred_route_edit.cardElevation = 10 * density
        //Drag 방향으로 상위 Scrollview Scroll 동작 수행
        scrollview_preferred_route_edit.smoothScrollBy(0, dY.toInt()/10)
    }
}
```

## Drag on Outbound

당연하겠지만 해당 Drag on drop 기능은 Recyclerview 내부에서만 동작한다. 따라서 Recyclerview의 Height가 'wrap_content'로 설정되어있으며, Recyclerview의 길이만큼만 Drap되고 그 아래로는 잘려버리는 현상이 발생한다.
따라서 Recyclerview의 Drag 동작이 View 바깥에서도 동작할 수 있도록 Recyclerview의 상위 View의 속성에

```xml
android:clipToPadding="false"
android:clipChildren="false"
```

이 2가지 속성을 추가해준다.
