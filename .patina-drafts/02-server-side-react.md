# 서버 사이드 리액트

> 교정 강도: 집중 / 말투: 합니다체 (구어체 최소화)
> 코드·표·링크는 원문 그대로 보존, `✅` 마커·기계적 소제목 정리

---

React 18 이후 서버 렌더링은 크게 두 축으로 나뉩니다.

- 전통적인 **Server-Side Rendering (SSR)** — HTML을 서버에서 렌더링해 클라이언트로 스트리밍합니다.
- 최신 **React Server Components (RSC)** — 클라이언트에서 필요 없는 UI 로직은 아예 서버에서만 실행합니다.

React는 이 두 영역을 커버하기 위해 여러 렌더링 함수와 서버 기능을 제공합니다. 이번 글에서는 SSR 함수 4가지와 RSC 관련 API 2가지를 공식 문서를 기준으로 정리합니다.

---

## Streaming

React 18에서 도입된 SSR 방식 중 하나인 **Streaming**은, 전체 HTML을 한 번에 렌더링해 보내는 대신 렌더링 가능한 HTML 조각(청크)을 순차적으로 클라이언트에 보내는 방식입니다.

### 기존 SSR과의 차이점

전통적인 SSR(예: `renderToString`)은 전체 React 앱을 메모리에서 렌더링한 뒤 HTML 문자열로 변환해 클라이언트에 한 번에 전달합니다. 그래서 사용자 입장에서는 첫 바이트(TTFB)가 늦습니다.

Streaming SSR(예: `renderToPipeableStream`, `renderToReadableStream`)은 렌더링 가능한 UI부터 먼저 HTML로 변환해 즉시 전송합니다. Suspense를 활용하면 로딩 상태를 먼저 보여주고, 나중에 데이터가 도착하면 완성된 UI를 이어서 보냅니다. 점진적 로딩이 가능해 체감 속도가 훨씬 빠릅니다.

전통 SSR이 모든 요리를 다 만든 뒤 한꺼번에 서빙하는 방식이라면, Streaming SSR은 만들어지는 대로 코스요리처럼 순차적으로 서빙하는 방식에 가깝습니다.

이 방식이 중요한 이유는 초기 렌더 속도(TTFB, TTV)를 개선하기 때문입니다. React 18의 Concurrent Rendering 및 Suspense와도 궁합이 좋아, 대규모 앱에서 UX와 LCP를 함께 끌어올릴 수 있습니다.

---

## 1. `renderToPipeableStream()`

