---
title: Android windowSoftInputMode 관련문제
date: '2019-10-17 00:00:11'
draft: false
category: 'Android'
---

## Android windowSoftInputMode 관련 이슈 발생시

안드로이드 내장 키보드를 활용하는 UI 구현시에는 다양한 문제가 봉착하게 된다.

우선 Android Manifest에서 해당화면에서 내장 키보드 사용시 해당 화면을 어떻게 처리할지 지정해줘야 한다.

이와 관련된 4가지 옵션이 존재하는데, UI 구현상에서 키보드 관련 이슈가 발생하면 해당 부분을 고려하는 것이 좋다.

1. adjustResize

2. adjustPan

3. adjustUnspecific

4. adjustNothing

나의 경우에는 키보드 존재 유무에 무관하게 화면을 Resize 하지 않고, 화면 Interaction시 바로 키보드를 내리도록 구현하려고 했다.

따라서 Android Manifest에서 해당 Activity에 대한 windowSoftInputMode 옵션을 adjustResize -> adjustPan으로 지정했다.

그러나 이 경우 키보드 이벤트 발생시 화면이 잠겨서 별도의 Listener 없이는 화면이 잠기는 특이한 경우가 발생했다. 이와 관련해서 온갖 쌩쇼를 다했지만 결국 해당 Activity에 adjustNothing을 적용함으로써 해결했다.

즉 결론은, 내장 키보드와 관련된 UI 구현 이슈가 발생했을 때는 반드시 해당 Activity의 windowSoftInputMode 옵션을 고려해야 한다.
