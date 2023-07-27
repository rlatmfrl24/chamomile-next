---
title: Navigation API를 활용한 Fragment간 이동 구현
date: 2021-03-08 11:19:84
category: Android
draft: false
---

## 개요

최근 프로젝트를 개발하던 중, Fragment 간의 이동을 관리하고 Navigation을 관리해주는 **Navigation API**을 알게 되었다. 언제나 그래왔듯이 제일 설명이 잘된 것은 구글 공식 문서(...)이니 앞서 걸어놓은 링크의 문서를 참조하는 것을 추천한다.

이후부터는 Navigation API를 적용하면서 알게된 점이나 주의할 점을 서술하겠다.

## XML

```xml
<layout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    tools:context=".ui.mocktest.MockTestActivity">

    <androidx.coordinatorlayout.widget.CoordinatorLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <com.google.android.material.appbar.AppBarLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content">

            <com.google.android.material.appbar.MaterialToolbar
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                app:title="Mock Test"/>

        </com.google.android.material.appbar.AppBarLayout>

        <androidx.fragment.app.FragmentContainerView
            android:id="@+id/nav_host_fragment_mock_test"
            android:name="androidx.navigation.fragment.NavHostFragment"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            app:layout_behavior="com.google.android.material.appbar.AppBarLayout$ScrollingViewBehavior"
            app:defaultNavHost="true"
            app:navGraph="@navigation/nav_graph_mock_test"/>

    </androidx.coordinatorlayout.widget.CoordinatorLayout>

</layout>
```

먼저 Navigation을 적용할 Acitivy의 XML에 `FragmentContainerView`를 추가해준다. 해당 View에서 앞으로 Fragment 간의 이동이 일어날 것이다. 해당 뷰에 눈여겨봐야할 필드는 `name`, `defaultNavHost`와 `navGraph`이다

먼저 `name`은 `NavHost`가 구현된 클래스를 포함시킨다. 즉, 해당 View에서 Navigation API를 사용하기 위한 선언이다

`defaultNavHost`는 `NavHostFragment`가 시스템의 뒤로가기 버튼을 가로채도록 설정해줍니다. 주의할 점은 한 화면에 단 하나의 `NavHost`만 지정할 수 있다는 것이다

마지막으로 `navGraph`는 해당 `NavHostFragment`를 앞으로 정의할 Navigation Graph를 연결한다.

## Navigation Graph

프로젝트의 `res` 디렉토리에 `navigation` 폴더를 생성하고 `nav_graph_mock_test.xml`을 생성합니다. 앞서 `FragmentContainerView`의 `navGraph` 속성에 `nav_graph_mock_test`라고 정의했기 때문이다

<img src="https://developer.android.com/images/topic/libraries/architecture/navigation-graph_2x-callouts.png?hl=ko">

Navigation XML을 만들면 위와 같은 화면을 접할 수 있습니다. Android Studio는 기본적으로 Navigation API에 대한 Design 화면을 제공한다

기본적으로 제공되는 Source 화면은 다음과 같다.

```xml
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
            xmlns:app="http://schemas.android.com/apk/res-auto"
            android:id="@+id/nav_graph">
    <fragment
        android:id="@+id/blankFragment"
        android:name="com.example.cashdog.cashdog.BlankFragment"
        android:label="Blank"
        tools:layout="@layout/fragment_blank" />

</navigation>
```

### Graph 편집

이제 Navigation Graph의 실제 코드 적용 사례와 함께 Graph 편집 방법을 알아보자

