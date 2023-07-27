---
title: Android의 LiveData와 MediatorLiveData
date: '2019-10-17 00:00:11'
draft: false
category: 'Android'
---

이번에는 AAC 구성요소 중 하나의 LiveData와 MediatorLiveData의 활용범을 정리해보았다.

## LiveData

먼저 기본적인 LiveData는 다음과 같이 반환형으로 사용된다.

```kotlin

fun feature(): LiveData<String>{

  ...

}

```

즉 해당 함수는 String 자료형에 대한 LiveData를 반환한다는 얘기가 된다. 함수가 반환하는 데이터를 Observing하고 싶다면 다음과 같이 구현한다.

```kotlin

feature().observe(this, Observer{

  ...

})

```

`this` 자리에는 *Lifecycle Owner*가 들어가야하며, 대개 *Context*를 가진 객체를 요구한다. _Observer_ 객체 내부에는 LiveData의 상태 변화시에 처리해야할 동작을 구성한다.

## MutableLiveData

함수의 반환형이 아닌 직접 변수나 객체로 선언하여 필요에 따라 값을 바꿀 수 있는 객체가 필요한 경우에는 MutableLiveData를 쓴다.

선언형은 다음과 같다.

```kotlin

val MutableData : MutableLiveData<String>()

```

이러면 해당 변수는 임의로 변경가능한 LiveData 변수가 된다. 만약 사용자가 해당 변수의 값을 변경하고 싶다면,

```kotlin

MutableData.value = "newValue"

```

이런식으로 값을 변경시켜주면 되고, 해당 변경내역은 Observer들에게 전달된다.

또한, 다음과 같은 방식으로도 MutableLiveData에 값을 전달하는 것도 가능하다

```kotlin
MutableData.postValue("newValue")
```

## MediatorLiveData

만약 다수의 LiveData를 묶어서 Observing하고 싶다면 MediatorLiveData를 사용한다.

```kotlin

val Data1 : MutableLiveData<String> = MutableLiveData()

val Data2 : MutableLiveData<String> = MutableLiveData()

val MergedData : MeditorLiveData<String> = MediatorLiveData()



MergedData.addSource(Data1){ ... }

MergedData.addSource(Data2){ ... }

```

위와 같이 설정하면 `MergeData`에 소속된 LiveData들이 변경될 때매다 `{ ... }` 내부의 동작이 수행되며 해당 결과를 Return 해주어야 한다.

만약 **MediatorLiveData**가 묶어서 Observing해야할 Data가 많다면 다음과 같은 기능함수를 Override하여 응용할 수 있다.

`BaseUtil.kt`

```kotlin
fun <T> MediatorLiveData<T>.addSourceList(vararg liveDataArgument: MutableLiveData<*>, onChanged: () -> T) {
    liveDataArgument.forEach {
        this.addSource(it) { value = onChanged() }
    }
}
```

`MainActivity.kt`

```kotlin
val receivers = MediatorLiveData<List<User>?>().apply {
    this.addSourceList(basicReceiver, additionalReceiverList) { getReceivers() }
}
```
