---
title: Android XML Error 발생시
date: '2019-09-24 00:00:11'
draft: false
category: 'Android'
---

가끔식 Android Studio에서 작업하다보면 XML 참조 구성이 망가지거나 Dependency가 제대로 적용이 안될때가 있다.

전형적인 사례로는

```log

attribute android layout_width is not allowed here

```

이런 메시지가 뜨는 말도 안되는 에러가 있다.

아마도 IntelliJ IDE 툴의 전형적인 단점인 수없이 발생하는 버그 중 하나인 것같다(-\_-)

일단 조치법을 나열하자면,

1. File > Invalidate Caches / Restart

2. C:/Users/[User]/.AndroidStudio3.x/system/caches/ 내용 삭제

나는 통합된 All-in-One 툴을 좋아하기 때문에 안드로이드 관련 기능을 전부 제공하는 Android Studio를 매우 좋아하지만 매번 버그때문에 돌아버릴 지경이다.

담번에는 VSC와 이원화해서 개발을 해볼까 생각중이다. Android Studio는 그냥 빌드툴로만 사용하거나 해야지...
