---
title: Android Room migration Error
date: '2019-09-26 00:00:11'
draft: false
category: 'Android'
---

Android Room Database 사용시 각기 별개의 스마트폰을 활용해 테스트를 할 경우, 드물지만 데이터베이스 버전이 맞지 않아서 DB 영역 접근시 에러가 나는 경우가 있다.

나의 경우에는 Room Database 버전이 2로 설정되어있는 상태여서, Room이 자동으로 version 1의 데이터를 migration하려다가 데이터가 없어서 에러가 발생하는 경우이다.

이 경우에는 아예 App를 초기화하고 재설치해야한다. 하지만 지난번에는 재설치로도 해결안되는 경우가 있어서, 조치방법을 별도로 정리해둔다.

1. 앱 상세 정보 - 데이터 삭제 후 앱 삭제 후 재설치

2. SD카드/Android/data/에 App Data가 존재 여부 확인 및 삭제

3. Room Database Builder 선언부에서 `fallbackToDestructiveMigration` 추가

```kotlin

Room.databaseBuilder(application, F9Db::class.java, DB_NAME)

    .fallbackToDestructiveMigration()

    .allowMainThreadQueries()

    .build()

```

4. Android Manifest에서 `fullBackupContent`를 `false`로 지정

```xml

<application

  ...

  android:fullBackupContent="false"

  ...>

```
