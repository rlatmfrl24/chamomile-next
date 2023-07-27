---
title: Android App Loading 대기화면 설정
date: 2020-02-25 08:02:86
category: Android
draft: false
---

## 들어가기 전에

Android Application을 구동하면 Activity Lifecycle에 의해 onCreate Process가 끝날 때까지 약간의 대기 시간이 존재한다. Android에서 기본으로 제공하는 App Theme를 사용하게 되면 해당 대기 화면이 하얀색이나 검은 화면이 된다.

본인의 Concept에 맞는 대기화면을 설정하고 싶은 경우에는 다음과 같은 방식으로 대기 화면을 설정할 수 있다.

## 대기화면으로 사용할 배경 설정

먼저 대기화면으로 사용할 화면을 Drawable로 구현해야한다.

> /res/drawable/splash_background.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@color/blue_violet" />
    <item
        android:drawable="@drawable/welcome"
        android:gravity="center">
    </item>
</layer-list>
```

## 전용 App Theme 생성

개발자마다 다를 수 있지만, Android Project의 Style은 _style.xml_ 또는 *theme.xml*에서 설정한다. 기본적으로는 *style.xml*에 설정한다.

> style.xml

```xml
<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
    <!-- Customize your theme here. -->
    <item name="windowNoTitle">true</item>
    <item name="colorPrimary">@color/black</item>
    <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
    <item name="colorAccent">@color/blue_violet</item>
    <item name="actionMenuTextColor">@color/white</item>
    <item name="android:actionMenuTextColor">@color/white</item>
    <item name="android:homeAsUpIndicator">@drawable/ic_arrow_back_white_24dp</item>
</style>
```

이 파일에 대기화면 전용 Theme를 추가한다.

> style.xml

```xml
...

<style name="SplashTheme" parent="AppTheme">
    <!-- Customize your theme here. -->
    <item name="windowNoTitle">true</item>
    <item name="android:windowBackground">@drawable/splash_background</item>
    <item name="android:windowDrawsSystemBarBackgrounds">false</item>
    <item name="colorPrimary">@color/black</item>
    <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
    <item name="colorAccent">@color/blue_violet</item>
    <item name="actionMenuTextColor">@color/white</item>
    <item name="android:actionMenuTextColor">@color/white</item>
    <item name="android:homeAsUpIndicator">@drawable/ic_arrow_back_white_24dp</item>
</style>
```

여기서 중요한건 **windowBackground** 와 **windowDrawsSystemBarBackgrounds** 2 항목이다.

- **windowDrawsSystemBarBackgrounds**은 대기화면의 Android System Bar 표시여부를 설정한다.
- **windowBackground**은 대기 화면의 Background를 지정된 Drawable로 변경하는 것이다.

## Manifest 적용

해당 Theme를 설정하고나면, 원하는 액티비티에 해당 Theme를 적용시켜 준다.

> AndroidManifest.xml

```xml
<activity
    android:name=".ui.splash.SplashActivity"
    android:screenOrientation="portrait"
    android:theme="@style/SplashTheme"
    android:windowSoftInputMode="stateAlwaysHidden|adjustResize">
    <intent-filter>
        <action android:name="android.intent.action.MAIN"/>
        <category android:name="android.intent.category.LAUNCHER"/>
    </intent-filter>
</activity>
```

이렇게 설정하고나면 대기화면이 정상적으로 변경된 것을 확인할 수 있다.
