---
title: React Hook 간단 설명
date: '2019-11-26 00:00:11'
draft: false
category: 'Javascript'
---

#### React 16.8 버전부터 정식으로 릴리즈되어 화제가 된 Hook에 대한 간략한 설명과 사용법을 메모해둔다.

## 배경

React는 상태 관리를 props나 state를 통해 관리해왔다. 이때문에 상태 변화가 있는 Component는 반드시 Class Component로 구현하는 예제가 많았다. 이를 통해 상위-하위 컴포넌트로 이어지는 데이터 흐름을 꾸준하게 유지시켜줘야만 상태 관리가 유용했다.

Hook은 이러한 점을 개선할 수 있는 기능인데, 대표적으로 함수형 컴포넌트에서 상태 관리를 가능하도록 만들어졌다. 즉, 이제 React 프로젝트는 함수형 컴포넌트만으로도 상태 관리를 활용한 App 구현이 가능해졌다.

## useState

가장 기본적인 Hook의 활용은 다음과 같다.

```js
function feature() {
  const [state, setState] = useState()

  return <></>
}
```

위와 같은 선언을 통해 해당 컴포넌트는 `state`라는 상태에 대한 상태 관리를 처리할 수 있다. 컴포넌트 내에서 `state`를 변경할 때는 `setState`를 활용하면된다.

## useEffect

두번째로 기본적인 Hook의 활용은 다음과 같다.

```js
function feature() {
  useEffect(() => {
    doSomething()
  }, [])
}
```

위와 같은 활용은 해당 컴포넌트가 Mount되면서 처리해야할 기능들이 있을 때 활용된다. 기존 React에서 활용되는 componentDidXxx()와 같은 함수들이 Mount시의 Side Effect를 처리해주었는데, Hook을 활용해서 간소화시켰다고 보면된다.

## 덧붙임

Hook의 활용법과 기능은 더욱 무궁무진하지만, 가장 기본적인 기능만 정리해두었다. 이후에 Hook에 대한 지식과 기능이 확장되면 그때 좀더 업데이트를 해볼 생각이다. 마지막으로 참고가 될만한 블로그를 링크해둔다.

[리액트의 Hooks 완벽 적봉하기](https://velog.io/@velopert/react-hooks)
