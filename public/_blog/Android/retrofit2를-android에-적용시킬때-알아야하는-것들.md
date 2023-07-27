---
title: Retrofit2를 Android에 적용시킬때 알아야하는 것들
date: 2020-02-18 07:02:51
category: Android
draft: false
---

## 들어가기 전에

[Retrofit2](https://square.github.io/retrofit/)는 Android Project에 사용되는 가장 대표적인 API 통신 Library이다. 이 라이브러리를 활용하기 위한 수많은 매뉴얼과 적용 Tutorial이 보편화되어 있지만, 적용시킬 때 알아야하거나 주의해야할 점들을 한번에 정리해보았다.

_해당 튜토리얼은 특정 라이브러리나 프로젝트 컨셉에 특화된 튜토리얼입니다._

### Retrofit2 및 관련 라이브러리 설치

Retrofit2 활용을 위한 라이브러리 설치는 다음과 같다.

> App.gradle

```groovy
//Retrofit
implementation 'com.squareup.retrofit2:retrofit:2.7.1'
implementation 'com.squareup.retrofit2:converter-gson:2.7.1'
implementation 'com.squareup.okhttp3:okhttp:4.2.2'
implementation 'com.squareup.okhttp3:logging-interceptor:4.2.2'
implementation 'com.squareup.retrofit2:adapter-rxjava2:2.7.1'

//RxKotlin
implementation "io.reactivex.rxjava2:rxkotlin:2.4.0"
implementation 'io.reactivex.rxjava2:rxandroid:2.1.1'
```

기본 Retrofit 라이브러리를 제외하고 설명을 덧붙이자면,

- **converter-gson**은 API로부터의 JSON 응답을 Parsing하기 위한 라이브러
- **okhttp3** 관련 라이브러리는 **Interceptor** 구현을 위한 라이브러리
- **adapter-rxjava2**는 API로부터의 응답을 ReactiveX 형태로 처리하기 위한 라이브러리
- 그외 RxKotlin 관련 라이브러리는 ReactiveX 적용을 위한 필수 라이브러리이다.

덧붙여, 일부 Android Project에서 Build 또는 실행 시에 다음과 같은 에러가 발생할 수 있다.

```
java.lang.BootstrapMethodError: Exception from call site #1 bootstrap method
```

이 경우에는 **App.gradle** 파일의 **android** Block 안에 다음과 같이 추가해준다.

> App.gradle

```groovy
android {
    defaultConfig { ... }
    buildTypes { ... }

    //이 부분을 추가한다.
    compileOptions {
        targetCompatibility = "8"
        sourceCompatibility = "8"
    }
}
```

### Interface 정의

먼저 정의된 API에 대한 Interface를 정의해야한다. 사전에 공유된 API Documentaion를 확인한 후, 내가 호출한 API Endpoint를 위한 Interface 다음과 같이 정의한다.

> RainDropAPI.kt

```kotlin
interface RaindropAPI {
    object EndPoint {
        const val baseURL = "API_BASE_URL"
    }

    @GET("rest/v1/raindrop")
    fun getRaindrop(): Single<Response<GetRaindropResponse>>

    @POST("rest/v1/raindrop")
    fun createRaindrop(@Body body: Raindrop): Single<Response<CreateRaindropResponse>>
}
```

원래 Retrofit2 기본 튜토리얼은 해당 Interface에 대한 Return Type을 '**Call<\*>**'로 정의하고 있으나, 이 프로젝트에서는 Rxjava2 Adapter가 요청에 대한 응답을 Single 또는 Observable 형태로 변환시켜준다.

### Request, Response 정의

보통 데이터 정의를 위한 Data class 정의는 **Model** Package에서 관리하는 것이 일반적이지만, 단순히 API 요청, 응답 정보를 처리하기 위한 Data class는 별도로 관리하는 것이 개인적으로 편했다.

따라서, API Interface를 정의한 Package 내부에 Request, Response의 Data Class를 정의했다.

> Request.kt

```kotlin
data class Raindrop (
    val title: String,
    val link: String,
    val tags: List<String>,
    val collection: JsonObject
)
```

Request Body에 JSON 데이터를 보내기 위해서는 위와 같이 Data Class를 정의하면 된다.

> Response.kt

```kotlin
data class GetRaindropResponse(
    @SerializedName("item")
    val itemDetail: JsonObject
)

data class CreateRaindropResponse(
    @SerializedName("result")
    val result: Boolean,
    @SerializedName("item")
    val itemDetail: JsonObject
)
```

Server로부터의 응답을 수신하기 위한 Data Class를 위와 같이 정의한다. 여기서 **@SerializedName** 이라고 표시된 Annotation이 중요한데, 서버의 JSON 응답 데이터를 GSON Converter가 파싱하여 해당 변수에 매핑해준다.

### API Client 정의

이제 실제로 서버의 응답을 처리해주는 Client 클래스를 생성한다.

> RaindropClient.kt

```kotlin
class RaindropClient(private val api: RaindropAPI) {
    fun getCollections() : Single<Response<GetCollectionsResponse>>{
        return api.getCollections()
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
    }

    fun createRaindrop(
        title: String,
        link: String,
        tags: List<String>,
        collectionName: String
    ): Single<Response<CreateRaindropResponse>> {
        val collectionObject = JsonObject().apply {
            this.addProperty("\$id", collectionName)
        }
        Raindrop(title, link, tags, collectionObject).also {
            return api.createRaindrop(it)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
        }
    }
}
```

API Interface가 ReactiveX를 적용한 응답 형태를 정의하고 있기때문에, 각 Client 함수에서 subscribeOn과 observeOn을 적용시켜주었다.

### Server 응답 처리하기

이제 해당 Client 클래스를 활용하여 ViewModel에서 API 응답을 처리해줄 Logic을 구현한다.

원래 ReactiveX를 적용하지 않은 Call<\*>형태의 응답에 대해서는 **execute** 또는 **enqueue** 함수를 활용하여 처리했으나, 이미 Single 또는 Observable 형태로 응답이 반환되기 때문에 그에 맞게 처리해주면 된다.

> RaindropViewModel.kt

```kotlin
class RaindropViewModel(
    private val raindropClient: RaindropClient
) : ViewModel() {
    fun loadCollections() = raindropCollectionRepository.getCollections()
    fun sendToRaindrop(
        title: String,
        url: String,
        collectionName: String,
        tags: List<String>
    ): Single<Response<CreateRaindropResponse>> {
        return raindropClient.createRaindrop(title, url, tags, collectionName)
    }
}
```

'Call<\*>'형태의 처리를 위한 참고 예시는 [여기](https://howtodoinjava.com/retrofit2/retrofit-sync-async-calls/)에 정의되어있다.

### 의존성 주업(Koin)

이제 여태까지 정의한 Interface 및 Class들에 대한 의존성 주입을 수행해야한다.
의존성 주업 라이브러리는 Koin을 사용했다.

> AppModule.kt

```kotlin
single {
    Retrofit.Builder()
        .baseUrl(RaindropAPI.EndPoint.baseURL)
        //JSON 데이터 Parsing을 위한 Gson Converter 적용
        .addConverterFactory(GsonConverterFactory.create())
        //서버 응답 데이터를 ReactiveX 적용을 위한 Rxjava2 Adapter 적용
        .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
        .build()
        .create(RaindropAPI::class.java)
}
single { RaindropClient(get()) }
single { RaindropViewModel(get()) }
```

### Interceptor 클래스 구현하기

Interceptor 클래스는 Retrofit2를 통해서 요청하는 Request를 도중에 캐치하여 사용자가 원하는 형태로 Customize하기위한 클래스이다.
일반적으로는 Request Header를 API Interface에서 일일히 매핑하는 것이 번거롭기 때문에 구현한다.

> RaindropInterceptor.kt

```kotlin
open class RaindropInterceptor(private val currentUser: CurrentUser) : Interceptor {

    @Throws(IOException::class)
    override fun intercept(chain: Interceptor.Chain): Response {
        return if (currentUser.getCurrentUser() != null){
            chain.proceed(request(chain.request()))
        } else {
            chain.proceed(chain.request())
        }
    }

    private fun request(request: Request): Request {
        return request.newBuilder()
            .addHeader("Authorization", "Bearer ${currentUser.getRaindropToken()}")
            .addHeader("Content-Type", "application/json")
            .url(request.url)
            .build()
    }
}
```

구현 이후에는 기존의 의존성 주입 모듈에 아래와 같이 Interceptor를 추가해준다.

> AppModule.kt

```js{16}
//OkHttpClient
single {
    OkHttpClient.Builder()
        .addInterceptor(HttpLoggingInterceptor().apply { level = HttpLoggingInterceptor.Level.BODY })   //Http Logger
        .addInterceptor(RaindropInterceptor(get())) //Custom Interceptor
        .connectTimeout(CONNECT_TIMEOUT, TimeUnit.SECONDS)
        .readTimeout(READ_TIMEOUT, TimeUnit.SECONDS)
        .writeTimeout(WRITE_TIMEOUT, TimeUnit.SECONDS)
        .build()
}

//Retrofit
single {
    Retrofit.Builder()
        .baseUrl(RaindropAPI.EndPoint.baseURL)
        .client(get())
        .addConverterFactory(GsonConverterFactory.create())
        .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
        .build()
        .create(RaindropAPI::class.java)
}
```

## 정리

Retrofit2를 프로젝트에 적용하는 동안, 프로젝트 전반에 대한 재설계까지 하면서 자연스럽게 RxKotlin 적용까지 실습하게 되었다. 앞으로 API 관련 프로젝트가 있을때 이 포스트를 참고하면서, 조금씩 업데이트해볼 예정이다.
