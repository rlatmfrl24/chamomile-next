---
title: Android GPS Location 획득하기
date: 2020-10-20 16:10:67
category: Android
draft: false
---

## 개요

이번에는 Android App에서 사용자의 위치 정보를 사용하기 위한 권한 취득 및 Data Handling에 대해 다루어 보겠다.

## Dependencies

사용자의 위치 권한 획득을 위한 Dependency 설정은 다음과 같다.

```groovy
//Google Play Service - Location API
implementation "com.google.android.gms:play-services-location:17.0.0"
```

## `AndroidManifest.xml`

또한 권한 취득을 위해 `AndroidManifest.xml`에 다음과 같은 권한 설정이 필요하다.

```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
```

여기서,

`ACCESS_FINE_LOCATION`은 기기의 인터넷, 와이파이, GPS 정보를 활용해 정확한 위치를 가져오는 것이고,

`ACCESS_COARSE_LOCATION`은 기기의 GPS 정보를 활용하여 대략적인 위치를 가져오는 것이다.

## 권한 요청

Android Application이 위치 권한을 사용하기 위해서는 기기 사용자에 대한 동의가 필요하다.
해당 권한을 취득하기 위해 사용자에게 권한을 요청하는 코드는 다음과 같다.

```kotlin
// 위치 권한 요청
if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED
    && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
    ActivityCompat.requestPermissions(
        this,
        arrayOf(
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_COARSE_LOCATION
        ),
        PERMISSION_REQUEST_CODE
    )
}

...

//권한 요쳥 결과 처리
override fun onRequestPermissionsResult(
    requestCode: Int,
    permissions: Array<out String>,
    grantResults: IntArray
) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults)
    when (requestCode) {
        PERMISSION_REQUEST_CODE -> {
            if ((grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED)) {
                Timber.v("diver:/ Granted")
            } else {
                Toast.makeText(this, "Permission denied, Set as the Default Location", Toast.LENGTH_SHORT).show()
            }
        }
    }
}
```

## `fusedLocationClient`

Application이 위치 권한을 획득하면 `fusedLocationClient` 인스턴스를 생성하여 Google GPS Service를 활용하여 위치 정보를 가져올 수 있다. 사용 예시는 다음과 같다.

```kotlin
//위치 수신 인스턴스 생성
fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)

...

//위치 데이터 요청
fusedLocationClient.lastLocation.addOnSuccessListener { location ->
    location?.let {
        mainViewModel.updateCurrentLL(it.latitude, it.longitude)
    }
}.addOnFailureListener {
    mainViewModel.getRecentLL().also { LL->
        mainViewModel.updateCurrentLL(LL.first.toDouble(), LL.second.toDouble())
    }
}

```

## 후기

위치 데이터 요청 및 데이터를 활용하는 예제는 이것보다 좀 더 다양한 활용 예시가 존재한다.
또한 위치 데이터는 Google Map API 와 연계가 가능하니 차후에 Google Map을 다룰 일이 있으면 좀 더 보완할 예정이다.
