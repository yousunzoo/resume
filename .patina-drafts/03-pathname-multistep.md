# pathname 기반 Multi-Step flow 설계

> 교정 강도: 중간 / 말투: 합니다체 (구어체 최소화)
> 코드 보존, 볼드 남발·이모지 헤더 정리, 사람다운 마무리("피드백 환영 반박 환영")는 유지

---

복잡한 사용자 입력 과정을 단계적으로 처리할 때는 흔히 multi-step form, 또는 funnel UI를 고려합니다. 특히 대출 비교 서비스는 입력 항목이 많고 사용자 조건에 따라 플로우가 분기되는 경우가 많아 아래와 같은 고민이 따릅니다.

- 여러 입력 단계를 하나의 페이지에서 처리할 것인가?
- 혹은 각 스텝을 별도의 페이지(pathname)로 분리할 것인가?

이번 글에서는 각 스텝을 pathname 단위로 분리하는 방식을 택한 이유와, 그에 맞는 상태 관리·라우팅 설계를 어떻게 구성했는지 정리합니다.

---

## 문제 정의

예를 들어 아래와 같은 대출 신청 플로우를 생각해보겠습니다.

1. 본인 인증 (`/cert`)
2. 직업 선택 (`/flow/job`)
3. 직업 유형에 따라 분기되는 상세 입력
	- `/flow/workspace?type=worker`
	- `/flow/workspace?type=employment`
	- ...
4. 이후 연소득, 보험, 주택, 차량, 요약 등 고정 플로우

이때 만족해야 하는 요구사항은 다음과 같습니다.

- **조건 분기**: 사용자의 선택에 따라 스텝이 달라집니다.
- **유효성 검사**: 이전 단계가 제대로 입력되지 않으면 다음 단계로 진입할 수 없어야 합니다.
- **리디렉션 처리**: 새로고침이나 잘못된 진입을 막아야 합니다.
- **페이지 전환 기반 라우팅**: URL로 현재 위치를 명확히 파악할 수 있어야 합니다. (GA로 전환율·이탈률 확인 가능)

---

## pathname 기반 스텝 분할을 택한 이유

**1. 사용자 이탈 지점 분석이 용이합니다.**
각 스텝이 고유한 URL을 가지므로, GA 등에서 이탈률·진입률을 분석하기가 훨씬 쉽습니다.

**2. 페이지 히스토리·뒤로가기에 자연스럽게 대응합니다.**
브라우저 history stack에 각 스텝이 명확히 쌓이므로, 사용자는 기대한 대로 뒤로가기·앞으로가기를 경험할 수 있습니다.

**3. SEO·퍼포먼스는 신경 쓰지 않아도 됩니다.**
이 funnel은 대개 로그인 후 실행되는 private page이므로, CSR 중심으로 구성해도 무방합니다.

**4. 분기 제어가 명시적입니다.**
입력값에 따라 다음 스텝이 달라지는 경우, 코드 레벨에서 조건 분기를 명시적으로 선언할 수 있어 가독성과 추론 가능성이 높아집니다.

### query string 활용하기

하나의 도메인 흐름 안에서 질문이 연속적으로 이어지지만 본질적으로 같은 주제를 다룬다면, 별도의 pathname으로 분리하기보다 query param을 활용하는 편이 낫습니다.

예를 들어 `/flow/address`라는 주소 입력 단계에 다음과 같은 세부 흐름이 이어진다고 해보겠습니다.

- `/flow/address?type=dong` → 동 선택
- `/flow/address?type=ho` → 호수 입력

이처럼 상위 맥락은 같고 입력 대상만 세분화되는 경우에는 경로를 나누기보다 query parameter로 화면을 전환하는 방식이 구조적으로 더 간결하고 유지보수에 유리합니다.

---

## 핵심 구성 요소

### 1. Zustand 기반 전역 상태

```typescript
export const store = create(...) // ...
```

각 스텝의 입력값은 Zustand 전역 상태에 저장되며, `isValid`·`isVisible` 등의 조건문과 API 요청에서 활용됩니다.

