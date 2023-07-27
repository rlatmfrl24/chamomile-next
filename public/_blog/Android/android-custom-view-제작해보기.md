---
title: Android Custom View 제작해보기
date: 2020-10-21 09:10:14
category: Android
draft: false
---

## 개요

Android 프로젝트를 진행하다보면 디자인 요구사항에 맞는 Custom View를 개발할 일이 많다. 이번에는 자주 쓰거나 별도의 디자인이 필요한 Custom View를 클래스화하며 사용하는 방법을 정리해보았다.

## 구현

### 1. Class 선언

기본적으로 나는 `ConstraintLayout`을 주로 사용하므로, 작성할 **Custom View**는 `ConstraintLayout`을 상속하여 선언한다.

```kotlin

class CustomView(context: Context, attributeSet: AttributeSet?) : ConstraintLayout(context, attributeSet) {
    //Databinding을 활용하여 Custom View의 레이아웃을 지정
    private var binding: CustomViewBinding = DatabindingUtil.inflate(
        LayoutInflater.from(context),
        R.layout.layout_custom_view,
        this,
        true
    )
}
```

### 2. Custom View에서 사용할 Attribute를 선언

`res/values/attrs.xml`에서 Custom View에서 사용할 Attribute를 선언한다.

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <attr name="headerName" format="reference|string"/>
    <declare-styleable name="CustomView">
        <attr name="headerName"/>
        <attr name="mainText" format="reference|string"/>
    </declare-styleable>
</resources>
```

위 예시에서 `headerName`과 `mainText`의 선언방식의 차이점은 해당 **Attribute**의 전역 방식 사용여부이다. 전역방식으로 선언된 `headerName`는 다른 Custom View의 **Attribute**로 사용될 수 있다.

### 3. Custom View에 해당 Attribute의 속성값을 적용

다시 **Custom View**의 선언부로 돌아와서 *Resources*에 설정해둔 속성값을 View에 적용시켜야 한다.

```kotlin
class CustomView(...) : ConstraintLayout(...){
    ...

    init {
        attributeSet?.let {
            context.obtainStyledAttributes(attributeSet, R.styleable.CustomView).apply {
                val headerName = getString(R.styleable.CustomView_headerName)
                val mainText = getString(R.styleable.CustomView_mainText)

                ...

                recycle()
            }
        }
    }
}

```

### 4. 구현한 Custom View 활용

구현한 Custom View를 사용하기 위해선 우선 프로젝트는 한번 빌드하는 것이 좋다. 빌드 후에는 다음과 같이 Layout에서 활용할 수 있다.

```xml
...
<com.soulkey.test.lib.view.CustomView
    android:id="@+id/custom_view_test"
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    app:headerName="Container Type Size"
    app:mainText="@{viewModel.containerType}"
/>
...
```
