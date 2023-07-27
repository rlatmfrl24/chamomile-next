---
title: Android DrawerLayout 적용해보기
date: '2019-10-17 00:00:11'
draft: false
category: 'Android'
---

요즘에는 쓰이는 앱이 많이 줄었지만, 여전히 강력한 Navigation 기능인 Drawer 구현을 위한 DrawerLayout 구현에 대해 정리했다.

우선 Drawer를 사용할 화면은 DrawerLayout으로 감싸야한다. 그 후 NavigationView를 추가해준다.

```xml

<androidx.drawerlayout.widget.DrawerLayout

  xmlns:android="http://schemas.android.com/apk/res/android"

  xmlns:app="http://schemas.android.com/apk/res-auto"

  android:id="@+id/drawer_main"

  android:layout_width="match_parent"

  android:layout_height="match_parent">



  <androidx.constraintlayout.widget.ConstraintLayout

    android:layout_width="match_parent"

    android:layout_height="match_parent">

    // Main Layout

  </androidx.constraintlayout.widget.ConstraintLayout>



  <com.google.android.material.navigation.NavigationView

    android:id="@+id/navigation_main"

    android:layout_width="wrap_content"

    android:layout_height="match_parent"

    android:layout_gravity="start"

    app:headerLayout="@layout/nav_header"

    app:menu="@menu/menu_navigation"/>



</androidx.drawerlayout.widget.DrawerLayout>



```

여기서 Navigation Header에 쓸 레이아웃은 `nav_header`에 구현해주고, Navigation Menu에 들어갈 Item들은 menu형식으로 리소스를 만들어준다.

```xml

<?xml version="1.0" encoding="utf-8"?>

<menu xmlns:android="http://schemas.android.com/apk/res/android">

    <item

        android:id="@+id/item_home"

        android:title="@string/home"/>

    <item

        android:id="@+id/item_new_article"

        android:title="@string/articles"/>

</menu>

```

마지막으로 DrawerLayout을 사용하는 Activity에서 다음과 같이 구현한다.

```kotlin

class MainActivity : AppCompatActivity(), NavigationView.OnNavigationItemSelectedListener {

  override fun onCreate(savedInstanceState: Bundle?) {

    ...

    // NavigationView에 Listener 적용

    navigation_main.setNavigationItemSelectedListener(this)

    ...

    // Drawer가 닫인 후에 화면 전환하도록 변경

    drawer_main.addDrawerListener(object: DrawerLayout.DrawerListener{

        override fun onDrawerStateChanged(newState: Int) {}

        override fun onDrawerOpened(drawerView: View) {}

        override fun onDrawerSlide(drawerView: View, slideOffset: Float) {}

        override fun onDrawerClosed(drawerView: View) {

            supportFragmentManager.beginTransaction().apply {

                replace(R.id.container_main_body, currentFragment)

            }.commit()

        }

    })

  }



  // Naviation View의 Listener 구현

  override fun onNavigationItemSelected(item: MenuItem): Boolean {

    when (item.itemId){

        R.id.item_home->

            replaceFragment(DashboardFragment())

        R.id.item_new_article->

            replaceFragment(NewArticleFragment(), titleText = getString(R.string.articles), setFilterVisible = true)

      }

    }

    drawer_main.closeDrawer(GravityCompat.START)

    return true

  }

}



```
