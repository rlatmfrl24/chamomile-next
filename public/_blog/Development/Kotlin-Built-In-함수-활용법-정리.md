---
title: Kotlin Built-In 함수 활용법 정리(filter, map, let, apply, also)
date: '2019-10-17 00:00:11'
draft: false
category: 'Development'
---

드디어 길고길었던 신규 개념 시리즈의 마지막이다.

이번에는 코딩하면서 익혔던 Kotlin의 Built-in 함수 사용법을 정리해보았다. 이것보다 더 다양한 Built-in 함수들이 있지만 그것은 역시 익숙해지면 다시 추가해볼 생각이다. 역시 구글이 만들어서 그런지 엄청나게 편리하다.

## filter

filter는 말그대로 collection 중에 조건에 맞는 데이터만 추출해주는 함수이다.

```kotlin

val list = [1,2,3]

val filterList = list.filter{ number-> number != 2 }  // [1, 3]

```

## map

map은 collection의 모든 요소를 원하는 방식으로 수정할 수 있는 함수이다.

```kotlin

val list = [1,2,3]

val mappedList = list.map{ number-> number+2 } // [3, 4, 5]

```

## let

let은 Nullable한 변수형을 Null Check 해주는 함수이다.

```kotlin

val data: String?

data?.let { notNullData -> ... }

```

## apply

apply는 특정 오브젝트를 반복적으로 호출해야할 필요가 있을 때 사용할 수 있다.

```kotlin

data.apply{

it.feature1()

it.feature2()

it.feature3()

...

}

```

## also

also는 특정 작업으로 생성된 오브젝트를 재사용하고자 할 때 사용한다.

```kotlin

feature().also{ object-> ... }

```