### 2. 선언형 플로우 정의

```typescript
type Step = {
	key: string;
	path: string;
	checkIsVisible?: (state: Store) => boolean;
	checkIsValid?: (state: Store) => boolean;
};


export const FLOW_STEPS: Step[] = [
  { key: 'step1', path: '/step1' },
  { key: 'step2', path: '/step2' },
  {
    key: 'step3',
    path: 'step3',
    checkIsVisible: (state) => state.step2 === A,
    checkIsValid: (state) => typeof state.step3 === "number",
  },
  ...
];
```

- `isVisible`: 현재 상태에서 이 스텝이 표시되어야 하는지 여부
- `isValid`: 다음 스텝에 진입하기 위한 이전 스텝의 유효성 판단

모든 스텝은 이 배열 하나에서 제어됩니다.

### 3. useStepNavigation 훅

`useStepNavigation`은 현재 사용자가 위치한 스텝을 기준으로 이전/다음 스텝을 자동 계산하고, 진입 유효성 검사를 수행하며, 페이지 전환 함수(`moveToNextStep`, `moveToPrevStep`)를 제공합니다.

덕분에 각 페이지는 복잡한 분기 로직 없이, 이 훅만으로 자신의 위치를 인식하고 다음으로 이동할 수 있습니다.

```typescript
export function useStepNavigation(key: StepKey) {
  const store = store((state) => state);
  const visibleSteps = useMemo(() => ..., [store]);
  const currentIndex = useMemo(() => ..., [visibleSteps]);

  const currentStep = visibleSteps[currentIndex];
  const prevStep = visibleSteps[currentIndex - 1];

  const isPrevValid = prevStep?.checkIsValid ? prevStep.checkIsValid(store) : true;

  useEffect(() => {
    if (!isPrevValid) {
      router.replace(prevStep?.path ?? '/cert');
    }
  }, [isPrevValid]);

  return {
    moveToNextStep: () => router.push(nextStep.path),
    moveToPrevStep: () => router.push(prevStep.path),
    ...
  };
}
```

각 스텝 페이지에서는 이렇게 사용합니다.

```typescript
const {
  moveToNextStep,
  moveToPrevStep,
  isFirst,
  isLast,
} = useStepNavigation('직업 선택');
```

해당 스텝에서 훅 하나만 호출하면 현재 위치의 맥락을 모두 가져오고, 이전 상태의 유효성도 확인하고, 다음으로 이동할 함수까지 제공받습니다.

이 훅을 기준으로 전체 플로우의 흐름과 유효성 제어를 통일하면, 각 페이지는 입력값 처리에만 집중할 수 있어 코드가 깔끔하게 유지됩니다.

### 4. query 기반 분기 처리 (예: `/flow/workspace`)

단일 페이지에서 여러 하위 스텝을 처리할 수 있도록 `query.type`을 기준으로 분기합니다.

```typescript
const componentMap = {
  worker: WorkerNameForm,
  employment: EmploymentTypeForm,
  ...
};

const Component = componentMap[type];
return Component ? <Component /> : <ErrorFallback />;
```

### 5. 유효성 리디렉션 처리

```typescript
const { isPrevValid, prevStep } = useStepNavigation(stepName);
useEffect(() => {
  if (!isPrevValid) {
    router.replace(prevStep?.path ?? '/cert');
  }
}, [isPrevValid]);
```

새로고침으로 상태가 초기화된 경우나 해당 경로에 직접 진입한 경우, `isPrevValid` 검사로 잘못된 진입을 막을 수 있습니다.

---

대출 신청 플로우의 특성과 요구사항에 맞춰, pathname을 기준으로 스텝을 나누고 상태 기반으로 흐름을 제어하는 구조를 실험적으로 정리해봤습니다.

지금 우리 프로젝트에서 이 구조가 적절한지, 혹은 더 간결하게 개선할 여지가 있는지 이 글을 바탕으로 같이 논의해보면 좋겠습니다 🙂

피드백 환영 반박 환영
