---
title: React에 MobX 적용해보기
date: '2019-11-26 00:00:11'
draft: false
category: 'Javascript'
---

### 들어가기 전에

개인프로젝트를 진행하면서 React의 Hook만으로는 해결되지 않는 문제점들이 굉장히 많았다.

Hooks의 가장 어려운 점은 Hooks만의 절대적인 규칙이 있다는 점인데, 그중 하나가 반드시 상위클래스에서만 활용되어야 한다는 점이다. 상위-하위 컴포넌트 모든 것에 활용되는 상태나 데이터를 관리하기 위해서는 별도의 수단이 필요했다.

React를 공부하면서 주변사람들에게 가장 추천받았던 것은 단연 Redux였다. Redux는 Store라는 개념을 별도로 만들어 모든 컴포넌트에서 Store의 데이터에 접근할 수 있는 아주 매력적인 개념이었다.

하지만 막상 Redux를 도입하고자하니, 별도로 공부해야하는 장벽이 너무 많았다. React 개발 생초보인 나에게는 너무나도 복잡하고 귀찮은 개념들이었다. 하지만 이런 무식한 나도 굉장히 쉽게 Store 개념을 활용할 수 있는 훌륭한 라이브러리가 있었다.

### MobX란?

MobX는 Redux와 마찬가지로 Store 개념을 가진 라이브러리이면서도 React와는 독립적인 라이브러리이다. 그러면서도 Redux보다 사용이 간편하고 설정이 쉬운 라이브러리이다. 공부하면서 참고했던 블로그들이나 설명에서는 Mobx는 Redux보다 React스러움(?)이 떨어지는 라이브러리라고 한다.

쉽다고하더라도 결국 프로젝트에 어설프게나마 적용하는데는 한참 걸렸다. 대부분의 고수들은 `yarn eject`를 통한 react 프로젝트의 설정값을 수정한 후, Decorator 방식으로 예제를 작성하셨는데, 나는 Webpack에 대한 지식도 없거니와 React 프로젝트의 단순함이 변형되는 것이 싫어서 일부러라도 돌아가는 방식을 채택했다.

### 적용법

우선 yarn을 통해 프로젝트에 2가지 라이브러리를 추가해준다.

```

yarn add mobx mobx-react

```

이후에 별도의 파일에 MobXContext를 활용하는 컴포넌트를 만들어준다.

`Common.js`

```js
import { useContext } from 'react'

import { MobXProviderContext } from 'mobx-react'

function useStores() {
  return useContext(MobXProviderContext)
}

export default useStores
```

다음으로는 프로젝트에서 활용할 Store를 만들어준다.

`DataStore.js`

```js
import { decorate, observable, action } from 'mobx'

class DataStore {
  data = ''

  setData = value => {
    this.data = value
  }
}

decorate(DataStore, {
  keyword: observable,

  setData: action,
})

export default DataStore
```

그 다음에는 해당 Store를 활용할 프로젝트의 App Component를 Provider로 묶어준다.

`index.js`

```js
import { Provider } from 'mobx-react'

import AuthStore from './store/DataStore'

const data = new DataStore()

ReactDOM.render(
  <Provider data={data}>
    <App />
  </Provider>,

  document.getElementById('root')
)
```

이러면 프로젝트에서 Store를 활용할 준비는 다 된 것이다. 실제로 컴포넌트에서 Store를 활용하는 예제를 만들어보자.

```js

function useDataStore() {

  const { data } = useStores();

  return useObserver(() => ({

    data: data.data,

    setData: data.setData

  }));

}



function feature(){

  const { data, setData } = useDataStore()

  ...

}

```

또는, 다음과 같은 예제도 가능하다.

```js
const Feature = observer(() => {
  const { data } = useStores()

  return <div>{data.data}</div>
})
```

## 마무리

MobX는 이러한 기초적인 예제보다 더 많고 다양한 기능을 지원하는 라이브러리이다. Redux에 대한 진입이 두려운만큼 훌륭한 대체수단이라고 생각한다. 이후에도 Documentaion을 참고하여 효율적인 프로젝트에 도움이 될거라고 생각한다.

### 참고블로그

[mobx-react와 React Hooks API 함께 사용하기](https://blog.rhostem.com/posts/2019-07-22-mobx-v6-and-react-v16-8)

[Mobx-react](https://github.com/mobxjs/mobx-react)
