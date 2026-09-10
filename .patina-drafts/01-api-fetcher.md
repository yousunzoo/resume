# Next.js fetch를 활용한 API fetcher 인터페이스 설계

> 교정 강도: 집중 / 말투: 합니다체 (구어체 최소화)
> 코드·표·`<aside>`·`⚠️` 경고는 원문 그대로 보존, 산문만 다듬음

---

# Next.js fetch

Next.js의 `fetch`는 웹 표준 `fetch()`를 확장한 API입니다. 서버에서 요청마다 캐싱과 재검증 정책을 지정할 수 있다는 점이 가장 큰 차이입니다.

이 옵션에 따라 데이터를 가져오는 방식이 달라지므로, 캐싱 정책부터 정리해보겠습니다.

## cache

캐싱 동작을 직접 제어하려면 `cache` 옵션을 설정합니다.

```javascript
// 캐시 없이 매번 새로운 데이터 가져오기
const res = await fetch('https://api.example.com/data', { cache: 'no-store' });

// 캐시된 데이터 사용, 없으면 서버에서 가져와 캐시에 저장
const res = await fetch('https://api.example.com/data', { cache: 'force-cache' });
```

## next

일정 주기마다 데이터를 갱신하려면 `next` 옵션을 추가합니다. App Router에서 제공하는 확장 옵션입니다.

```javascript
// 60초마다 데이터 재검증
const res = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 },
});
```

- `revalidate: N` → 캐시를 N초 동안 유효한 것으로 간주하고, 이후 첫 요청에서 재검증합니다.
- `revalidate: 0` → 캐싱하지 않고 매 요청마다 새로 가져옵니다.

## Next.js 15 변경점

### 기본 캐싱 동작 변경

| 버전 | 기본 캐싱 동작 |
|---|---|
| Next.js 14 | force-cache (기본적으로 캐싱됨) |
| Next.js 15 | no-store (기본적으로 캐싱되지 않음) |

Next.js 15에서는 `fetch` 요청이 기본적으로 캐싱되지 않도록 바뀌었습니다. 별도로 캐시를 설정하지 않으면 매 요청마다 서버에서 새로운 데이터를 가져옵니다.

### fetch와 Route Handlers의 기본 동작 변화

Next.js 14에서는 GET 메서드를 사용하는 API 라우트(Route Handlers)가 기본적으로 캐싱되었습니다.

Next.js 15에서는 GET 메서드도 기본적으로 캐싱되지 않습니다. 캐싱을 활성화하려면 `dynamic = 'force-static'`을 명시적으로 설정해야 합니다.

```typescript
// Route Handler에서 캐시 활성화
export const dynamic = 'force-static';

export async function GET() {
  const res = await fetch('https://api.example.com/data', { cache: 'force-cache' });
  const data = await res.json();
  return Response.json(data);
}
```

### 클라이언트 사이드 라우터 캐시 동작 변경

Next.js 15에서는 클라이언트 사이드 라우터의 캐싱 동작도 바뀌었습니다. 페이지 간 탐색 시 페이지 세그먼트는 기본적으로 캐시되지 않습니다. 다만 공유 레이아웃이나 브라우저의 뒤로/앞으로 탐색 시에는 캐시가 재사용됩니다.

즉, 새로고침을 하지 않더라도 클라이언트 네비게이션 사이에는 데이터가 캐싱되지 않습니다.

---

# fetcher 함수 인터페이스 설계

### 🧐 fetch를 직접 사용하지 않는 이유

Next.js 15에서도 [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)를 그대로 사용할 수 있습니다. 다만 프로젝트 곳곳에서 직접 호출하면 몇 가지 문제가 생깁니다.

매 호출마다 baseURL과 headers, queryString을 직접 처리해야 하므로 같은 코드가 반복됩니다. 호출 방식도 파일마다 달라지기 쉽고, JSON 파싱이나 401 Unauthorized 같은 공통 에러 핸들링은 누락되기 쉽습니다. Authorization 헤더 추가와 토큰 갱신 과정도 번거롭습니다.

그래서 `fetch`를 직접 호출하는 대신, `BaseFetcher`를 두어 일관된 API 요청 패턴을 설계했습니다.

## ✍️ 인터페이스 설계

설계할 때 잡은 목표는 네 가지입니다.

