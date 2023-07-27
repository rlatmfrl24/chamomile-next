---
title: Android Textview FadingEdge Issue 및 해결법 고찰
date: 2020-02-25 15:02:00
category: Android
draft: false
---

## 들어가기 전에

이번 Post는 Android View에서 제공하는 FadingEdage에 대한 개인적 이슈 및 고찰에 대한 내용이다.

## FadingEdge?

SingleLine이 적용된 Textview에서 내부 텍스트의 길이가 지정된 너비를 넘어갈 경우, 이를 처리하기 위한 다양한 설정법이 존재한다. 그중 가장 보편적인 방법은 xml 환경에서 **Ellipsize**를 설정해주는 방법이다.

```xml
<Textview
    ...
    android:ellipsize="marguee"
    android:singleLine="true"/>
```

이렇게 설정하면 Text가 Width를 넘어갈 경우 'port n..'처럼 넘어가는 부분이 점선으로 처리된다.

그러나 Design 요구사항에 따라, 해당 부분을 점선이 아닌 **Fade Out** 효과를 주기 바라는 경우도 있다. 이런 경우에는 *Android View Documentation*은 다음과 같은 예시를 제공하고 있다.

```xml
<Textview
    ...
    android:ellipsize="none"
    android:singleLine="true"
    android:requiresFadingEdge="horizontal"
    android:fadingEdgeLength="24dp"
    />
```

위와 같이 설정하면 Ellipsize 처리를 Fade Out 처리 표시할 수 있다.

## 문제점

애초에 Ellipsize 기능을 위한 설정 방식이 아닌 것인지, 해당 기능에는 다소 문제점이 있다. 앞서 설정한 **fadingEdgeLength**는 Fade out을 적용할 길이를 의미하는데, 이 Fade out이 적용되는 시작점이다.

원하는 것은 'View의 End부터 지정된 간격만큼 Fade out을 적용'하고 싶은 것인데, 이 설정은 'Text의 End부터 지정된 간격만큼 Fade out을 적용'한다는 것이다. 즉, Text 길이에 따라 화면에 보여지는 Fade out의 모습이 전부 달라진다는 문제점이 있다.

## 결국 Custome Class를 만들어야 한다.

따라서 해당 Textview를 Custom한 클래스를 만들어서 구현해야 한다. 구현된 클래스는 다음과 같다.

```kotlin
class GradientTextView: TextView {

    var mFadeWidth: Int = 0
    var mFadeColor: Int = R.color.black

    constructor(context: Context?): super(context)

    constructor(context: Context?, attrs: AttributeSet?): super(context, attrs){
        mFadeWidth = context?.obtainStyledAttributes(attrs, R.styleable.GradientTextView)
                ?.getDimensionPixelSize(R.styleable.GradientTextView_fading_width, 0)!!
        mFadeColor = context?.obtainStyledAttributes(attrs,R.styleable.GradientTextView)
                ?.getColor(R.styleable.GradientTextView_fading_color, currentTextColor)!!

    }

    constructor(context: Context?, attrs: AttributeSet?, defStyleAttr: Int): super(context, attrs, defStyleAttr)

    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        super.onLayout(changed, left, top, right, bottom)

        if (paint.measureText(text.toString()) > width) {
            paint.setShader(LinearGradient((right-mFadeWidth).toFloat(),top.toFloat(), right.toFloat(), top.toFloat(), currentTextColor, mFadeColor, Shader.TileMode.CLAMP))
        } else {
            paint.setShader(LinearGradient(0f,0f, width.toFloat(), height.toFloat(), currentTextColor, currentTextColor, Shader.TileMode.CLAMP))
        }
    }
}
```

## 해당 클래스를 XML에서 적용하기

해당 클래스는 원하는 XML에서 다음과 같이 적용한다.

```xml
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content">
    <GradientTextView
        ...
        android:ellipsize="none"
        android:singleLine="true"
        app:fading_width="24dp"
        app:fading_color="@color/white"/>
</LinearLayout>
```

여기서 주의할 점이 있는데, 해당 Custom View를 LinearLayout으로 감싸지 않으면 제대로 적용되지 않는다. 아마도 내부 View의 길이 측정을 위한 동작에 LinearLayout이 필요한 모양이다.

## 정리

이번 Post에서 정리한 해결법도 완벽한 해결법은 아니지만 어느정도 원하는 요구사항에 대한 이슈는 해결할 수 있었다. 추후 더 나은 해결법이 발견되면 이 Post에 다시 업데이트하도록 하겠다.
