---
title: Android Project에 Room 적용하기
date: 2020-10-21 16:10:06
category: Android
draft: false
---

## 개요

**Room**은 Android Project에 내부 저장소를 활용하여 DB처럼 활용하기 위하여 제공되는 Android Library이다. 자세한 내용은 [Android 공식 문서](https://developer.android.com/training/data-storage/room?hl=ko)에서 확인할 수 있기 때문에, 이 포스트에서는 Project에 적용하는 간단한 방법에 대해서만 다룰 예정이다.

> 참고문서 - [Android Architecture Components #6 - Room](https://tourspace.tistory.com/28)

## 구현

### 1. Gradle

App 단위 Gradle에 다음과 같이 라이브러리를 추가한다.

```groovy
def room_version = "2.2.5"

implementation "androidx.room:room-runtime:$room_version"
implementation "androidx.room:room-ktx:$room_version"
kapt "androidx.room:room-compiler:$room_version"
```

### 2. Entity 정의

다음과 같이 `@Entity`를 활용하여 Room Database에서 사용할 데이터를 정의할 수 있다.

`User.kt`

```kotlin
@Entity(tableName="tb_user")
data class User {
    @PrimaryKey var id: Int,
    @ColumnInfo(name="first_name") var firstName: String?,
    @ColumnInfo(name="last_name") var lastName: String?
}
```

### 3. DAO(Data Access Object) 정의

DAO Interface를 정의하여 Database에서 해당 Entity에 접근하기 위한 객체를 만들고 AppDatabase를 정의한다.

`UserDao.kt`

```kotlin
@Dao
interface UserDao {
    @Query("SELECT * FROM user")
    fun getAll(): List<User>

    @Query("SELECT * FROM user WHERE uid IN (:userIds)")
    fun loadAllByIds(userIds: IntArray): List<User>

    @Query("SELECT * FROM user WHERE first_name LIKE :first AND " +
            "last_name LIKE :last LIMIT 1")
    fun findByName(first: String, last: String): User

    @Insert
    fun insertAll(vararg users: User)

    @Delete
    fun delete(user: User)
}
```

`AppDatabase.kt`

```kotlin
@Database(entities = arrayOf(User::class), version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun userDao(): UserDao
}
```

### 4. Room Instance 생성

*Koin*을 활용하여 **Room Instance**를 _Singleton_ 객체로 선언한다. 이는 Room 활용을 위한 Instance를 매번 생성하지 않고 Singleton 상태로 메모리에 유지한 상태로 의존성을 주입하기 위한 것이다.

`AppModule.kt`

```kotlin
single {
    Room.databaseBuilder(
        get(),
        AppDatabase::class.java,
        "app_database"
    )
    .fallbackToDestructiveMigration()
    .allowMainThreadQueries()
    .build()
}

// User DAO 객체 생성
// 의존성 주입시 Database 자체보단 접근용 객체인 DAO를 전달하는 것이 좋으며, 해당 DAO도 Singleton으로 유지하도록 구조를 만들었다.
single { get<AppDatabase>().UserDao() }
```

### 5. DAO 객체 활용

이제 *Koin*의 `AppModule.kt`에서 **Room**의 *AppDatabase*의 **User** 테이블에 접근하기 위한 **UserDao**를 주입할 수 있고, 다음과 같이 활용될 수 있다.

`AppModule.kt`

```kotlin
single { get<AppDatabase>().UserDao() }

// User Repository 객체에 User DAO 주입
single<UserRepository> { UserRepositoryImpl(get()) }
```

해당 코드에서 사용된 **Repository**에 대한 것은 나중에 별도의 포스트로 다를 예정이다.

[Andoird Project에 Repository 패턴 적용하기](https://sulfurbottom.netlify.com/Android/android-project에-repository-패턴-적용하기)

## 후기

기본적인 Room 설정 방법을 다루어보았다. Room에 대한 더 다양한 활용방법은 [Android 공식 문서](https://developer.android.com/training/data-storage/room?hl=ko)에 자세히 서술되어 있으니, 필요에 따라 적용하면 좋을 것이다.