1. **코드 중복 최소화**
	- API 호출 로직을 하나의 `BaseFetcher` 클래스로 통합해 관리합니다. 공통 요청 흐름은 부모가 정의하고, 환경별 차이만 자식이 오버라이드합니다 (템플릿 메서드 패턴).
	- 모든 HTTP 메서드(GET, POST, PUT, DELETE)를 일관되게 지원합니다. 내부적으로 `request()` 하나를 재사용해 동일한 시그니처로 노출합니다.
2. **요청/응답 인터셉터 지원**
	- API 호출 전후에 공통 로직을 주입할 수 있도록 인터셉터 기능을 둡니다. 예를 들어 Authorization 헤더 자동 추가, 401 Unauthorized 응답 처리가 있습니다.
3. **serverFetcher, clientFetcher 분리**
	- Next.js 서버 환경과 브라우저 환경에서 다르게 동작하도록 나눕니다. 서버는 `force-cache`, 클라이언트는 `no-store`를 기본값으로 둡니다.
4. **authFetcher, nonAuthFetcher 구분**
	- `authFetcher`는 JWT 토큰이 자동으로 추가되는 인증 필요 API 호출을 담당합니다.
	- `nonAuthFetcher`는 인증이 필요 없는 일반 API 호출을 담당합니다.

---

## 💡 BaseFetcher

\<aside\>
☝🏻
기본적인 API 요청을 처리하는 **BaseFetcher**를 먼저 설계합니다.
**Interceptor**를 활용해 요청 전/후에 공통 로직을 적용할 수 있도록 만듭니다.
\</aside\>

### 📌 BaseFetcher의 핵심 기능

| 기능 | 설명 |
|---|---|
| fetcher.get, fetcher.post 등 제공 | fetch API를 래핑하여 일관성 제공 |
| query, body, headers 자동 처리 | 매번 변환할 필요 없음 |
| Content-Type에 따른 응답 자동 변환 | JSON, Text, Blob 모두 지원 |
| 파일 업로드 및 다운로드 지원 | FormData, Blob 처리 가능 |
| request, response interceptor 지원 | API 호출 전후에 공통 로직을 주입 |

### 📌 BaseFetcher의 핵심 구조

**1. 요청 및 응답 인터셉터 관리 (requestInterceptors, responseInterceptors)**

```typescript
private requestInterceptors: Array<(options: FormattedFetcherOptions) => FormattedFetcherOptions> = [];
private responseInterceptors: Array<(response: Response) => Promise<Response>> = [];
```

- `requestInterceptors`: API 요청 전에 실행될 인터셉터 배열 (예: Authorization 헤더 추가)
- `responseInterceptors`: API 응답 후에 실행될 인터셉터 배열 (예: 401 Unauthorized 처리)

요청 전후로 공통 로직을 적용해 API 호출을 확장할 수 있습니다.

**2. 인터셉터 추가 메서드 (addRequestInterceptor, addResponseInterceptor)**

```typescript
addRequestInterceptor(interceptor: (options: FormattedFetcherOptions) => FormattedFetcherOptions) {
  this.requestInterceptors.push(interceptor);
}

addResponseInterceptor(interceptor: (response: Response) => Promise<Response>) {
  this.responseInterceptors.push(interceptor);
}
```

각 Fetcher(serverFetcher, clientFetcher, authFetcher)가 원하는 인터셉터를 등록할 수 있습니다.

**3. 인터셉터 실행 로직 (applyInterceptors)**

```typescript
private async applyInterceptors<T>(
  interceptors: Array<(data: T) => T | Promise<T>>,
  data: T
): Promise<T> {
  let result = data;
  for (const interceptor of interceptors) {
    result = await interceptor(result);
  }
  return result;
}
```

인터셉터를 순차적으로 실행하여 요청 또는 응답 데이터를 변환합니다. `await`으로 각 인터셉터 실행 결과를 `result`에 누적하며, 최종 변환된 데이터를 반환합니다. 각 Fetcher가 등록한 인터셉터를 순서대로 실행해 요청과 응답을 변환합니다.

**4. 쿼리 스트링 변환 (formatQueryParams)**

```typescript
private formatQueryParams(url: URL, query?: Record<string, unknown>) {
  if (!query) return;
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      convertQueryValue(value).forEach((val) => url.searchParams.append(key, val));
    }
  });
}
```

