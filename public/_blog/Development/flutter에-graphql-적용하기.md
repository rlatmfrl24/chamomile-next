---
title: Flutter에 GraphQL 적용하기
date: 2020-03-24 07:03:74
category: Development
draft: false
---

앞서 [Heroku, Docker, Prisma2를 활용한 GraphQL Server 제작해보기](https://sulfurbottom.netlify.com/Development/heroku-docker-prisma2%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-graphql-server-%EC%A0%9C%EC%9E%91%ED%95%B4%EB%B3%B4%EA%B8%B0/)를 통해서 GraphQL 임시 서버를 만든 후, 그것을 Heroku에 올려보았다. 이제는 Flutter에서 해당 GraphQL Service를 호출해보는 방법을 정리해보았다.

## 고민

사실 Flutter에 GraphQL을 적용하는 법은 이미 튜토리얼과 가이드가 많이 나와있다. 하지만 나의 고민은 단순한 GraphQL을 통해 통신만 완성하는 것이 아닌 좀더 실전 레벨의 적용법이 필요했다.
앞서 서버를 구현할 때 로그인까지 고려해서 GraphQL Server를 만들었는데, Access Token이 있는 경우와 없는 경우를 클라이언트가 구분하지 못한다면 대략 낭패이다. 근데 대부분의 예제를 이미 Access Token을 확보된 상태에서 GraphQL Client를 구현하는 예제로 작성해 놓아서 대략 난감했었지만...

결론은 내가 미련했던 것으로 판명났다. 애초에 이를 해결해주는 라이브러리와 공식 문서가 있었던 것... 이래서 사람은 영어를 잘하고 봐야한다. 영어를 모르고 대충 맥락으로만 파악하니 눈앞에 정답이 있어도 알아먹지를 못한다ㅠ

어쨌건 내가 꽤나 고생했던 적용법이었기 때문에 허접하게나마 정리해둔다.

## GraphQL Flutter 설치

우선 Flutter 프로젝트에 GraphQL을 사용하기 위해선 [GraphQL Flutter](https://pub.dev/packages/graphql_flutter)를 설치해야 한다. 평점 98점의 대단히 우수한 라이브러리이다. 거기다 인증정보를 저장하기 위하여 [SharedPreferences](https://pub.dev/packages/shared_preferences)를 사용한다.

> pubspec.yaml

```yaml
dependencies:
  flutter:
    sdk: flutter
  graphql_flutter: ^3.0.0
  shared_preferences: ^0.5.6+3
  cupertino_icons: ^0.1.2
```

## GraphQL Config

그다음에는 GraphQL을 활용하기 위한 설정파일을 만들어준다.

> config.dart

```dart
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Config {
  static final HttpLink _httpLink = HttpLink(
    uri: '<GraphQL Endpoint URL>'
  );

  static final AuthLink _authLink = AuthLink(
    getToken: () async {
      SharedPreferences pref = await SharedPreferences.getInstance();
      return pref.getString("token");
    }
  );

  static final Link link = _authLink.concat(_httpLink);

  static ValueNotifier<GraphQLClient> initializeClient() {
    ValueNotifier<GraphQLClient> client = ValueNotifier(
      GraphQLClient(
        cache: OptimisticCache(dataIdFromObject: typenameDataIdFromObject),
        link: link
      )
    );
    return client;
  }
}
```

이렇게 구현해놓으면 SharedPreferences에 Token이 없으면 그냥 Token 없이 호출하고, Token이 있으면 인증정보와 함께 호출한다.

## GraphQL Provider 적용

이제 App 전체에서 GraphQL을 사용하기 위해서 GraphQL Provider를 적용시켜줘야 한다.

> main.dart

```dart
class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return GraphQLProvider(
      client: Config.initializeClient(),
      child:  MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: LoginPage(title: 'Practice'),
      ),
    );
  }
}
```

## Query, Mutation 클래스 작성

이 부분이 내가 Flutter에 GraphQL 환경을 구성하면서 가장 고생한 부분이다. Flutter GraphQL에서 사용하는 Query, Mutation 형식이 GraphQL 서버에서 사용하는 GraphQL 형식과 달랐던 것이다.

일반적으로 Parameter를 사용하지 않는 Query라면 상관이 없는데, Parameter가 있다면 구성이 다소 복잡해진다. 이 예시에서는 Query는 Parameter는 사용하지 않고, Mutation은 Paramter를 사용하여 구현해보겠다.

> queries.dart

```dart
class Queries {
  static String profile = """
    query {
      items {
        id
        title
      }
    }
  """;
}
```

> mutations.dart

```dart
class Mutations {
  static String loginMutation = """
    mutation login(\$email : String!, \$password: String!){
      login(email: \$email, password: \$password) {
        token
      }
    }
  """;
}
```

## GraphQL Query

이제 GraphQL Query를 사용해서 데이터를 받아보겠다.

> test.dart

```dart
Query(
    options: QueryOptions(documentNode: gql(Queries.profile)),
    builder: (QueryResult result, {VoidCallback refetch, FetchMore fetchMore}) {
    if (result.hasException) {
        return Text(result.exception.toString());
    }
    if (result.loading) {
        return Text('Loading..');
    }
    List test = result.data['items'];
    return ListView.builder(
        itemCount: test.length,
        itemBuilder: (context, index) {
            return Text(test[index]['title']);
        });
    })),

```

## GraphQL Mutation

다음은 GraphQL을 활용하여 Mutation을 활용하는 예제이다.

> main.dart

```dart
Mutation(
    options: MutationOptions(
        documentNode: gql(Mutations.loginMutation),
        update: (Cache cache, QueryResult result) {
            if (result.hasException){
                print(['optimistic', result.exception.toString()]);
            } else {
                // Do something
            }
        },
        onCompleted: (dynamic resultData) {
            String token = resultData['login']['token'];
            _saveToken(token);
            Fluttertoast.showToast(msg: token);

            Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => Test())
            );
        }
    ),
    builder: (RunMutation runMutation, QueryResult queryResult) {
        return RaisedButton(
            child: Text('test'),
            onPressed: () {
                _formKey.currentState.save();
                runMutation({'email': email.trim(), 'password': password.trim()});
            }
        );
    },
)
```

## 정리

예제 위주의 단순한 설명이었지만, 이렇게 하나의 프로젝트 적용 예시를 만들기 전까지 꽤나 오랜 시간이 걸렸다. 원래는 Spearmint 프로젝트에 활용하려고 했으나 Spearmint의 특징상 Heroku에 유지하기가 쉽지 않아서 그냥 연습용 예제 프로젝트로 마치고 Spearmint 구성은 다시 생각해볼 생각이다.

## 참고자료

[/ graphql / flutter](https://hasura.io/learn/graphql/flutter-graphql/queries/2-create-query/)
