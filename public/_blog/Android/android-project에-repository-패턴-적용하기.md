---
title: Android Project에 Repository 패턴 적용하기
date: 2020-10-21 17:10:37
category: Android
draft: false
---

## 개요

Android Project에서 화면의 데이터를 관리하는 구성요소는 *ViewModel*이지만, 각종 *Data Source*로부터 해당 *ViewModel*에 데이터를 공급할 때는 **Repository 패턴**을 활용한다.

## 구현

기본적으로 프로젝트 폴더 내에 `data`라는 Package 경로를 생성하여 활용한다. 해당 포스트에서는 *Room Database*로부터 데이터를 공급받아 *ViewModel*로 제공하는 **Repository 패턴**을 구현하는 예시를 다루겠다.

### 1. Interface 구성

`UserRepository.kt`

```kotlin
interface UserRepository {
    fun insert(user: User)
    fun delete()
}
```

### 2. Interface 구현

`UserRepositoyrImpl.kt`

```kotlin
class UserRepositoryImpl(private val userDao: UserDao): UserRepository {
    fun insert(user: User){
        ...
    }

    fun delete(){
        ...
    }
}
```

### 3. 의존성 주입

`AppModule.kt`

```kotlin
...
single<UserRepository> { UserRepositoryImpl(get()) }
...
```

해당 예시와 같은 형태로 **Repository** 인스턴스를 생성하고 *Koin*을 활용하여 *ViewModel*에 주입할 수 있게 된다.
