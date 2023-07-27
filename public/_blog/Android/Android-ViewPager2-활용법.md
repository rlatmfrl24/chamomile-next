---
title: Android ViewPager2 활용법
date: '2019-09-26 00:00:11'
draft: false
category: 'Android'
---

Android Viewpager는 매우 유용한 기능이지만, 이전 버전에서는 다소 문제가 있어서 AndroidX에는 Viewpager2라는 새로운 패키지가 추가됐다. 화면구성에 매우 유용한 패키지지만 많이 다뤄지지 않아서 특징과 활용법을 다소 정리해보았다.

1. RecyclerView의 Adapter를 활용할 수 있기에 Learning Curve가 낮다.

2) Page별 다른 Fragment를 적용하고 싶을때는 FragmentPagerAdapter를 활용한다.

</br>다양한 Variation이 있긴하다. (FragmentStateAdapter, FragmentStatePagerAdapter 등) State가 포함된 Adapter는 Stateful한 Viewpager를 활용하고 싶을때 사용한다.

3. Viewpager2에서 양 옆의 페이지가 보이게 해주고 싶으면 다음 코드를 참조한다.

```kotlin

val dpValue = 100

val density = resources.displayMetrics.density

var pagerMargin = (dpValue * density).toInt()

viewPager_route_select.clipToPadding = false

viewPager_route_select.setPadding(pagerMargin, 0, pagerMargin, 0)

viewPager_route_select.pageMargin = pagerMargin/2

```

4. Viewpager에서 양 옆의 페이지의 동작을 막고싶으면 선언부에 `BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT`을 추가해준다.

```kotlin

inner class ViewPagerAdapter(fm: FragmentManager, frags: List<Fragment>) : FragmentPagerAdapter(fm, BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT) {

    private val mFragments = frags

    override fun getItem(position: Int): Fragment {

        return mFragments[position]

    }

    override fun getCount() = mFragments.size

}

```

4. TabLayout의 setupWithViewPager는 Viewpager2를 지원하지 않는다. TabLayout과 Viewpager2를 같이 사용하기 위해서는 TabLayoutMediator를 사용한다.

```kotlin

TabLayoutMediator(tabLayout_route_selelct, viewPager_route_search, object: TabLayoutMediator.OnConfigureTabCallback {

    override fun onConfigureTab(tab: TabLayout.Tab, position: Int) {

        (viewPager_route_search.adapter as ViewPagerAdapter).also {

            tab.setText(it.pageList[position])

        }

    }

}).attach()

```

이외에도 무궁무진한 활용법이 있으면, 추가할 예정이다.
