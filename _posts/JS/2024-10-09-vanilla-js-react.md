---
layout: single
title: "Vanilla JavaScript와 비교해 React를 사용하는 이유"
categories: [JS]
date: 2024-10-09
---

Vanilla JavaScript는 별도의 프레임워크나 라이브러리 없이 JavaScript와 웹 표준 API로 개발하는 것을 뜻합니다. React는 이 JavaScript 위에서 **상태에 따른 UI를 컴포넌트로 표현하는 라이브러리**입니다.

## 화면 변경을 직접 관리하는 방식

DOM API를 사용하면 요소를 찾고 이벤트를 연결하고 화면을 변경하는 과정을 직접 작성합니다. 작은 페이지에서는 코드와 실행 비용이 적고 구성이 단순합니다.

하지만 같은 데이터가 여러 영역에 표시되거나 화면 상태가 많아지면, 데이터가 바뀔 때 갱신할 요소를 모두 빠짐없이 관리해야 합니다.

## React의 선언적 UI

React에서는 특정 상태일 때 어떤 화면을 보여줄지 작성합니다.

```jsx
import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button
      aria-pressed={liked}
      onClick={() => setLiked(value => !value)}
    >
      {liked ? "좋아요 취소" : "좋아요"}
    </button>
  );
}
```

버튼을 누르면 상태에 따라 문구와 `aria-pressed`가 함께 바뀝니다. 두 속성을 각각 DOM에 반영하는 코드를 작성하는 대신, 상태와 화면의 관계를 한곳에 표현합니다. 다시 클릭하면 두 값이 원래 상태로 돌아오는지 확인할 수 있습니다.

## 컴포넌트와 단방향 데이터 흐름

컴포넌트는 화면을 역할별로 나누고 재사용하는 단위입니다. 부모가 자식에게 props를 내려주고, 자식은 전달받은 이벤트 함수를 호출해 변경을 요청하는 방식으로 데이터 흐름을 추적할 수 있습니다.

공통 버튼, 입력 폼, 목록 같은 UI가 반복되는 애플리케이션에서 일관성을 유지하기 좋습니다. 다만 컴포넌트를 지나치게 잘게 나누거나 상태를 여러 곳에 중복 저장하면 복잡성은 여전히 커집니다.

## 비용도 함께 고려하기

| 상황 | 고려할 선택 |
| --- | --- |
| 정적 문서에 간단한 상호작용만 필요 | HTML·CSS·Vanilla JavaScript |
| 상태 변화가 많고 UI가 반복됨 | React 같은 컴포넌트 도구 |
| 초기 로딩 성능이 중요 | 번들 크기와 렌더링 방식을 함께 평가 |

Virtual DOM을 사용한다고 모든 작업이 더 빨라지는 것은 아닙니다. React의 주된 이점은 복잡한 UI의 상태와 구성을 관리하기 쉬운 개발 모델이며, 성능은 실제 화면에서 측정해야 합니다.

> 참고
>
> - [React — Thinking in React](https://react.dev/learn/thinking-in-react)
