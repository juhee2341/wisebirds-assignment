# wisebirds assignment

## 실행 방법

1. node 20v 버전 이상
2. pnpm 설치

- `npm i -g pnpm`

3. pnpm i
4. pnpm run dev

## MSW

MSW를 사용하여 개발 환경에서의 API 모킹을 구현했습니다.

```
src/
  mocks/
    handlers.ts    # API 요청 핸들러 정의
    browser.ts     # 브라우저 환경 설정
    repository.ts  # 응답 데이터 정의
    service.ts     # 서비스 정의
    mockResponseManager.ts  # 응답 상태코드 정의
```

## 에러

메뉴에서 에러 페이지 접근은 어드민 권한일 때만 보이도록 설정하였습니다.