- **용도**: Node.js 환경에서 스트리밍 방식 SSR을 구현할 때 사용합니다.
- **출력 형태**: Node의 [`WritableStream`](https://developer.mozilla.org/ko/docs/Web/API/WritableStream)으로 HTML 조각을 지속적으로 보냅니다.
- **대표 사용처**: Express, Fastify, Koa 등 Node.js 기반 웹 서버

```typescript
import { renderToPipeableStream } from 'react-dom/server';

const stream = renderToPipeableStream(<App />, {
  onShellReady() {
    res.setHeader('Content-Type', 'text/html');
    stream.pipe(res);
  },
  onError(err) {
    console.error('Rendering error:', err);
  },
});
```

### 주요 특징

- React 18+ Concurrent Rendering을 활용합니다.
- 스트리밍 기반으로 초기 화면을 빠르게 전달합니다.
- `onShellReady`, `onAllReady`, `abort()` 등 다양한 훅을 제공합니다.
- Suspense와 조합하면 부분 UI를 점진적으로 렌더링할 수 있습니다.

---

## 2. `renderToReadableStream()`

- **용도**: Node.js 이외 환경(특히 Edge)에서 스트리밍 SSR
- **출력 형태**: WHATWG [`ReadableStream`](https://developer.mozilla.org/ko/docs/Web/API/ReadableStream) (Fetch API와 호환)
- **대표 사용처**: Cloudflare Workers, Vercel Edge Functions

```typescript
const stream = await renderToReadableStream(<App />);

return new Response(stream, {
  headers: {
    'Content-Type': 'text/html',
  },
});
```

### 주요 특징

- `await` 가능한 Promise 기반 API입니다.
- Edge Runtime과 잘 통합됩니다 (예: Next.js Edge Middleware).
- Suspense 기반의 점진적 렌더링을 지원합니다.

---

## 3. `renderToStaticMarkup()`

- **용도**: 정적 HTML 출력용 (클라이언트 상호작용이 필요 없는 마크업)
- **출력 형태**: HTML 문자열

```typescript
const html = renderToStaticMarkup(<App />);
```

### 주요 특징

- React의 Virtual DOM diff나 hydration 정보를 포함하지 않습니다.
- `<script>`, `data-reactroot` 등을 제거합니다.
- 이메일 템플릿, 정적 사이트 생성에 적합합니다.
- SEO 목적의 간단한 콘텐츠에 유리합니다.

---

## 4. `renderToString()`

- **용도**: 레거시 SSR (스트리밍 없이 전체 HTML 문자열 생성)
- **출력 형태**: HTML 문자열

```typescript
const html = renderToString(<App />);
```

### 주의사항

- React 18 이후에도 사용할 수 있지만 스트리밍은 불가능합니다.
- hydration 정보를 포함합니다 (client-side React 연결 가능).
- 최신 SSR 방식에서는 권장하지 않습니다. `renderToPipeableStream()` 사용을 권합니다.

---

## 5. React Server Components

- **개념**: 서버에서만 렌더링되는 컴포넌트. JS 번들에 포함되지 않습니다.
- **파일 규칙**: `.server.js/.jsx` 확장자 혹은 `use client` 없는 서버 코드

```typescript
// Profile.server.jsx
export default async function Profile({ userId }) {
  const user = await fetch(`https://api/users/${userId}`).then(res => res.json());
  return <div>{user.name}</div>;
}
```

### 주요 특징

- Zero-bundle-cost: 클라이언트 JS 크기가 늘지 않습니다.
- 서버에서 데이터 fetch 및 처리를 수행해 클라이언트로 전달합니다.
- 클라이언트 컴포넌트와 조합할 수 있습니다 (서버가 루트여야 함).
- 상태 관리가 필요 없는 부분은 서버 컴포넌트로 분리합니다.

### 동작 방식

1. 서버에서 `.server.jsx` 컴포넌트를 렌더링합니다.
2. HTML + JSON 형태로 클라이언트에 전달합니다.
3. 클라이언트 컴포넌트는 hydration됩니다.

---

## 6. Server Functions

- **개념**: 서버 컴포넌트에서만 호출 가능한 서버 전용 함수
- **형식**: `'use server'` + async function

```typescript
'use server';

export async function updateUser(formData) {
  await db.user.update({
    where: { id: formData.get('id') },
    data: { name: formData.get('name') }
  });
}
```

### 주요 특징

- 클라이언트에서 직접 호출할 수 없어 보안상 안전합니다.
- 서버 컴포넌트 혹은 `<form action={serverFunction}>`으로 사용합니다.
- Next.js App Router에서 자주 사용됩니다.

---

## 요약

| API | 환경 | 출력 | 특징 |
|---|---|---|---|
| `renderToPipeableStream()` | Node.js | WritableStream | SSR + 스트리밍, 가장 최신 |
| `renderToReadableStream()` | Edge | ReadableStream | Edge 환경 최적화, fetch 호환 |
| `renderToStaticMarkup()` | 모든 환경 | HTML 문자열 | 정적 콘텐츠 렌더링, JS 제거 |
| `renderToString()` | Node.js | HTML 문자열 | 레거시 SSR, 스트리밍 없음 |
| Server Components | RSC 지원 서버 | HTML + JSON | 클라이언트 JS 전송 안 함 |
| Server Functions | RSC 지원 서버 | - | 서버 전용 함수, form/action 호환 |

---

## 참고 링크

- React SSR: [https://react.dev/reference/react-dom/server](https://react.dev/reference/react-dom/server)
- React Server Components: [https://react.dev/reference/rsc/server-components](https://react.dev/reference/rsc/server-components)
- Server Functions: [https://react.dev/reference/rsc/server-functions](https://react.dev/reference/rsc/server-functions)
