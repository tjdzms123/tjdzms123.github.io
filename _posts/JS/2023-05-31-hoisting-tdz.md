---
layout: single
title: "Hoisting과 TDZ란?"
categories: [JS]
date: 2023-05-31
---

## Hoisting(호이스팅)

인터프리터가 변수와 함수의 메모리 공간을 **선언 전에 미리 할당**하는 것을 의미합니다. 코드상으로는 선언이 아래에 있어도, 실행 시점에는 해당 스코프의 최상단으로 끌어올려진 것처럼 동작합니다.

## TDZ(Temporal Dead Zone)

**일시적 사각지대**라는 의미로, **스코프 시작 ~ 초기화 시작 사이의 구간**을 가리킵니다. 다시 말해 변수가 선언되고 나서 초기화가 이루어지기 전까지의 구간입니다.

`let`, `const`로 선언한 변수도 호이스팅되지만, TDZ에 머무는 동안에는 접근할 수 없어 참조 시 `ReferenceError`가 발생합니다.

![TDZ 구간 설명](/assets/images/JS/TDZ.png)

```js
console.log(a); // ReferenceError: Cannot access 'a' before initialization (TDZ 구간)
let a = 10;
console.log(a); // 10
```

---

## 한 줄 요약

**호이스팅**은 선언이 스코프 최상단으로 끌어올려지는 동작이고, **TDZ**는 `let`/`const` 변수가 선언된 뒤 초기화 전까지 접근할 수 없는 구간입니다.

> 참고
>
> - [호이스팅 - MDN Web Docs 용어 사전](https://developer.mozilla.org/ko/docs/Glossary/Hoisting)
> - [TDZ(Temporal Dead Zone)](https://funveloper.tistory.com/25)
