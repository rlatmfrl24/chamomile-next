---
title: RecyclerView에도 Databinding 적용해보기
date: 2020-10-21 14:10:05
category: Android
draft: false
---

## 개요

이전 포스트에서 [기본적인 Databinding 적용](https://sulfurbottom.netlify.com/Android/android-databinding-적용해보기)을 다루어 보았다. 이번 포스트는 이전 포스트를 응용하여 **RecyclerView**에 **Databinding**을 적용해보겠다.

## 구현

### 1. Item Layout 구성

**RecyclerView**의 Item이 될 View의 Layout XML을 Databinding 형식으로 구성한다.

```xml
<layout>
    <data>
        <variable
            name="model"
            type="com.soulkey.imdg_android.lib.model.TestModel" />
    </data>

    <androidx.constraintlayout.widget.ConstraintLayout>
        ...
    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>
```

Item에 **Variable**을 구성할 때는 *ViewModel*을 연결하는 것도 좋지만, 나의 경우에는 단순 데이터 연결에 활용하기 때문에 List에 활용되는 Item의 Data Class를 적용하는 편이다.

### 2. Adpater 구현

실질적인 Databinding 연결은 `ViewHolder` 클래스에서 이루어진다.
다음 예시는 `ListAdapter<T, VH>`을 활용한 Databinding 연결 예시이다.

```kotlin
class TestAdapter: ListAdpater<TestModel, TestViewHolder>(object : DiffUtil.ItemCallback<TestModel>(){
    override fun areItemTheSame(oldItem: TestModel, newItem: TestModel) {
        return oldItem.id == newItem.id
    }
    override fun areContentsTheSame(oldItem: TestModel, newItem: TestModel) {
        return oldItem == newItem
    }
}) {
    inner class TestViewHolder(
        private val parent: ViewGroup,
        // Databinding이 적용되는 부분
        private val binding: ItemTestModelBinding =
            DatabindingUtil.inflate(LayoutInflater.from(parent.context)),
            R.layout.item_test_model,
            parent,
            false
    ) : RecyclerView.ViewHolder(parent.root) {
        fun bind(item: TestModel) {
            // 해당 Item 데이터를 Item Layout의 Variable에 연결한다
            binding.model = item
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TestViewHolder {
        return TestViewHolder(parent)
    }

    override fun onBindViewHolder(holder: TestViewHolder, position: Int) {
        holder.bind(getItem(position))
    }
}
```

## 후기

Recyclerview에 Databinding을 적용하는 것은 단순 Fragment를 연결하는 것과 유사할 정도로 비슷하지만 전달되는 데이터를 Handling 할 경우 Data Flow를 주의깊게 확인하는 것도 중요하다.

다음번에는 Two-way Databinding을 다뤄볼 예정이다.

[Two-way Databinding 적용해보기](https://sulfurbottom.netlify.com/Android/two-way-databinding-적용해보기)
