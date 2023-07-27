---
title: Android RecyclerView에 좌우 Swipe + Backgroud 적용해보기
date: '2019-10-17 00:00:11'
draft: false
category: 'Android'
---

이번에는 RecyclerView에 좌우 Swipe 동작을 적용하면서 텅 빈 배경대신 백그라운드의 표시하도록 만든 Boilerplate이다.

## Swipe 동작 구현

우선 Swipe 동작 구현을 위해선 **ItemTouchHelper**를 활용한 전용 클래스를 만들어야한다.

```kotlin

class CustomItemTouchHelper(dragDirs: Int, swipeDirs: Int) : ItemTouchHelper.SimpleCallback(dragDirs, swipeDirs){

  override fun onMove(...) { ... }

  override fun onSwiped(...) { ... }

  override fun onSelectedChanged(...) { ... }

  override fun onChildDrawIver(...) { ... }

  override fun onChildDraw(...) { ... }

  override fun clearView(...) { ... }

}

```

Swipe 동작 시에 실행할 기능들은 *onSwipe*에 구현되어야 한다.

## Foreground, Background 구성

화면 구성 시에 데이터를 표시할 화면은 foreground로, 뒷 배경이 될 화면은 background로 중첩해서 XML을 만든다. 이후에 위 선언된 각각의 override 함수들을 다음과 같이 구현한다.

```kotlin

override fun onSelectedChanged(viewHolder: RecyclerView.ViewHolder?, actionState: Int) {

        viewHolder?.let {

            val foregroundView = (it as ArticleAdapter.ArticleViewHolder).itemView.container_card_article_foreground

            ItemTouchHelper.Callback.getDefaultUIUtil().onSelected(foregroundView)

        }

    }



  override fun onChildDrawOver(

      c: Canvas,

      recyclerView: RecyclerView,

      viewHolder: RecyclerView.ViewHolder?,

      dX: Float,

      dY: Float,

      actionState: Int,

      isCurrentlyActive: Boolean

  ) {

      viewHolder?.let {

          val foregroundView = viewHolder.itemView.container_card_article_foreground

          ItemTouchHelper.Callback.getDefaultUIUtil().onDrawOver(c, recyclerView, foregroundView, dX, dY, actionState, isCurrentlyActive)

      }

  }



  override fun onChildDraw(

      c: Canvas,

      recyclerView: RecyclerView,

      viewHolder: RecyclerView.ViewHolder,

      dX: Float,

      dY: Float,

      actionState: Int,

      isCurrentlyActive: Boolean

  ) {

      val foregroundView = viewHolder.itemView.container_card_article_foreground

      val backgroundView = viewHolder.itemView.container_card_article_background

      if (dX > 0) {

          //Right Swipe

          ...

      }

      else if (dX < 0){

          //Left Swipe

          ...

      }

      ItemTouchHelper.Callback.getDefaultUIUtil().onDraw(c, recyclerView, foregroundView, dX, dY, actionState, isCurrentlyActive)

  }



  override fun clearView(recyclerView: RecyclerView, viewHolder: RecyclerView.ViewHolder) {

      val foregroundView = viewHolder.itemView.container_card_article_foreground

      ItemTouchHelper.Callback.getDefaultUIUtil().clearView(foregroundView)

  }

```

즉, 원리는 Swipe 액션을 위한 ItemTouchHelper에 Foreground View만 적용되도록 만든 것이다.

이후에 해당 클래스를 RecyclerView에 다음과 같이 적용한다.

```kotlin

val SwipeCallback = CustomItemTouchHelper(0, ItemTouchHelper.RIGHT)



ItemTouchHelper(SwipeCallback).attachToRecyclerView(recycerview)
```
