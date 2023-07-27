---
title: React Enviroment 설정
date: '2019-11-26 00:00:11'
draft: false
category: 'Javascript'
---

오랜간만에 블로그로 복귀했다.

원래 블로그라는게 무언가 막히고 문제를 해결했을 때를 위해 남겨놓는건데, 문제를 해결해도 눈앞에 문제가 쌓여있는지라 조급해져서 정리를 잊게 되는 것 같다.

이번에 Applemint라는 산을 어느정도 넘은 기념으로 그동안 미뤄왔던 포스팅을 한번에 정리해보려고 한다. 기억나는 것 위주로...(심지어 아직 Applemint는 모바일 구조 변경이라는 거대한 사업이 남아있다..)

이번 포스트는 React App 배포 관련 Enviroment 설정이다.

Netlify라는 호스팅 서비스가 있는데, GitHub에 있는 Repository의 master 브랜치를 자동으로 빌드하여 서비스해주는 서비스이다.gh-page와의 차이점은 배포시에 사용자가 직접 빌드해주는지, 아니면 master branch가 업데이트되면 자동으로 빌드해주는지의 차이가 있다. 최근 GitHub에도 자동 빌드 기능이 생긴 것 같지만, 그것은 나중에 공부해보기로...

React 프로젝트 상에 백엔드 서버의 API Key와 같은 민감한 정보들은 GitHub에 올릴수 없기때문에 .gitignore에 반드시 포함시켜줘야한다. 하지만 그렇다고해서 민감한 정보가 들어간 파일마다 gitignore에 포함시켜버리면 repo의 master branch에 제외되기 때문에, 자동 빌드에 큰 애로사항이 생긴다.

이를 위하여 민감한 데이터는 환경설정 파일인 .env에 별도로 저장해주고, 해당 파일만 .gitignore에 포함시켜주면 된다. 실제로 create-react-app을 통해 프로젝트를 생성하면 자동으로 .env과 관련된 설정들이 .gitignore에 추가된다.

이 설정파일은 민감한 정보뿐만이 아니라, 빌드 형식에 따라 변수값을 다르게 주고 싶을 경우에도 활용할 수 있다. production 빌드와 development 빌드의 설정값을 다르게 해야하는 경우는 왕왕 있는 편이니, 유용하게 활용하면 된다.

.env 파일 형식은 다음과 같다.

```

REACT_APP_API_KEY=AI...

REACT_APP_AUTH_DOMAIN=apple...

REACT_APP_DATABASE_URL=https://app...

REACT_APP_PROJECT_ID=appl...

REACT_APP_STORAGE_BUCKET=appl...

REACT_APP_MESSAGING_SENDER_ID=6507...

REACT_APP_APP_ID=1:650..

REACT_APP_MEASUREMENT_ID=G-YD..

```

이러한 설정파일은 실제 코드에서 `process.env.REACT_APP..`과 같이 참조시켜주면 된다. 보다 자세한 설명이 있는 블로그를 아래 참조한다.

[[React.js] CRA에서 환경변수 설정하기](http://lemonja.blogspot.com/2018/08/reactjs-cra.html)
