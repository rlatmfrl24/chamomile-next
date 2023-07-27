---
title: Android Lint Report 만들기
date: '2019-09-17 00:00:11'
draft: false
category: 'Android'
---

Android 정적 분석을 위해서 Android Lint를 활용했다. 물론 IDE 내부에서 Lint 결과를 확인할 수 있지만, 별도로 Report를 만드는 기능은 아직 에러가 있기에 이를 위한 팁을 정리해둔다.

### Lint Report Export

1. Move to Project Directory

2. Command Line Tool Open

3. Gradle 도구 실행

   - Windows

   ```shell-session

   ./gradlew.bat lint

   ```

   - Linux

   ```

   gradlew lint

   ```

4. Move to `app/build/report/`

5. Check `lint-result.xml`

### Java Compile issue 발생시

Android에서 특정 라이브러리(e.g. Dagger)는 Java 8 버전이 아닌 경우, compile 과정에서 에러가 발생할 수 있다. 이를 위해서는 개발 환경의 java 및 javac을 Java 8 버전으로 지정해주어야 한다.(일반적으로 환경변수를 설정해줘야 한다.)
