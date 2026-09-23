---
layout: single
title: "Virtual DOM과 실제 DOM의 차이"
categories: [JS]
date: 2024-09-24
---

**DOM(Document Object Model)**은 웹 문서를 객체와 트리 구조로 표현하는 인터페이스입니다. JavaScript는 DOM API로 요소의 내용과 속성을 읽거나 변경할 수 있습니다.

## 실제 DOM

브라우저가 HTML을 해석하면 실제 DOM을 구성합니다. 예를 들어 버튼의 글자를 바꾸려면 다음처럼 조작할 수 있습니다.

```js
const button = document.querySelector("button");
if (button) {
  button.textContent = "저장 완료";
}
```

DOM 변경은 브라우저의 스타일 계산, 레이아웃, 페인트로 이어질 수 있습니다. 모든 변경이 전체 페이지의 레이아웃을 다시 계산하게 만드는 것은 아니며, 영향은 변경한 속성과 요소에 따라 다릅니다.

## Virtual DOM

Virtual DOM은 UI의 구조를 메모리 안의 JavaScript 객체로 표현하는 접근 방식입니다. 실제 DOM의 모든 기능을 복제한 별도의 브라우저 DOM은 아닙니다.

React에서는 상태가 바뀌면 컴포넌트를 실행해 다음 UI를 계산하고, 이전 결과와 비교하여 실제 DOM에 필요한 변경을 반영합니다. 이 조정 과정을 **재조정(reconciliation)**이라고 합니다.

## 렌더링과 커밋

```jsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(value => value + 1)}>
      클릭 횟수: {count}
    </button>
  );
}
```

버튼을 누르면 다음 흐름으로 화면이 갱신됩니다.

1. 상태 업데이트가 렌더링을 요청합니다.
2. React가 컴포넌트를 실행해 새로운 UI를 계산합니다.
3. 커밋 단계에서 실제 DOM에 필요한 변경을 적용합니다.
4. 브라우저가 변경된 화면을 그립니다.

컴포넌트가 다시 실행되어도 결과가 같으면 실제 DOM 변경은 없을 수 있습니다. 위 예제는 클릭할 때 숫자가 증가하고 버튼 요소는 유지되는 것을 확인할 수 있습니다.

## 가상 DOM이면 항상 빠를까?

가상 DOM을 생성하고 비교하는 데도 비용이 듭니다. 단순한 요소 하나만 바꾸는 작업은 직접 DOM을 조작하는 편이 더 적은 작업으로 끝날 수도 있습니다. React의 장점은 UI를 상태로 선언하고 변경 반영을 맡겨, 복잡한 화면을 일관되게 관리할 수 있다는 데 있습니다.

> 참고
>
> - [React — Render and Commit](https://react.dev/learn/render-and-commit)
