---
title: Heroku, Docker, Prisma2를 활용한 GraphQL Server 제작해보기
date: 2020-01-16 16:01:03
category: Development
draft: false
---

이번에 신규 Toy Project인 Spearmint를 시작하면서 Serverless 개념으로부터 벗어나기로 보기로 다짐했다. Firebase, Serverless를 비롯한 Serverless Service들은 편리하지만 SDK 의존성이 높고, 성능 활용 범위가 제한적이라는 단점이 있다. 이번에 만들어보는 프로젝트도 사실 기능이 복잡하지 않지만, 기술적 시야를 넓히기 위해 직접 Server를 구현하기로 마음먹었다.

본론으로 들어가서, Server 기반은 **Heroku**, ORM Framework는 **Prisma**, API 통신 방식은 **GraphQL**, 배포방식은 **Docker**를 활용해보기로 했다.

## Heroku에서 App 생성 및 SQL Add-on 추가

먼저 [Heroku](https://www.heroku.com/platform)에 가입한 후, Dashboard로 접속해서 신규 App을 등록한다.

**Heroku**는 기본적으로 POSTGES SQL을 **Free Tier**로 제공한다. `Configure Add-ons`를 통해서 **Heroku Postgres**를 프로비저닝하면 POSTGRES SQL 서비스를 활용할 수 있다.

## Prisma2 설치 및 프로젝트 생성

prisma2 설치 및 프로젝트 생성 가이드는 직접 기술하기보단 [**Prisma2 Documentation**](https://github.com/prisma/prisma2/blob/master/docs/getting-started.md)에 상세히 기술되어 있으니 참고하면 좋다.

해당 설치과정에 내가 설치한 옵션은 다음과 같다.

1. Starter Kit
2. TypeScript
3. GraphQL API(+ Auth)
4. PostgresQL

원래는 Go 언어에 도전해보고 싶었으나, 아직 미지원인 관계로 Typescript 옵션을 채택했다. 마찬가지로 난 NoSQL에 익숙한지라 DB는 mongoDB로 도전해보고 싶었지만, 유감스럽게도 미지원이었다. 2가지 모두 다음에 도전해보는걸로...

3번째에서 선택한 GraphQL+Auth 옵션은 GraphQL Nexus Library를 활용하여 GraphQL 체계를 잡아줄뿐만 아니라, OAuth 세팅까지 한번에 잡아준다😍

마지막으로 Heroku에 PostgreSQL 서비스를 개설해놨으니 그걸 활용하기 위해 4번 옵션을 채택하면 ORM 설정까지 자동으로 잡아준다. 해당 설정에서 DB 접근을 위해 제공하는 DB URL까지 입력하면 DB Connection 설정까지 완벽히 적용된다.

프로젝트 생성 완료 후

```
npx prisma2 dev
npm run dev
```

이 2가지 명령어를 통해 프로젝트가 정상적으로 생성되었는지 여부를 알 수 있다.

추가로 Prisma2에서 제공하는 **Photon.js**와 **GraphQL Playground**를 통해 간편하고 놀라운 DB 데이터 접근 및 GraphQL 설정을 확인할 수 있다.

## Docker 설정

프로젝트 생성이 완료되면 해당 프로젝트를 Docker Container에 올려야한다. Docker 사용법 관련해서는 나중에 별도 포스팅으로 다룬 예정이고 여기서는 해당 프로젝트에 필요한 설정만 다룬다.

> Dockerfile

```dockerfile
FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN yarn
EXPOSE 4000
CMD [ "npm", "start" ]
```

> .dockerignore

```
node_modules
npm-debug.log
```

Dockerfile 생성 후 빌드 후 Container 실행까지 완료하면 Deploy 준비는 완료되었다.

## Deploy to Heroku

Heroku에 Docker Container를 Deploy하기 위해서는 [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)를 설치해야한다. Windows 환경에서는 _기본 명령 프롬포트_ 로만 Heroku 명령어를 활용할 수 있으나 참고하자.

설치 이후에 CMD 창을 통해서 다음과 같은 과정을 통해 Deploy한다.

```
heroku login
//참고로 인증을 위한 Browser 창이 자동으로 열리지 않으면 수동으로 복사+붙여넣기해서 인증이 가능하다.

heroku git:remote -a <heroku-app-name>

heroku cotainer:login

heroku container:push web
```

여기까지 진행하면 정상적으로 Heroku App에 Container가 Deploy된다.

## 덧붙임

해당 포스팅에서 다루지 않은 내용이 있는데, 예고편 형식으로 적어둔다.

- _나만 빼고 다 알고 있었던 Docker 기초 활용법_
- _Prisma2를 활용한 GraphQL Modeling + API 구현 가이드_
