import { ProjectInfoDetailType, ProjectType } from "@/lib/typeDef";

const ProjectList: ProjectInfoDetailType[] = [
  {
    pid: "freight9",
    type: [ProjectType.Frontend, ProjectType.Android],
    title: "Freight9",
    organization: "Cyberlogitec",
    summary_kr: "해운 물류 포워딩 플랫폼 프로젝트",
    description_kr:
      "해운 물류 환경에서 이뤄지는 포워딩을 업무를 지원하는 플랫폼 개발 프로젝트. 선박 Booking 및 컨테이너 관리를 포함한 다양한 업무를 개선된 UI/UX로 지원하는 프로젝트",
    startDate: new Date("2018-10-01"),
    endDate: new Date("2021-04-01"),
    role: [
      `Login/Signup, Forgot Password, Booking, MarketPlace Android 화면 개발 담당`,
      `MarketPlace Service를 활용한 모의 거래 서비스 구축 담당`,
      `Android/Web 관련 형상관리 담당`,
    ],
    skill: [
      `MVVM 패턴을 활용한 Android 화면 개발`,
      `Retrofit2, OkhttpClient를 활용한 REST API용 통신 모듈 구성`,
      `Lifecycle, LiveData, DataBinding과 같은 Android Jetpack 라이브러리 활용`,
      `Dagger2를 활용한 의존성 주입`,
      `ListAdapter를 활용한 RecyclerView 구성`,
      `ViewPager, Treeview 등 다양한 Android UI 구현`,
      `Lottie를 활용한 애니메이션 구현`,
      `Room을 활용한 로컬 DB 구성`,
      `Firebase를 활용한 Push Notification 구현`,
      `React.js를 활용한 Web 화면 개발`,
      `MobX를 활용한 React.js 상태 관리`,
      `Selenium을 활용한 E2E 테스트 자동화`,
    ],
  },
  {
    pid: "allegro",
    type: [ProjectType.Frontend],
    title: "Allegro",
    organization: "Cyberlogitec",
    description_kr:
      "해운 프로세스의 Digital Transportation을 지향하는 운영 솔루션 프로젝트. 컨테이너 자원 관리 및 화물 수익성 관리 최적화를 지원하는 회사의 주요 솔루션에 대한 Refactoring 프로젝트",
    summary_kr: "컨테이너 자원 관리 및 화물 수익성 최적화 솔루션 프로젝트",
    startDate: new Date("2023-03-01"),
    endDate: new Date(),
    role: [`대표 UI Frontend 개발 담당`, `React.js UI Library 개발 담당`],
    skill: [
      `Bootstrap을 적용한 UI 개발`,
      `Next.js를 활용한 Frontend 및 UI Library 개발`,
      `Tailwind CSS를 활용한 UI 개발`,
      `Zustand를 활용한 React.js 상태 관리`,
      `Firebase를 활용한 Library 배포`,
    ],
  },
  {
    pid: "logichain-imdg",
    type: [ProjectType.Android],
    title: "Logichain-IMDG",
    organization: "Cyberlogitec",
    description_kr:
      "선박 터미널에 들어오는 컨테이너를 대상으로 수행되는 Blockchain 개념을 도입한 위험물 검사 신청 시스템 개발",
    summary_kr: "블록체인 기반 컨테이너 위험물 검사 신청 시스템 프로젝트",
    startDate: new Date("2020-09-01"),
    endDate: new Date("2020-12-01"),
    role: [
      `화주, 검사원, 고객용 Android App 개발 담당`,
      `블록체인 Mainnet 연동 및 테스트 담당`,
    ],
    skill: [
      `MVVM 패턴을 활용한 Android 화면 개발`,
      `Retrofit2, OkhttpClient를 활용한 블록체인 Mainnet 통신 모듈 구성`,
      `Koin을 활용한 의존성 주입`,
      `Dexter를 활용한 Permission 관리`,
      `Room을 활용한 로컬 DB 구성 및 내부 검색 모듈 구현`,
    ],
  },
  {
    pid: "container-mnr",
    type: [ProjectType.Android],
    title: "Container M&R Project",
    organization: "Cyberlogitec",
    description_kr:
      "컨테이너 유지보수 센터에 입고되는 컨테이너를 인식 넘버를 촬용한 이미지에 문자인식을 수행하여 컨테이너 정보를 자동 입력하고, 수리 내역 및 입고 상황을 관리해주는 솔루션 개발 프로젝트",
    summary_kr:
      "문자 이미지 인식을 활용한 컨테이너 유지보수 관리 시스템 프로젝트",
    startDate: new Date("2021-05-01"),
    endDate: new Date("2022-02-01"),
    role: [
      `Android App 개발 담당`,
      `문자 이미지 인식 모듈 개발 담당(ConPDS 라이브러리 활용)`,
      `Firebase를 활용한 Push Notification 구현`,
    ],
    skill: [
      `MVVM 패턴을 활용한 Android 화면 개발`,
      `Retrofit2, OkhttpClient를 활용한 REST API용 통신 모듈 구성`,
      `Lifecycle, LiveData, DataBinding과 같은 Android Jetpack 라이브러리 활용`,
      `Google GMS를 활용한 사용자 위치 정보 수집 및 활용 모듈 구성`,
      `Dexter를 활용한 Permission 관리`,
      `Firebase를 활용한 Push Notification 구현`,
      `Room을 활용한 로컬 DB 구성`,
    ],
  },
  {
    pid: "allegro-esvc",
    type: [ProjectType.Frontend],
    title: "Allegro E-Service",
    organization: "Cyberlogitec",
    description_kr:
      "선사의 업무를 지원하는 통합 운영 솔루션인 Allegro E-Service 개선 사업. 기존 한진해운의 Spring-Boot 기반의 Legacy System의 UI 개선 및 Flat Data의 DT 전환",
    summary_kr: "선사 업무 지원용 솔루션 프로젝트",
    startDate: new Date("2022-03-01"),
    endDate: new Date("2022-09-01"),
    role: [
      `Booking, Container 정보 조회 관련 Web UI 개발 담당`,
      `Card Layout 기반 UI Library 개발 담당`,
      `Flat Data의 DT 전환 담당`,
    ],
    skill: [
      `HTML, CSS, Javascript를 활용한 UI 재구축`,
      `PqGrid를 활용한 Grid UI 개발`,
    ],
  },
  {
    pid: "one-modernization",
    type: [ProjectType.Frontend],
    title: "Ocean Network Express Modernization",
    organization: "Cyberlogitec",
    description_kr:
      "일본 해운 물류 회사의 Shipping Monitoring/Freight-Forwarding System을 새롭게 재설계한 MSA 구조로 전환하는 신사업 플랫폼 프로젝트",
    summary_kr:
      "ONE 그룹 전용 Shipping Monitoring/Forwarding 솔루션 재설계 프로젝트",
    startDate: new Date("2022-09-01"),
    endDate: new Date("2023-05-01"),
    role: [
      `Container Status Monitoring 관련 Web UI 개발 담당`,
      `Monitoring Dashboard 관련 Visualization Library 개발 담당`,
      `Shipment Alert Dashboard 관련 Web UI 개발 담당`,
      `Frontend 관련 기술 지원 담당`,
    ],
    skill: [
      `Next.js, React.js, Typescript를 활용한 Web UI 개발`,
      `React-query를 활용한 REST API 통신 모듈 구성`,
      `Recoil을 활용한 상태 관리`,
      `VISX를 활용한 Visualization Library 개발`,
      `Tanstack Table을 활용한 Grid UI 개발`,
    ],
  },
  {
    pid: "opus-terminal",
    type: [ProjectType.Frontend],
    title: "OPUS Terminal",
    organization: "Cyberlogitec",
    description_kr:
      "해운 산업 관련 터미널에서 사용되는 선적 및 하역, 분류 및 보관과 관련된 터미널 운영에 대한 통합 솔루션에 대한 UI 개선 프로젝트",
    summary_kr:
      "선박 터미널의 선적, 하역, 분류 및 보관 관리용 통합 솔루션 프로젝트",
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-03-01"),
    role: [
      `기존 API 연동을 위한 Legacy 프로젝트 분석`,
      `Common UI Component 개발 담당`,
      `디자인 시스템 구축 담당`,
      `Container Inquiry 관련 Frontend 개발 담당`,
      `Transport Order 관련 Frontend 개발 담당`,
    ],
    skill: [
      `React.js, Typescript를 활용한 Web UI 개발`,
      `MUI를 활용한 UI Component 개발`,
      `Zustand를 활용한 상태 관리`,
    ],
  },

  {
    pid: "rebit-keyboard",
    type: [ProjectType.General],
    title: "REBIT A-KEYBOARD",
    organization: "Phill-IT",
    description_kr:
      "140개 언어 지원과 자동 추천 및 교정 기능을 지원하는 모바일 기기용 가상키보드 솔루션(갤럭시 S8 기본 키보드로 탑재)",
    summary_kr:
      "다국어 언어 지원 및 자동 추천/교정 기능을 지원하는 안드로이드용 가상 키보드 솔루션",
    startDate: new Date("2017-02-01"),
    endDate: new Date("2018-09-01"),
    role: [
      `MNIST 데이터를 학습한 Tensorflow CNN 모델을 Tensorite 형태로 경량화하며 모바일에서 활용 가능한 필기 인식 모듈 개발`,
      `사용자의 입력 키워드들을 정규화하여 관심 주제를 도출하여 연계된 광고 키워드들과 일치시켜주는 모듈 개발`,
      `사용자의 입력 키워드를 통해 다음에 나올 단어를 유추하여 상위 3개 단어를 추천해주는 모듈 개발`,
    ],
    skill: [
      `Redmine을 활용한 Task 관리`,
      `Jenkins를 활용한 CI/CD`,
      `TF-IDF, N-gram, Text Density, Word2Vec, Ahocorasick 등을 활용한 키워드 추출 및 유사도 분석`,
      `Apache Solr을 활용한 키워드 검색`,
      `Tensorite를 활용한 경량화된 CNN 모델 개발`,
      `JNI, AAR을 활용한 Android Native Module 개발`,
      `MVC 패턴을 활용한 Android Application 개발`,
      `Picaso, ButterKnife, EventBus 활용`,
    ],
  },
  {
    pid: "dont-panic",
    type: [ProjectType.Frontend],
    title: "Don't Panic",
    organization: "Hyundai Cradle",
    description_kr:
      "현대크래들 주관 오픈이노베이션 플랫폼 크리에이터 부문 출품. 대면교육의 경험을 충분히 담아내기 어려운 온라인 교육 환경에 대한 개선을 위한 메타버스 플랫폼 개발",
    summary_kr:
      "비대면 온라인 교육 환경 개선을 위한 메타버스 코딩 플랫폼 프로젝트",
    startDate: new Date("2021-10-01"),
    endDate: new Date("2021-11-01"),
    role: [`Frontend 개발 담당`],
    skill: [
      `Next.js, React.js, Typescript를 활용한 Frontend 개발`,
      `Recoil을 활용한 상태 관리`,
      `Sendbird를 활용한 채팅 기능 구현`,
      `Socket.io를 활용한 실시간 코딩 환경 구현`,
    ],
    links: {
      website: "http://zer01neday.com/2021/",
    },
  },
  {
    pid: "applemint",
    type: [ProjectType.Frontend, ProjectType.Backend],
    title: "Applemint",
    organization: "Personal Project",
    description_kr:
      "자주 방문하는 웹사이트 신규 게시물들을 크롤링하여 모아볼 수 있게 해주는 시스템",
    summary_kr: "웹 사이트 크롤링을 활용한 게시물 피드 서비스",
    role: [`전체 서비스 개발`],
    skill: [
      `Go, Gin을 활용한 Backend 개발`,
      `MongoDB를 활용한 데이터베이스 구축`,
      `GCP를 활용한 서비스 배포`,
      `Next.js, React.js를 활용한 Frontend 개발`,
      `MUI를 활용한 UI Component 개발`,
    ],
    links: {
      github: "https://github.com/Applemint-soulkey",
    },
  },
  {
    pid: "craftman-bartender",
    type: [ProjectType.Android],
    title: "Craftman Bartender",
    organization: "Personal Project",
    description_kr: "조주기능사 실기시험 모의테스트 연습용 안드로이드 앱",
    summary_kr: "조주기능사 실기시험 모의테스트 연습용 안드로이드 앱",
    role: [`안드로이드 앱 개발`],
    skill: [
      `MVVM 패턴을 활용한 Android Application 개발`,
      `Koin을 활용한 의존성 주입`,
      `Firebase를 활용한 데이터베이스 구축 및 Serverless Function 개발`,
      `Material Design을 활용한 UI Component 개발`,
      `Couroutine을 활용한 비동기 처리`,
    ],
    links: {
      github: "https://github.com/smtp-ku/CraftsmanBartender",
    },
  },
  {
    pid: "meerkat",
    type: [ProjectType.Frontend, ProjectType.Backend],
    title: "Meerkat",
    organization: "Personal Project",
    description_kr:
      "RSS를 통해 기사를 수집하고 해당 기사와 연관된 키워드를 매칭시킨 후, 매칭된 키워드와 연관된 주식을 보여주며 해당 주식의 영향도를 보여주는 Web Service",
    summary_kr:
      "RSS 피드를 통해 수집한 뉴스 키워드와 연관된 주식과 영향도를 보여주는 서비스",
    role: [`전체 개발 담당`],
    skill: [
      `Firebase를 활용한 데이터베이스 구축 및 Serverless Function 개발`,
      `Next.js, React.js, Typescript를 활용한 Frontend 개발`,
      `Recoil을 활용한 상태 관리`,
      `Semantic UI를 활용한 UI Component 개발`,
    ],
    links: {
      github: "https://github.com/smtp-ku/Meerkat",
    },
  },

  {
    pid: "barbambar",
    type: [ProjectType.Frontend],
    title: "Barbambar",
    organization: "Personal Project",
    description_kr: "영등포 바밤바 홍보용 프로모션 페이지",
    summary_kr: "바밤바 프로모션 페이지",
    role: [`전체 개발 담당`],
    skill: [
      `Next.js, React.js, Typescript를 활용한 Frontend 개발`,
      `Recoil을 활용한 상태 관리`,
      `Material UI를 활용한 UI Component 개발`,
    ],
    links: {
      github: "https://github.com/rlatmfrl24/barbambar",
      website: "https://www.barbambar.kr/",
    },
  },
];

export { ProjectList };
