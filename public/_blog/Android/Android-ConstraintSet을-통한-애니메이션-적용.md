---
title: Android ConstraintSet을 통한 애니메이션 적용
date: '2019-11-27 00:00:11'
draft: false
category: 'Android'
---

## 소개

ConstraintSet는 말그대로 ConstraintLayout의 Setting 정보를 저장해둔 Set이다. 이 Set를 다양하게 만들어두면 필요할때 해당 Layout에 원하는 Set을 지정해줄 수 있고, 그 과정을 부드럽게 Animation으로 만들어줄 수도 있다.

## 적용

먼저 ConstraintLayout으로 구성된 레이아웃을 2개 만들어줘야한다.

**여기서 중요한 점은 두 레이아웃의 구성요소 및 ID 정보가 동일해야한다.**

다르게 만들어야하는 것은 해당 구성요소의 Constraint 정보이다. 예를 들면 Visibility나 Position, Size가 해당된다.

이후에 다음과 같이 적용한다.

```kotlin

val constraintSet = ConstraintSet()



//해당 XML의 Constraint 정보를 복사한다.

constraintSet.clone(this, R.layout.login_acitivity_loading)



//해당 레이아웃의 변경 Animation을 지정한다.

TransitionManager.beginDelayedTransition(activity_login)



//해당 레이아웃에 새로운 Constraint 정보를 적용한다.

constraintSet.applyTo(activity_login)

```

## 후기

Android는 Animation 구현이 꽤나 까다로운데 나름 간편화를 잘 시켰다는 느낌이 든다. 하지만 이 라이브러리도 만능은 아니다.

첫번째로는 Animation을 적용할 수 있는 범위가 매우 제한적이다. 앞서 언급한 ConstraintLayout으로 지정할 수 있는 Visibility, Size, Position 정도뿐이다.

두번째는 해당 ConstraintLayout의 바로 하위 컴포넌트만 적용된다. 즉, 2단계 이상의 Layout Depth가 있는 화면에서는 별도로 ConstraintSet 적용을 따로 만들어줘야한다.

세번째로는 리소스 관리가 복잡해진다. 하나의 화면에 다수의 레이아웃을 만들어야하기 때문에, 리소스가 굉장히 많아지며 복잡해진다.

나는 안드로이드 Animation에 대한 이해도가 너무 낮아 공부가 많이 필요한 것 같다. 내가 공부를 하는게 빠를지, 아니면 구글이 이런 나를 구원해줄지... 나도 잘 모르겠다.
