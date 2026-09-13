---
layout: single
title: "Hoisting과 TDZ란?"
categories: [JS]
date: 2023-05-31
---

## Hoisting(호이스팅)

인터프리터가 변수와 함수의 메모리 공간을 **선언 전에 미리 할당**하는 것을 의미합니다. 코드상으로는 선언이 아래에 있어도, 실행 시점에는 해당 스코프의 최상단으로 끌어올려진 것처럼 동작합니다.

### 호이스팅이 발생하는 이유

JavaScript 엔진이 코드를 실행하기 전에 **실행 컨텍스트(Execution Context)**를 먼저 생성하기 때문입니다. 실행 컨텍스트는 코드가 원활하게 실행될 수 있는 환경을 만들어 주며, **생성 단계**와 **실행 단계**로 나뉩니다.

- **생성 단계**: 자신의 스코프 내에 선언된 변수와 함수를 미리 스코프에 등록합니다.
- **실행 단계**: 코드를 한 줄씩 실행하면서 값을 할당합니다.

즉, 실제로 코드가 위로 끌어올려지는 것이 아니라, 생성 단계에서 선언이 먼저 등록되기 때문에 끌어올려진 것처럼 보이는 것입니다.

### 선언 전에 접근할 수 있는 경우

`var`, `let`, `const`, 함수 선언문은 모두 호이스팅되지만, 선언 전에 접근할 수 있는 것은 **`var`와 함수 선언문**뿐입니다. 생성 단계에서 등록과 함께 초기화까지 이루어지기 때문입니다.

```js
console.log(count); // undefined (선언과 동시에 undefined로 초기화)
var count = 1;

sayHello(); // "hello" (함수 전체가 등록되어 호출 가능)
function sayHello() {
  console.log("hello");
}
```

반면 `let`, `const`로 선언한 변수는 등록만 되고 초기화되지 않아 선언문에 도달하기 전까지 접근할 수 없습니다. 이 구간이 TDZ입니다.

---

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

**호이스팅**은 실행 컨텍스트의 생성 단계에서 선언이 미리 등록되어 스코프 최상단으로 끌어올려진 것처럼 보이는 동작이고, **TDZ**는 `let`/`const` 변수가 선언된 뒤 초기화 전까지 접근할 수 없는 구간입니다.

> 참고
>
> - [호이스팅 - MDN Web Docs 용어 사전](https://developer.mozilla.org/ko/docs/Glossary/Hoisting)
> - [TDZ(Temporal Dead Zone)](https://funveloper.tistory.com/25)
> - [호이스팅(Hoisting)이란? - 하나몬](https://hanamon.kr/javascript-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85%EC%9D%B4%EB%9E%80-hoisting/)
