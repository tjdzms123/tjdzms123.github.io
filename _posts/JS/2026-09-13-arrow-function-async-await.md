---
layout: single
title: "화살표 함수와 async/await"
categories: [JS]
date: 2026-09-13
---

ES6 이후 JavaScript에는 함수를 더 간결하게 작성하기 위한 문법이 추가되었습니다. ES6에서 도입된 **화살표 함수**와 ES8(ES2017)에서 도입된 **async/await**을 정리해 보겠습니다.

## 화살표 함수 (Arrow Function)

ES6에서 도입된, 함수를 정의하는 문법입니다. `function` 키워드 대신 `=>`를 사용해 더 짧게 작성할 수 있습니다.

### 매개변수 지정

```js
    () => { ... } // 매개변수가 없을 경우 소괄호를 생략할 수 없다.
     x => { ... } // 매개변수가 한 개인 경우 소괄호를 생략할 수 있다.
(x, y) => { ... } // 매개변수가 여러 개인 경우 소괄호를 생략할 수 없다.
```

### 함수 몸체 지정

몸체가 한 줄의 구문이라면 중괄호를 생략할 수 있으며, 이때 그 결과가 암묵적으로 반환됩니다.

```js
x => { return x * x } // single line block
x => x * x            // 중괄호를 생략하면 암묵적으로 return된다. 위 표현과 동일하다.
```

중괄호를 생략한 상태에서 객체를 반환할 때는 소괄호로 감싸야 합니다. 그렇지 않으면 중괄호가 함수 몸체를 여는 블록으로 해석됩니다.

```js
() => { return { a: 1 }; }
() => ({ a: 1 })          // 위 표현과 동일하다.
```

여러 줄로 작성할 때는 중괄호와 `return`을 사용합니다.

```js
() => {           // multi line block
  const x = 10;
  return x * x;
};
```

### 호출 방법

화살표 함수는 익명 함수로만 사용할 수 있으므로, 이름을 붙여 호출하려면 **함수 표현식**으로 변수에 할당합니다.

```js
const pow = x => x * x;
console.log(pow(10)); // 100
```

콜백 함수로도 자주 사용합니다.

```js
const arr = [1, 2, 3];
const pow = arr.map(x => x * x);

console.log(pow); // [ 1, 4, 9 ]
```

### this를 바인딩하지 않는다

화살표 함수의 가장 큰 특징입니다. 일반 함수의 `this`는 **함수를 어떻게 호출했는지**에 따라 동적으로 결정되지만, 화살표 함수는 자신의 `this`를 갖지 않고 **선언된 위치의 상위 스코프 `this`를 그대로 사용**합니다. 이를 렉시컬 `this`라고 합니다.

```js
const counter = {
  count: 0,
  start() {
    setInterval(function () {
      this.count += 1; // this가 counter가 아니므로 의도대로 동작하지 않는다.
    }, 1000);
  },
};

const arrowCounter = {
  count: 0,
  start() {
    setInterval(() => {
      this.count += 1; // 상위 스코프인 start()의 this(= arrowCounter)를 그대로 사용한다.
    }, 1000);
  },
};
```

덕분에 콜백 안에서 `this`를 쓰기 위해 `const self = this;`처럼 따로 변수에 담거나 `bind`로 바인딩할 필요가 없습니다.

다만 `this`를 갖지 않기 때문에 **객체의 메서드나 생성자 함수로는 적합하지 않습니다.** 메서드로 정의하면 `this`가 해당 객체가 아닌 상위 스코프를 가리키고, `new` 연산자와 함께 호출할 수 없습니다.

```js
const user = {
  name: "Kim",
  sayName: () => {
    console.log(this.name); // undefined (user가 아닌 상위 스코프의 this)
  },
};
```

`this`의 동작 방식은 [this의 동작 원리와 용법](/js/this-binding/) 글에서 더 자세히 다루고 있습니다.

---

## async/await

ES8(ES2017)에서 도입된, 비동기 코드를 작성하고 관리하기 위한 문법입니다. `Promise` 기반의 비동기 처리를 **동기 코드처럼 위에서 아래로 읽히는 형태**로 작성할 수 있어 가독성과 유지 보수성이 좋아집니다.

### async

함수 앞에 `async`를 붙이면 해당 함수는 **항상 `Promise`를 반환**합니다. 반환값이 `Promise`가 아니면 이행된 `Promise`로 감싸서 반환합니다.

```js
async function getName() {
  return "Kim";
}

getName().then((name) => console.log(name)); // "Kim"
```

### await

`await`은 `Promise`가 처리될 때까지 기다렸다가 그 결과 값을 반환합니다. **항상 `async` 함수 안에서만 사용할 수 있습니다.**

```js
async function 함수명() {
  await 비동기_처리_메서드_명();
}
```

`.then()` 체이닝으로 작성한 코드와 비교하면 차이가 뚜렷합니다.

```js
// then 체이닝
function getUser() {
  return fetch("/api/user")
    .then((response) => response.json())
    .then((user) => user.name);
}

// async/await
async function getUser() {
  const response = await fetch("/api/user");
  const user = await response.json();
  return user.name;
}
```

### 에러 처리

`Promise`가 거부되면 `await` 지점에서 에러가 발생하므로, `try...catch`로 처리할 수 있습니다. 동기 코드와 같은 방식으로 에러를 다룰 수 있다는 것도 장점입니다.

```js
async function getUser() {
  try {
    const response = await fetch("/api/user");
    const user = await response.json();
    return user.name;
  } catch (error) {
    console.log("요청 처리 중 오류가 발생했습니다.", error);
  }
}
```

`Promise`의 상태와 `.then()`, `.catch()`는 [Promise란?](/js/promise/) 글에서 정리했습니다.

---

## 한 줄 요약

**화살표 함수**는 함수를 간결하게 정의하는 ES6 문법으로, 자신의 `this`를 갖지 않고 상위 스코프의 `this`를 사용합니다. **async/await**은 `Promise`를 동기 코드처럼 작성하게 해주는 ES8 문법으로, `async` 함수는 항상 `Promise`를 반환하고 `await`은 그 처리를 기다립니다.

> 참고
>
> - [Arrow function - MDN Web Docs](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
> - [async function - MDN Web Docs](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function)
