---
title: Android RecyclerView의 ListAdapter
date: '2019-11-27 00:00:11'
draft: false
category: 'Android'
---

## 소개

ListAdapter는 ListView의 어댑터로써 알려져왔는데, 2018 Google I/O에서 RecyclerView의 신규기능으로 재탄생했다. 이 라이브러리는 기존의 Recyclerview의 Adapter에서 별도의 기능으로써 일일히 구현해야했던 기능들을 묶어준데다, 성능까지 뛰어난 라이브러리이다. 해당 라이브러리 적용 과정을 메모해둔다.

## 적용

클래스 선언부는 다음과 같다.

```kotlin

class CustomAdapter(): ListAdapter<User, CustomAdapter.CustomViewHolder>

(object : DiffUtil.ItemCallback<User>(){

  override fun aerItemsTheSame(oldItem: User, newItem: User): Boolen {

    return oldItem.name == newItem.name

  }

  override fun areContentsTheSame(oldItem: User, newItem: User): Boolean {

    return oldItem == newItem

  }

})

```

선언부가 굉장히 복잡한데, 이 선언부에 User는 해당 Recycler에서 사용할 Item의 Data class model이 되는게 일반적이다.

해당 어댑터에서는 DiffUtil이 기본적으로 지원되는데, 선언의 Callback Method의 결과에 따라 내부 Item들을 변경시키거나 갱신하므로 매우 중요한 부분이다.

즉, 데이터가 변경되면 notifyDataChanged()와 같은 함수 처리없이 자동으로 DiffUtil을 통해 변경된 아이템만 자동으로 갱신해준다.

이후 Activity에서 RecyclerView에 다음과 같이 적용시켜준다.

```kotlin
val customAdapter = CustomAdapter()

recyclerview.adapter = customAdapter

customAdapter.submitList(...)
```

여기서 `submitList`는 Adapter에 리스트를 제공하여 RecyclerView를 갱신하도록하는 기능이다.

## 후기

기존 RecyclerView의 Adapter보다 더 뛰어나고 구현조차도 굉장히 편리하다. DiffUtil의 Callback 선언부만 세심하게 고려한다면 굉장히 간편하고 우수한 RecyclerView를 구현할 수 있다. 2018 Google I/O에서 같이 발표된 RecyclerView의 신기능은 Selection이라고 하나가 더 있는데, 이건 나중에 고려해볼 생각이다.
