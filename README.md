## ForFour Frontend

빠르게 개발을 시작할 수 있도록 프로젝트 구조, 설치 방법을 정리했습니다
처음 개발을 시작하는 입장에서 어려운 점이 많으실텐데 궁금하신 점이나 어려운 점 있으면
카톡으로 편하게 연락 주셔도 돼요!

### 빠른 시작

```bash
# 1) 의존성 설치
yarn install

# 2)
yarn add @yarnpkg/sdks -D

# 3)
yarn dlx @yarnpkg/sdks vscode

```

[초기 에러 참고 블로그](https://velog.io/@byeongjun25/Yarn-PnP-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-TypeScript-Cannot-find-module-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0)

### 폴더 구조

다음 구조를 기준으로 화면-기능-도메인을 분리합니다. 실제 현재 레포의 모습도 함께 반영했습니다.

```bash
src/

├── app/                    # 애플리케이션 엔트리 및 전역 설정
│   ├── layout/             # 공용 레이아웃 (예: MainLayout)
│   ├── providers/          # Global Providers (RouterProvider 등)
│   ├── styles/             # 전역 스타일
│   └── config/             # 글로벌 설정 (Router 등)
│
├── pages/                  # 라우팅 기준 화면 단위 (SPA 페이지)
│   ├── login/
│   │   ├── components/
│   │   ├── model/
│   │   └── ui/
│   ├── main/
│   │   ├── components/
│   │   └── ui/
│   ├── mypage/
│   │   └── ui/
│   ├── walks/
│   │   └── ui/
│   ├── craetewalk/
│   └── detailwalk/
│
├── widgets/                # 여러 Feature를 조합한 UI Block (Header, Sidebar 등)
│   └── (예시) Header/
│       ├── ui/
│       ├── model/
│       └── index.ts
│
├── features/               # 독립 기능 단위 (로그인, 검색 등)
│   └── (예시) Auth/
│       ├── ui/
│       ├── model/
│       └── index.ts
│
├── entities/               # 비즈니스 Domain 단위 (User, Product 등)
│   └── (예시) User/
│       ├── ui/
│       ├── model/
│       └── index.ts
│
├── shared/                 # 모든 영역에서 공용으로 사용하는 요소
│   ├── ui/                 # Button, Input 등 재사용 컴포넌트
│   ├── api/                # 공용 API 클라이언트 (axios instance 등)
│   ├── lib/                # 유틸리티, hooks
│   ├── config/             # 공용 설정
│   ├── assets/             # 이미지, 아이콘 파일
│   └── types/              # 전역 타입 정의
│
├── main.tsx                # Vite 엔트리 (애플리케이션 마운트)
└── app.d.ts                # 전역 타입 선언 (필요 시)
```

> 페이지 단위(`pages/*/ui`)는 라우터 기준의 화면 컨테이너를, `widgets`는 여러 기능 조합 블록을, `features`는 독립 기능(로그인 등), `entities`는 도메인 단위를 의미합니다. 공용 요소는 `shared`에 위치합니다.
