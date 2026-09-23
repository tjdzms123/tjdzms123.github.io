---
layout: single
title: "Redux의 상태 관리 원리와 데이터 흐름"
categories: [JS]
date: 2024-10-15
---

**Redux는 애플리케이션의 공유 상태와 변경 과정을 관리하는 JavaScript 라이브러리**입니다. 상태를 어디에서 읽고 어떤 요청으로 바꾸는지 일정한 규칙을 제공합니다.

## 주요 구성 요소

| 요소 | 역할 |
| --- | --- |
| Store | 상태를 보관하고 변경을 구독할 수 있게 함 |
| Action | 어떤 일이 일어났는지 설명하는 객체 |
| Dispatch | 액션을 전달하는 함수 |
| Reducer | 이전 상태와 액션으로 다음 상태를 계산하는 함수 |
| Selector | 상태에서 필요한 데이터를 읽거나 계산하는 함수 |

UI에서 액션을 디스패치하면 리듀서가 다음 상태를 계산하고, 구독자는 변경된 값을 읽어 화면에 반영합니다. 이 흐름이 **UI → dispatch(action) → reducer → store → UI**로 이어집니다.

리듀서는 네트워크 요청이나 타이머 실행 같은 부수 효과 없이 상태를 계산해야 합니다. 외부에서 상태 객체를 직접 변경하면 이 흐름을 추적할 수 없습니다.

## Redux Toolkit 예제

다음은 Redux Toolkit을 사용하는 프로젝트에서 실행할 수 있는 예제입니다.

```js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment(state) {
      state.value += 1;
    },
  },
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});

const { increment } = counterSlice.actions;
const selectCount = state => state.counter.value;
const previousState = store.getState();

store.dispatch(increment());

console.assert(selectCount(store.getState()) === 1);
console.assert(selectCount(previousState) === 0);
```

`createSlice`는 액션 생성 함수와 리듀서를 함께 만듭니다. `state.value += 1`은 직접 수정처럼 보이지만, 이 콜백 안에서는 Immer가 제공하는 초안을 수정하여 불변성을 유지하는 다음 상태를 만듭니다. 일반적인 Redux 리듀서나 외부 상태 객체에 그대로 적용해도 된다는 뜻은 아닙니다.

## React에서 읽고 변경하기

React Redux의 `Provider`로 스토어를 전달한 다음, 컴포넌트에서는 `useSelector`로 필요한 상태를 읽고 `useDispatch`로 액션을 전달합니다. `useSelector`는 선택 결과의 변경을 구독하므로 필요한 값을 좁게 선택하는 것이 좋습니다.

비동기 요청은 리듀서 바깥에서 처리합니다. Thunk 같은 미들웨어로 요청을 수행하고 성공·실패 액션을 전달하거나, RTK Query로 서버 데이터의 요청과 캐시를 관리할 수 있습니다.

## 도입 기준

여러 화면에서 공유하는 상태가 많고 변경 규칙을 추적해야 할 때 유용합니다. 한 컴포넌트만 사용하는 입력값이나 모달 열림 상태까지 모두 전역 스토어에 넣을 필요는 없습니다. 먼저 상태가 필요한 범위를 정하고 도구를 선택합니다.

> 참고
>
> - [Redux — Overview and Concepts](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)
> - [Redux Toolkit — createSlice](https://redux-toolkit.js.org/api/createSlice)
> - [React Redux — Hooks](https://react-redux.js.org/api/hooks)