```xml
<?xml version="1.0" encoding="utf-8"?>
<navigation
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/nav_graph_mock_test"
    app:startDestination="@id/testIntroFragment">

    <fragment
        android:id="@+id/testIntroFragment"
        android:name="com.soulkey.craftsmanbartender.ui.mocktest.TestIntroFragment"
        android:label="TestIntroFragment"
        tools:layout="@layout/fragment_mock_test_intro">
        <action
            android:id="@+id/action_testIntroFragment_to_countDownFragment"
            app:destination="@id/countDownFragment" />
    </fragment>
    <fragment
        android:id="@+id/countDownFragment"
        android:name="com.soulkey.craftsmanbartender.ui.mocktest.CountDownFragment"
        android:label="CountDownFragment"
        tools:layout="@layout/fragment_count_down">
        <action
            android:id="@+id/action_countDownFragment_to_mockTestFragment"
            app:destination="@id/mockTestFragment" />
    </fragment>
    <fragment
        android:id="@+id/mockTestFragment"
        android:name="com.soulkey.craftsmanbartender.ui.mocktest.MockTestFragment"
        android:label="MockTestFragment"
        tools:layout="@layout/fragment_mock_test">
        <action
            android:id="@+id/action_mockTestFragment_to_testResultFragment"
            app:destination="@id/testResultFragment" />
    </fragment>
    <fragment
        android:id="@+id/testResultFragment"
        android:name="com.soulkey.craftsmanbartender.ui.mocktest.TestResultFragment"
        android:label="TestResultFragment"
        tools:layout="@layout/fragment_test_result">
        <action
            android:id="@+id/action_testResultFragment_to_countDownFragment"
            app:destination="@id/countDownFragment" />
    </fragment>
</navigation>
```
위 XML은 해당 실제 프로젝트에서 사용한 Navigation Graph이다. 

해당 Graph에는 Navigation에 사용되는 Fragment들이 `<fragment>`로 정의되어있다.각각의 `<fragment>` 태그에는 해당 Fragment의 ID, 표시명, 구현 클래스, Layout XML이 명시되어있다.

또한, `<fragment>` 하위에는 `<action>`가 정의되어 해당 Fragment에서의 다른 Fragment로 이동하는 동작을 정의해두었다.

이렇게 Navigation Graph를 정의해두면 해당 Graph에서 선언된 Fragment가 자동으로 연결되고, 이제 Navigation API가 코드 레벨에서의 Fragment 이동 및 화면 전환을 담당하게 된다.

## Fragment 간 이동

### 유형 안전성 보장

[구글 공식 문서](https://developer.android.com/guide/navigation/navigation-getting-started?hl=ko)에서는 대상 간 이동을 위해 유형 안전성을 보장하고 인수값 전달을 제공하는 플러그인을 사용하는 것을 권장한다

이를 위하여 앱 단계의 `build.gradle`에 다음과 같은 플러그인을 추가한다.
```gradle
plugin{
    id 'androidx.navigation.safeargs.kotlin'
}
```

### 코드 레벨에서의 활용

이제 Fragment의 코드 레벨에서 다음과 같은 이동 코드를 활용할 수 있다.

```
override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    super.onViewCreated(view, savedInstanceState)
    binding.buttonMockTestStart.setOnClickListener {
        findNavController().navigate(TestIntroFragmentDirections.actionTestIntroFragmentToCountDownFragment())
    }
}
```

## 마무리

여기까지 Navigation API를 활용한 Fragment 구성을 정리해보았다. 앞으로 Fragment를 활용하여 화면을 구성하고자할때는, Navigation Graph를 활용하여 Visible하게 화면 구성을 설정하고 NavController를 활용한 간편한 화면 관리를 사용할 수 있을 것이다.


## 덧붙여

사실 여기서는 단순하게 Fragment 구조 성립과 이동을 정리해두었지만, 개인적으로는 앞으로 프로젝트 설계에 대한 많은 생각이 드는 API 였다.

해당 API는 이전부터 언급되었던 Single Activity 형식의 구조 설계에 최적화되어있으며, 앞으로 구글이 지향하는 Android 의 구조 설계에 대한 의지가 어느정도 드러나보인다는 점이다.
몇번의 Android Project를 통해 Activity간의 ViewModel 공유는 사실상 어려웠으며, `sharedViewModel`을 활용한 Fragment 간의 ViewModel 공유와 Navigation API 및 디자인 화면 제공을 통한 Fragment 관리의 유연한 설계가 가능하다는 점을 알게 되었다. 

앞으로의 프로젝트 설계에 Singel Activity 구조를 적극 검토하여 보다 나은 구조 설계에 대한 이해를 가져가도록 노력해보고자 한다.