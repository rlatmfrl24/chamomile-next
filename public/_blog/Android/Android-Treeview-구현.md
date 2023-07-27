---
title: Android Treeview 구현
date: '2019-10-17 00:00:11'
draft: false
category: 'Android'
---

## Android Treeview 구현

프로젝트 당시 Android Treeview를 구현할 일이 있었는데, 기본적으로 지원하는 UI가 아니어서 생각보다 까다롭게 구현했다. 구현 과정을 거치고나니 잘만 활용하면 다음에도 또 활용할 일이 있을 것 같아서 정리해보았다.

우선, 처음부터 전부 구현하지는 않았고 누군가 만들어 놓은 [Treeview 라이브러리](https://github.com/shineM/TreeView)를 Custom했다.

해당 라이브러리를 장점으로는,

- 각 계층별로 Recyclerview의 Adapter를 활용할 수 있어 Customize가 용이하다.

- 계층간 연결성이 자유롭다.(계층 1의 자식으로 계층 3, 4를 연결할 수 있다.)

- Checkable 옵션을 지원하며, Checked된 아이템을 가져올 수 있다.

- Expand, Collapse Animation을 제공한다.

또한, 해당 라이브러리의 단점은,

- XML 단계에서 View를 Customizing 할 수 없다.(Code Level에서만 구현 가능)

- Node 검색을 지원하지 않으므로, 특정 지점의 Node 편집이 어렵다.

- 기본으로 제공되는 Animator가 버그가 있어서 별도로 수정해줘야한다.

```kotlin
treeView.setItemAnimator(DefaultItemAnimator())
```

기본적인 활용법은 Documentation에 잘 정리되어 있지만, 원하는 대로 구현하기 위해서는 꽤나 많은 구현요소가 필요하다.

- _예시코드 추후 등록 예정_
