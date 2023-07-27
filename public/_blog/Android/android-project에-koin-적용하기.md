---
title: Android Project에 Koin 적용하기
date: 2020-10-21 15:10:89
category: Android
draft: false
---

## 개요

나는 Android Project를 최초 생성하면 가장 먼저 적용하는 것이 **Dependency Injection** 라이브러리이다. 프로젝트 내 각 구성요소간 의존성 주입을 관리해주는 DI 라이브러리는 프로젝트 전체 구조에 대한 유연한 확장성을 부여해주기 때문이다.

Android Project에서 가장 많이 쓰이는 DI 라이브러리는 **Dagger2**, **Koin**, **Kodein**이 있는데, 나는 **Koin**이 구성하기에 간편해서 주로 사용한다. 이번 포스트에서 Android Project에 Koin을 적용하는 방법을 다루어 보겠다.

## 구현

### 1. Gradle

App 단위 Gradle에 Koin 라이브러리를 추가한다.

```groovy
//Koin
implementation "org.koin:koin-core:2.0.1"
implementation "org.koin:koin-android:2.0.1"
implementation "org.koin:koin-androidx-viewmodel:2.0.1"
```

### 2. DI Package

프로젝트 폴더에 _DI_ Package를 생성하고 다음과 같이 구현한다.

`App.kt`

```kotlin
class App : Application(){
    override fun onCreate() {
        super.onCreate()
        startKoin {
            androidLogger()
            androidContext(this@App)
            modules(AppModule)
        }
    }
}
```

`AppModule.kt`

```kotlin
val AppModule = module {
    // 여기에 의존성 라이브러리 추가 및 ViewModel 적용
    ...
}
```

### 3. `AndroidManifest.xml`

```xml
...
<application
    android:name=".lib.di.App"
    android:allowBackup="true"
    android:icon="@mipmap/ic_launcher"
    android:label="@string/app_name"
    android:roundIcon="@mipmap/ic_launcher_round"
    android:supportsRtl="true"
    android:theme="@style/AppTheme">
...
```

여기까지 적용하면 기본적인 Koin 구조가 적용된 것이다. `AppModule.kt` 내부에 의존성 라이브러리 및 `ViewModel`를 적용하여 DI 관리를 수행하면 된다.

## 후기

이제 앞으로 `AppModule.kt` 내부에 구현되어야할 요소에 대한 포스트를 이어나갈 예정이다.
