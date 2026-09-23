---
layout: single
title: "React 상태의 불변성이 중요한 이유"
categories: [JS]
date: 2024-10-10
---

React의 객체나 배열 상태를 바꿀 때는 **기존 값을 직접 수정하지 않고 변경된 새 값을 전달**합니다. 여기서 불변성은 JavaScript가 객체의 수정을 금지한다는 뜻이 아니라, 이전 상태를 보존하는 작성 규칙입니다.

## 같은 객체를 수정하면 생기는 문제

`user.name`을 직접 바꾸고 `setUser(user)`를 호출하면 새 값과 이전 값이 같은 참조입니다. React는 `useState`의 이전 상태와 다음 상태를 `Object.is`로 비교하므로 업데이트가 생략될 수 있습니다.

또한 과거 렌더링에서 사용한 객체까지 바뀌어 버려, 이전 상태를 스냅샷처럼 다루기 어렵습니다. 변경 내역 추적과 되돌리기, 메모이제이션에도 문제가 됩니다.

## 변경할 경로를 새로 만들기

```js
const previous = {
  name: "성근",
  preferences: { theme: "light" },
};

const next = {
  ...previous,
  preferences: { ...previous.preferences, theme: "dark" },
};

console.assert(previous.preferences.theme === "light");
console.assert(next.preferences.theme === "dark");
console.assert(previous !== next);
console.assert(previous.preferences !== next.preferences);
```

React 상태에서는 같은 패턴을 함수형 업데이트로 사용할 수 있습니다.

```js
setUser(previous => ({
  ...previous,
  preferences: { ...previous.preferences, theme: "dark" },
}));
```

두 번째 예제는 `useState`에서 얻은 `setUser`가 있고, 위와 같은 구조의 상태를 사용한다는 전제입니다. 이전 상태에 의존하는 변경을 함수로 전달하면 대기 중인 업데이트도 순서대로 반영할 수 있습니다.

## 배열 상태도 같은 원칙

| 목적 | 기존 배열을 변경하지 않는 표현 |
| --- | --- |
| 추가 | `[...items, newItem]` |
| 삭제 | `items.filter(item => item.id !== targetId)` |
| 일부 수정 | `items.map(item => item.id === targetId ? { ...item, done: true } : item)` |

`push`, `splice`, `sort` 등은 원본 배열을 변경하므로 상태 배열에 바로 적용하지 않습니다. `map`으로 새 배열을 만들어도 내부 객체를 직접 수정하면 원본과 공유한 객체가 바뀝니다.

## 모든 객체를 깊게 복사할 필요는 없다

변경하지 않은 데이터는 기존 참조를 재사용하고, 바뀐 값까지 이어지는 경로만 복사하면 됩니다. 이를 통해 이전 상태를 보존하면서 불필요한 복사도 줄일 수 있습니다.

> 참고
>
> - [React — Updating Objects in State](https://react.dev/learn/updating-objects-in-state)
> - [React — useState](https://react.dev/reference/react/useState)
