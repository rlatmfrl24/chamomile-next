---
title: Android Fragment와 ViewPager2를 활용한 화면 구성하기
date: 2020-10-20 16:10:61
category: Android
draft: false
---

## 개요

담당한 프로젝트에서 하나의 Business Process를 다수의 화면에 나누어 Step By Step으로 진행하는 화면을 구성하게 되었다.

그래서 나는 해당 프로세스스를 하나의 Activity가 담당하게하고, 나누어진 프로세스는 각각의 Fragment에서 진행하도록 나누며, 각각의 Fragment가 하나의 ViewModel를 활용하도록 구성했다.

하나의 ViewModel를 공유하는 다수의 Fragment를 구성하는 방법은 해당 [링크]()에서 설명해놓았다.

해당 프로세스를 작업한 후, 앞으로도 유사한 프로세스를 자주 만날 것 같아서 이번 기회에 정리하기로 했다.

## Activity 구성

1. 우선 전체 프로세스를 담당할 Activity를 만들고, 데이터를 관리한 ViewModel를 만든다.

```kotlin

class ProcessActivity : BaseActivity(){

    ...
    //Koin을 활용한 ViewModel Injection
    private val processViewModel: ProcessViewModel by viewModel()
    ...

}

```

2. 해당 Activity에 Fragment들을 표시할 위치에 **ViewPager2** 를 위치시킨다.

```xml
<androidx.constraintlayout.widget.ConstraintLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:layout_behavior="com.google.android.material.appbar.AppBarLayout$ScrollingViewBehavior">


    <androidx.viewpager2.widget.ViewPager2
        android:id="@+id/view_pager_process"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        />

</androidx.constraintlayout.widget.ConstraintLayout>

```

## ViewPagerAdapter 구성

Activity 내부에 해당 **ViewPager2**를 사용하기 위한 **ViewPagerAdapter**를 `FragmentStateAdapter`를 상속하여 다음과 같이 구성한다.

```kotlin

private inner class ViewPagerAdapter(activity: BaseActivity): FragmentStateAdapter(activity) {

    // 화면에 표시할 Fragment 리스트
    val pageList = listOf(
        FragmentA(),
        FragmentB(),
        FragmentC()
    )

    override fun getItemCount(): Int {
        return pageList.size
    }

    override fun createFragment(position: Int): Fragment {
        return pageList[position]
    }
}
```

## PagerAdapter 적용 및 설정

구성한 **ViewPagerAdapter**를 다음과 같이 Activity의 *ViewPager2*에 적용한다.

```kotlin
//ViewPagerAdapter Object 생성
private val pagerAdpater by lazy {
    ViewPagerAdapter(this)
}

...

override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    //Databinding이 적용된 Activity
    binding.viewPagerProcess.apply {
        // Adapter 적용
        adapter = pagerAdapter
        // 사용자의 Swipe 동작에 의해 화면이 이동하지 않도록 설정
        isUserInputEnabled = false
        /*
         * Viewpager2의 메모리 상에 Load시켜주는 화면 숫자 설정
         * 해당 예시는 화면의 숫자만큼 Load하도록 설정했다.
         * 메모리 관리에 유의하여 사용해야 한다.
        */
        offscreenPageLimit = pagerAdapter.itemCount
    }
}

```

## Page 이동 구현

이제 Page 이동을 위한 기능들을 구현해야한다.

```kotlin

fun moveNext() {
    if (binding.viewPagerProcess.currentItem+1 < pagerAdapter.itemCount) {
        binding.viewPagerProcess.setCurrentItem(binding.viewPagerProcess.currentItem+1, true)
    }
}

fun movePrev() {
    if (binding.viewPagerProcess.currentItem != 0){
        hideSoftKeyboard()
        binding.viewPagerProcess.setCurrentItem(binding.viewPagerProcess.currentItem-1, true)
    } else {
        finish()
    }
}

fun moveTo(page: Int) {
    hideSoftKeyboard()
    binding.viewPagerProcess.setCurrentItem(page, true)
}


```
