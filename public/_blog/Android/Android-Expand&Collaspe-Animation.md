---
title: Android Expand & Collapse Animation
date: '2019-09-24 00:00:11'
draft: false
category: 'Android'
---

Android Animation 코드 중 Expand & Collapse 잘 구현해놓은 예제가 있다.

단, 사용법에 주의사항이 한가지가 있다면

Layout XML 상에서 height를 0dp로 설정했을때 크기가 정상적으로 변경되는 경우에만 작동하므로,

적용전에 Layout XML을 반드시 정리해놓아야한다.

- Expand

```kotlin

fun expand(view: View) {

    val matchParentMeasureSpec = View.MeasureSpec.makeMeasureSpec((view.parent as View).width, View.MeasureSpec.EXACTLY)

    val wrapContentMeasureSpec = View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED)

    view.measure(matchParentMeasureSpec, wrapContentMeasureSpec)

    val targetHeight = view.measuredHeight



    view.layoutParams.height = 0

    view.visibility = View.VISIBLE



    val animation = object: Animation() {

        override fun applyTransformation(interpolatedTime: Float, t: Transformation?) {

            when(interpolatedTime.toInt() == 1){

                true->view.layoutParams.height = ConstraintLayout.LayoutParams.WRAP_CONTENT

                false->view.layoutParams.height = (targetHeight * interpolatedTime).toInt()

            }

            Timber.v("diver:/"+view.layoutParams.height)

            view.requestLayout()

        }

        override fun willChangeBounds(): Boolean {

            return true

        }

    }

    animation.duration = (targetHeight / view.context.resources.displayMetrics.density).toLong() * 2

    view.startAnimation(animation)

}

```

- Collapse

```kotlin

fun collapse(view: View) {

    val initialHeight = view.measuredHeight

    val animation = object: Animation() {

        override fun applyTransformation(interpolatedTime: Float, t: Transformation?) {

            when(interpolatedTime.toInt() == 1){

                true->view.visibility = View.GONE

                false->{

                    view.layoutParams.height = initialHeight - (initialHeight * interpolatedTime).toInt()

                    view.requestLayout()

                }

            }

        }



        override fun willChangeBounds(): Boolean {

            return true

        }

    }

    animation.duration = (initialHeight / view.context.resources.displayMetrics.density).toLong()

    view.startAnimation(animation)

}

```
