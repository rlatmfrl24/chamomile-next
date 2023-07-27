---
title: Android Databinding 적용해보기
date: 2020-10-21 13:10:80
category: Android
draft: false
---

## 개요

요즘 주로 사용되는 Android Architecture인 MVVM Pattern에서는 Databinding이 필수적인 개념으로 사용되고 있다. 이번 포스트에서 Android Project에 Databinding을 적용하는 방법을 다뤄 볼 예정이다.

## 구현

### 1. Gradle 설정

App 단위 Gradle에서 Databinding을 활성화시켜준다.

`build.gradle(app)`

```groovy
buildFeatures {
    dataBinding = true
}
```

### 2. Layout 설정

이제 Databinding 을 적용할 Layout 을 구현한다.

```xml
<layout>

    <data>
        <variable
            name="viewModel"
            type="com.soulkey.project.ui.mainViewModel" />
    </data>

    <androidx.core.widget.NestedScrollView>
    ...
    </androidx.core.widget.NestedScrollView>

<layout>
```

해당 XML의 구성을 분석해보면, 전체 Layout을 `<layout>` Tag로 감싸고, 그 안에서 화면의 *Root*가 될 부분을 담당하는 Tag와 화면에서 사용하는 데이터를 다룰 부분을 `<data>` Tag로 감싼다.

### 3. Actitivy Databinding

이제 화면을 담당하는 Activity를 Layout과 연결해준다.

```kotlin
class MainActivity : BaseActivity() {
    private val binding: ActivityMainBinding by lazy {
        DatabindingUtil.setContentView(this, R.layout.activity_main)
    }
    //Koin을 활용한 ViewModel Injection
    private val mainViewModel: MainViewModel by viewModel()
}
```

`ActivityMainBinding`은 프로젝트의 **Databinding** 설정에 의해 Layout을 생성하면 자동으로 생성되는 클래스이다. 이를 활용하여 `DatabindingUtil`을 활용하여 화면을 연결시켜준다.

이제 `binding` 변수를 활용하여 Activity와 연결된 **ViewModel**을 전달해준다.

```kotlin
binding.viewModel = mainViewModel
```

### 4. Fragment Databinding

만약 화면을 담당하는 구성요소가 **Fragment**라면 다음과 같이 연결한다.

```kotlin
class MainFragment : Fragment() {
    private lateinit var binding: FragmentMainBinding
    // Koin을 활용한 ViewModel Injection
    private val mainViewModel: MainViewModel by sharedViewModel()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DatabindingUtil.inflate(inflater, R.layout.fragment_main, false)
        binding.lifecycleOwner = viewLifecycleOwner
        binding.viewModel = mainViewModel

        return binding.root
    }
}
```

### 5. 데이터 연결

이제 Layout에 ViewModel이 연결되었으니, ViewModel의 데이터를 화면에서 직접 연결해줄 수 있다.

```xml
<TextView
    android:id="@+id/text_test"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="@{viewModel.textData}
/>
```

## 후기

이제 기본적은 Databinding 활용에 대해 다루어보았다.
이후에는 RecyclerView에서 Databinding을 적용해보는 예제를 다뤄볼 예정이다.

[RecylcerView에도 Databinding 적용해보기](https://sulfurbottom.netlify.com/Android/recyclerview에도-databinding-적용해보기)
