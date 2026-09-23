---
layout: single
title: "React 컴포넌트의 생명주기와 Effect 정리"
categories: [JS]
date: 2024-09-25
---

React 컴포넌트의 생명주기는 **마운트, 업데이트, 언마운트**로 나눌 수 있습니다. 화면에 나타난 뒤 변경되고 사라지는 과정을 의미합니다.

## 세 가지 단계

| 단계 | 의미 | 예시 |
| --- | --- | --- |
| 마운트 | 컴포넌트가 화면에 처음 추가됨 | 상세 화면 열기 |
| 업데이트 | 변경된 입력이나 상태로 UI를 다시 계산함 | 검색어 입력 |
| 언마운트 | 컴포넌트가 화면에서 제거됨 | 조건부로 표시하던 모달 닫기 |

자신의 상태 변경, 부모의 렌더링, 구독한 Context 변경 등이 업데이트의 계기가 됩니다. 렌더링은 UI를 계산하는 과정이므로 반드시 실제 DOM 변경을 동반하지는 않습니다.

## useEffect는 외부 시스템과 동기화한다

함수 컴포넌트에서는 `useEffect`로 타이머, 이벤트 구독, 네트워크 연결 같은 외부 시스템과 동기화할 수 있습니다. Effect를 클래스 생명주기 메서드와 일대일로 대응시키기보다는 **시작과 정리가 한 쌍인 동기화 작업**으로 이해하면 좋습니다.

```jsx
import { useEffect, useState } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds(value => value + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return <p>경과 시간: {seconds}초</p>;
}
```

화면에 추가되면 타이머가 시작되고, 제거되면 반환한 정리 함수가 타이머를 해제합니다. 컴포넌트를 숨겼다가 다시 표시하면 0초부터 시작하며, 이전 타이머가 남아 두 배로 증가하지 않아야 합니다.

## 의존성 배열과 정리 시점

- 의존성 배열 생략: 커밋된 렌더링 후마다 Effect를 실행합니다.
- 빈 배열 `[]`: 마운트 시 실행하고, 언마운트 시 정리합니다.
- `[value]`: 마운트 시 실행하고, `value`가 바뀌면 이전 작업을 정리한 뒤 다시 실행합니다.

Effect에서 읽는 반응형 값은 의존성에 포함해야 합니다. 정리 함수는 언마운트 때뿐 아니라 의존성 변경으로 Effect를 다시 실행하기 전에도 호출됩니다.

개발 환경의 Strict Mode에서는 정리 로직을 확인하기 위해 추가로 설정 → 정리 → 설정 과정을 실행할 수 있습니다. 따라서 `[]`를 “어떤 환경에서도 정확히 한 번 실행”으로 이해하면 안 됩니다.

> 참고
>
> - [React — useEffect](https://react.dev/reference/react/useEffect)