`query` 객체를 URL 파라미터 문자열로 변환합니다. `convertQueryValue(value)`로 배열 같은 다중 값도 정상 처리합니다. 결과적으로 `query`를 `?key=value` 형태로 변환해 fetch 요청에 적용합니다.

**5. 캐싱 정책 관리 (getCachePolicy)**

```typescript
protected getCachePolicy(): RequestCache | undefined {
  return undefined;
}
```

기본값은 `undefined`로, 별도 캐싱 정책이 없습니다. serverFetcher와 clientFetcher에서 오버라이드하여 서버와 클라이언트의 캐싱 동작을 환경별로 다르게 설정합니다.

**6. API 요청 실행 (request)**

```typescript
protected async request<T>(method: FetchMethod, pathname: string, options: FetcherOptions = {}): Promise<T> {
  const { body, headers, query, ...fetchOptions } = options;
  const url = new URL(`${BASE_URL}${pathname}`);

  this.formatQueryParams(url, query);

  const requestBody = getRequestBody(body);
  const requestHeaders = new Headers(headers);
  const cachePolicy = this.getCachePolicy();

  const modifiedOptions = await this.applyInterceptors(this.requestInterceptors, {
    method,
    cache: cachePolicy,
    headers: requestHeaders,
    body: requestBody,
    ...fetchOptions,
  });

  // ✅ Fetch 요청
  const response = await fetch(url.toString(), modifiedOptions);

  const modifiedResponse = await this.applyInterceptors(this.responseInterceptors, response);
  return parseResponse<T>(modifiedResponse);
}
```

요청 인터셉터(requestInterceptors)를 실행한 뒤 `fetch()`를 호출하고, 응답 인터셉터(responseInterceptors)를 실행한 뒤 최종 데이터를 반환합니다. 모든 HTTP 요청을 처리하는 기본 메서드로, get·post 등에서 재사용합니다.

**7. HTTP 메서드별 API 요청 (get, post, put, delete)**

```typescript
get<T>(pathname: string, options?: FetcherOptions): Promise<T> {
  return this.request<T>('GET', pathname, options);
}

post<T>(pathname: string, options?: FetcherOptions): Promise<T> {
  return this.request<T>('POST', pathname, options);
}

put<T>(pathname: string, options?: FetcherOptions): Promise<T> {
  return this.request<T>('PUT', pathname, options);
}

delete<T>(pathname: string, options?: FetcherOptions): Promise<T> {
  return this.request<T>('DELETE', pathname, options);
}
```

`request<T>()`를 기반으로 GET, POST, PUT, DELETE 메서드를 제공해 각 HTTP 메서드에 대해 일관된 요청을 보장합니다.

### 🔎 전체 코드 구조

```typescript
export class BaseFetcher {
  private requestInterceptors: Array<(options: FormattedFetcherOptions) => FormattedFetcherOptions> = [];
  private responseInterceptors: Array<(response: Response) => Promise<Response>> = [];

  addRequestInterceptor(interceptor: (options: FormattedFetcherOptions) => FormattedFetcherOptions) {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor: (response: Response) => Promise<Response>) {
    this.responseInterceptors.push(interceptor);
  }

  private async applyInterceptors<T>(
    interceptors: Array<(data: Awaited<T>) => Awaited<T> | Promise<Awaited<T>>>,
    data: T
  ): Promise<Awaited<T>> {
    let result = Promise.resolve(data as Awaited<T>); // ✅ 초기값을 `Awaited<T>`로 변환하여 일관성 유지

    for (const interceptor of interceptors) {
      result = result.then(interceptor); // ✅ 각 인터셉터 실행 후 체이닝
    }

    return result;
  }

  private formatQueryParams(url: URL, query?: Record<string, unknown>) {
    if (!query) return;
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        convertQueryValue(value).forEach((val) => url.searchParams.append(key, val));
      }
    });
  }

  protected getCachePolicy(): RequestCache | undefined {
    return undefined;
  }

  protected async request<T>(method: FetchMethod, pathname: string, options: FetcherOptions = {}): Promise<T> {
    const { body, headers, query, ...fetchOptions } = options;
    const url = new URL(`${BASE_URL}${pathname}`);

    this.formatQueryParams(url, query);
    const requestHeaders = new Headers(headers);
    const requestBody = getRequestBody(body);

    let modifiedOptions = await this.applyInterceptors(this.requestInterceptors, {
      ...fetchOptions,
      headers: requestHeaders,
      body: requestBody,
    });

    const finalOptions = { method, cache: this.getCachePolicy(), ...modifiedOptions };
    const response = await fetch(url.toString(), finalOptions);

    const modifiedResponse = await this.applyInterceptors(this.responseInterceptors, response);
    return parseResponse<T>(modifiedResponse);
  }

  get<T>(pathname: string, options?: FetcherOptions): Promise<T> {
    return this.request<T>('GET', pathname, options);
  }
}
```

