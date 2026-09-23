---
layout: single
title: "React Context API로 컴포넌트 사이의 값 공유하기"
categories: [JS]
date: 2024-09-28
---

Context API는 **중간 컴포넌트마다 props를 전달하지 않고 하위 컴포넌트에 값을 제공하는 기능**입니다. 테마나 로그인 사용자처럼 여러 단계 아래에서 필요한 정보를 전달할 때 활용합니다.

## Provider와 useContext

`createContext`로 Context를 만들고, Provider로 값을 제공하고, `useContext`로 읽습니다. 상태를 저장하고 변경하는 일은 `useState`나 `useReducer`가 담당합니다.

```jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext("light");

export default function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={theme}>
      <button
        onClick={() => setTheme(value => value === "light" ? "dark" : "light")}
      >
        테마 변경
      </button>
      <Content />
    </ThemeContext.Provider>
  );
}

function Content() {
  return <ThemeLabel />;
}

function ThemeLabel() {
  const theme = useContext(ThemeContext);
  return <p>현재 테마: {theme}</p>;
}
```

버튼을 누르면 `light`와 `dark`가 번갈아 표시됩니다. `Content`가 테마를 props로 전달하지 않아도 `ThemeLabel`에서 값을 읽을 수 있습니다. 예제는 React 18에서도 사용할 수 있는 `.Provider` 문법을 사용합니다.

## 값을 찾는 기준

`useContext`는 자신보다 위에 있는 **가장 가까운 동일 Context의 Provider**를 읽습니다. Provider가 없으면 `createContext`에 지정한 기본값을 사용합니다. 그 기본값은 상태처럼 자동으로 변하지 않습니다.

Provider의 `value`가 이전 값과 `Object.is` 비교에서 달라지면, 해당 Context를 읽는 컴포넌트들이 다시 렌더링됩니다. `memo`로 감쌌더라도 Context 변경을 차단하지는 않습니다.

## 사용 범위 정하기

가까운 부모와 자식 사이에서는 props만으로 충분한 경우가 많습니다. Context를 사용한다면 함께 변경되는 값을 기준으로 나누면 불필요한 구독을 줄일 수 있습니다.

매 렌더링마다 새 객체를 `value`로 전달하면 내용이 같아도 참조가 바뀝니다. 실제 렌더링 비용이 문제가 되는지 확인한 뒤 Context 분리나 값의 메모이제이션을 검토합니다.

> 참고
>
> - [React — useContext](https://react.dev/reference/react/useContext)
