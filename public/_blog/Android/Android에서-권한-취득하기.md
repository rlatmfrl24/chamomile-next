---
title: Android에서 권한 취득하기
date: 2020-03-08 13:54:84
category: Android
draft: false
---

## 개요

Android Project를 개발하다보면 기기의 권한을 취득해야하는 경우가 생긴다. 기기 내 저장소에 대한 읽기/쓰기 권한, 카메라 권한, GPS 권한 등등.. 이번 포스트는 기기의 권한 취득에 대한 적용방법을 알아보겠다.

## Permission API

가장 기본적인 방법은 구글에서 제공하는 [Permission API](https://developer.android.com/training/permissions/evaluating?hl=ko)를 사용하는 것이다.

먼저 `Manifest`에 앱이 요청할 수 있는 권한을 설정해주는 것이다.
```xml
<manifest ...>
    <uses-permission android:name="android.permission.CAMERA"/>
    <application ...>
        ...
    </application>
</manifest>
```
그리고 코드 레벨에서 유저에게 권한을 요청하는 코드 스니펫은 다음과 같다.
```kotlin
when {
    ContextCompat.checkSelfPermission(
            CONTEXT,
            Manifest.permission.REQUESTED_PERMISSION
            ) == PackageManager.PERMISSION_GRANTED -> {
        // You can use the API that requires the permission.
    }
    shouldShowRequestPermissionRationale(...) -> {
        // In an educational UI, explain to the user why your app requires this
        // permission for a specific feature to behave as expected. In this UI,
        // include a "cancel" or "no thanks" button that allows the user to
        // continue using your app without granting the permission.
        showInContextUI(...)
    }
    else -> {
        // You can directly ask for the permission.
        // The registered ActivityResultCallback gets the result of this request.
        requestPermissionLauncher.launch(
                Manifest.permission.REQUESTED_PERMISSION)
    }
}
```

해당 Permission API의 사용법이 다소 무성의하게 작성되어 있는 것처럼 느꼈다면 당신의 착각이다.

## [Dexter](https://github.com/Karumi/Dexter)

놀랍게도 Android의 Multi-Permission 관리를 용이하게 해주는 라이브러리가 있다. 바로 [Dexter](https://github.com/Karumi/Dexter)라는 라이브러리이다. 말로 설명할 필요없이 적용법을 보도록 하자

>`build.gralde`
```gradle
dependencies{
    implementation 'com.karumi:dexter:6.2.2'
}
```

```kotlin
Dexter.withContext(this)
	.withPermission(Manifest.permission.CAMERA)
	.withListener(new PermissionListener() {
		@Override public void onPermissionGranted(PermissionGrantedResponse response) {/* ... */}
		@Override public void onPermissionDenied(PermissionDeniedResponse response) {/* ... */}
		@Override public void onPermissionRationaleShouldBeShown(PermissionRequest permission, PermissionToken token) {/* ... */}
	}).check();
```

놀랍도록 간편하다. 또한 해당 라이브러리의 `README.md`에서 다양한 권한 취득을 위한 API를 제공하니 본인의 필요성에 맞게 사용하면 된다.

## 마무리

사실 권한 취득을 위한 코드 스니펫을 엄청 많이 준비했었는데, 동료 개발자분의 라이브러리 추천과 동시에 휴지조각이 됐다(...) 권한 취득에 있어서는 당분간 Dexter를 사용할 예정이며, 만약 이슈가 있을 경우 그를 해결하기 위한 방안을 모색할 예정이다. 

**결론은 주변에다 많이 물어보고 다니자..**