---

## 💡 Server, Client API Fetcher

- `serverFetcher`: Next.js 서버에서 실행되는 API 요청 (예: 백엔드 서버 호출)
- `clientFetcher`: 클라이언트에서 실행되는 API 요청 (브라우저에서 API 호출)

### 📌 serverFetcher

```typescript
class ServerFetcher extends BaseFetcher {
  protected override getCachePolicy(): RequestCache {
    return 'force-cache'; // ✅ 서버에서는 기본적으로 캐싱 활성화
  }
}

export const serverFetcher = new ServerFetcher();
```

### 📌 clientFetcher

```typescript
class ClientFetcher extends BaseFetcher {
  protected override getCachePolicy(): RequestCache {
    return 'no-store'; // ✅ 클라이언트에서는 최신 데이터 유지
  }
}

export const clientFetcher = new ClientFetcher();
```

---

## 💡 Auth Fetcher

\<aside\>
☝🏻
인증이 필요한 요청에 대해 **Authorization** 헤더를 자동으로 추가하고, 401 응답을 처리합니다.
\</aside\>

### 🔎 코드 구조

```typescript
import { getAuthTokenFromCookie, isServer } from '@shared/utils';

import { clientFetcher } from './client';
import { serverFetcher } from './server';
import { FetcherOptions } from './types';

class AuthFetcher {
  private fetcher = isServer() ? serverFetcher : clientFetcher;

  constructor() {
    // ✅ 요청 인터셉터: JWT 토큰 자동 추가
    this.fetcher.addRequestInterceptor((options) => {
      const token = getAuthTokenFromCookie();

      const headers = new Headers(options.headers);

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return {
        ...options,
        headers,
      };
    });

    // ✅ 응답 인터셉터: 401 Unauthorized 발생 시 로그아웃 처리
    this.fetcher.addResponseInterceptor(async (response) => {
      if (response.status === 401) {
        console.warn('세션이 만료되었습니다. 로그아웃 처리');
        // TODO: 자동 로그아웃 또는 리프레시 토큰 처리
      }
      return response;
    });
  }

  get<T>(pathname: string, options?: FetcherOptions) {
    return this.fetcher.get<T>(pathname, options || {});
  }

  post<T>(pathname: string, options?: FetcherOptions) {
    return this.fetcher.post<T>(pathname, options || {});
  }

  put<T>(pathname: string, options?: FetcherOptions) {
    return this.fetcher.put<T>(pathname, options || {});
  }

  delete<T>(pathname: string, options?: FetcherOptions) {
    return this.fetcher.delete<T>(pathname, options || {});
  }
}

export const authFetcher = new AuthFetcher();
```

> ⚠️ `serverFetcher`, `clientFetcher`는 모듈 싱글턴입니다. `AuthFetcher` 생성자에서 인터셉터를 등록하면 **그 싱글턴 자체가 변형**되므로, 같은 인스턴스를 공유하는 `nonAuthFetcher`에도 Authorization 헤더가 함께 붙습니다. 인증/비인증을 온전히 분리하려면 각 용도별로 별도 인스턴스를 만들거나, 토큰이 없을 때 헤더를 추가하지 않는 현재 방식처럼 인터셉터 내부에서 조건을 두어야 합니다.

---

## ✍️ 마무리

Next.js는 서버와 클라이언트 환경이 나뉘기 때문에, fetch를 한 겹 감싸두면 인증 처리와 캐싱 정책을 한 곳에서 관리할 수 있습니다. 캐싱 정책을 바꾸거나 인증 헤더를 손볼 때도 각 Fetcher만 수정하면 됩니다.

다만 인터셉터를 싱글턴에 등록하는 부분은 앞서 짚었듯 주의가 필요합니다. 완성된 구조라기보다 계속 다듬어갈 출발점으로 봐주시면 좋겠습니다.
