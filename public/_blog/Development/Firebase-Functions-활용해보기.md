---
title: Firebase Functions 활용해보기
date: '2019-11-26 00:00:11'
draft: false
category: 'Development'
---

## 들어가기 전에

최근에 'Serverless'라는 개념이 있다. 말그래도 서버가 없다는 개념이지만, 실제적으로는 서버 구현에 의존적인 아키텍쳐를 뜻하는게 정확하다고 본다. 이번에 개인 프로젝트를 진행하면서 활용해본 Serverless의 대표격인 'Firebase'를 활용해보면서 가장 대표적인 기능인 'Functions'의 활용법을 정리해보고자한다.

## 구성 및 설정

Firebase Cloud Functions(이하 functions)는 Node.js 기반으로 작성되기 때문에, node.js 및 자바스크립트에 대한 지식이 필수적이다. 프로젝트 구성방식은 여기에 직접 기술하는 것보다 공식문서가 훨씬 잘 작성되어 있으므로, 이대로 설치하면 무리가 없다.

[Cloud Functions 작성 및 배포](https://firebase.google.com/docs/functions/get-started?hl=ko)

## 함수 작성 및 배포

functions 프로젝트 구성이 끝난 후에 가장 중요한 곳은 `index.ts`이다.(나는 Typescript로 프로젝트를 생성했다.)

여기서 Firebase의 기본설정 및 함수 설정이 가능하다.

이후의 참고 프로젝트는 다음과 같다.

[applemint-firebase](https://github.com/rlatmfrl24/applemint-firebase)

## 마무리

너무 간략하게 작성한게 아닌가 싶지만, 실제로 구성과 사용은 어렵지 않다. 참고 프로젝트에 예약 함수에 대한 예시 코드까지 있으므로 적절히 참고하면 신규 프로젝트 작성시 다시 사용할 수 있을 것 같다.
