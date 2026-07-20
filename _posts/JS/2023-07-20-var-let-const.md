---
layout: single
title: "var, let, const의 차이"
categories: [JS]
date: 2023-07-20
---

JavaScript에서는 `var`, `let`, `const` 키워드로 변수를 선언할 수 있습니다. 세 키워드는 재선언과 재할당 가능 여부, 스코프, 호이스팅 방식에서 차이가 있습니다.

## var

`var`는 ES5까지 주로 사용하던 변수 선언 키워드입니다.

- 같은 스코프에서 **재선언할 수 있습니다.**
- 값을 **재할당할 수 있습니다.**
- **함수 레벨 스코프**를 가집니다.
- 호이스팅되며 선언과 동시에 `undefined`로 초기화됩니다.

함수 안에서 선언한 변수는 함수 전체에서 유효합니다. 함수가 아닌 `if`, `for` 등의 블록 안에서 선언하더라도 블록 밖에서 접근할 수 있습니다.

```js
if (true) {
  var message = "hello";
}

console.log(message); // "hello"
```

선언 전에 접근하면 에러가 발생하지 않고 `undefined`가 반환됩니다.

```js
console.log(count); // undefined
var count = 1;
```

이는 다음 코드처럼 선언만 스코프의 최상단으로 끌어올려진 것으로 이해할 수 있습니다.

```js
var count;
console.log(count); // undefined
count = 1;
```

---

## let

`let`은 ES6(ES2015)에서 도입된 변수 선언 키워드입니다.

- 같은 스코프에서 **재선언할 수 없습니다.**
- 값을 **재할당할 수 있습니다.**
- **블록 레벨 스코프**를 가집니다.
- 호이스팅되지만 선언문에 도달하기 전까지 TDZ에 있어 접근할 수 없습니다.

```js
let score = 10;
score = 20; // 재할당 가능

let score = 30; // SyntaxError: 같은 스코프에서 재선언할 수 없음
```

`let`으로 선언한 변수는 중괄호로 감싼 블록 안에서만 유효합니다.

```js
if (true) {
  let greeting = "hello";
  console.log(greeting); // "hello"
}

console.log(greeting); // ReferenceError
```

---

## const

`const`도 ES6(ES2015)에서 도입되었으며 `let`과 마찬가지로 블록 레벨 스코프를 가집니다.

- 같은 스코프에서 **재선언할 수 없습니다.**
- 값을 **재할당할 수 없습니다.**
- 선언할 때 **반드시 값을 함께 할당해야 합니다.**
- 호이스팅되지만 선언문에 도달하기 전까지 TDZ에 있어 접근할 수 없습니다.

```js
const language = "JavaScript";
language = "TypeScript"; // TypeError: 재할당할 수 없음

const framework; // SyntaxError: 선언과 동시에 초기화해야 함
```

### 객체와 배열의 내부 값은 변경 가능

`const`는 변수에 저장된 값이나 참조의 **재할당**을 막습니다. 객체의 속성이나 배열의 요소까지 변경할 수 없게 만드는 것은 아닙니다.

```js
const user = { name: "Kim" };
user.name = "Lee"; // 가능

const numbers = [1, 2];
numbers.push(3); // 가능

user = { name: "Park" }; // TypeError: 재할당할 수 없음
```

---

## 함수 레벨 스코프와 블록 레벨 스코프

**함수 레벨 스코프**는 함수의 중괄호만 독립된 스코프로 인정합니다. 따라서 `var`로 선언한 변수는 함수 전체에서 접근할 수 있습니다.

**블록 레벨 스코프**는 함수뿐만 아니라 `if`, `for`, `while` 등의 중괄호도 각각 독립된 스코프로 인정합니다. `let`과 `const`로 선언한 변수는 자신이 선언된 블록 안에서만 접근할 수 있습니다.

---

## 선언, 초기화, 할당

- **선언**: 변수의 존재와 이름을 JavaScript 엔진에 알리는 단계
- **초기화**: 값을 저장할 메모리 공간을 확보하고 최초 값을 설정하는 단계
- **할당**: 할당 연산자(`=`)를 사용해 변수에 값을 저장하는 단계

`var`는 선언 단계에서 `undefined`로 초기화되므로 선언문 이전에도 접근할 수 있습니다. 반면 `let`과 `const`는 선언이 호이스팅되어도 초기화되지 않은 TDZ 상태이므로 선언문 이전에는 접근할 수 없습니다.

```js
let study; // 선언 후 undefined로 초기화
console.log(study); // undefined

study = "hard"; // 할당
console.log(study); // "hard"

const subject = "JavaScript"; // 선언과 동시에 초기화
```

> `const study`처럼 초기값 없이 `const` 변수를 선언하는 것은 문법 오류입니다.

---

## 차이 정리

| 구분 | `var` | `let` | `const` |
| --- | --- | --- | --- |
| 도입 시기 | ES5 이전부터 사용 | ES6(ES2015) | ES6(ES2015) |
| 스코프 | 함수 레벨 | 블록 레벨 | 블록 레벨 |
| 같은 스코프에서 재선언 | 가능 | 불가능 | 불가능 |
| 재할당 | 가능 | 가능 | 불가능 |
| 선언 시 초기값 | 선택 | 선택 | 필수 |
| 선언 전 접근 | `undefined` | `ReferenceError` | `ReferenceError` |

---

## 한 줄 요약

`var`는 함수 레벨 스코프와 느슨한 재선언 규칙을 가지며, `let`과 `const`는 블록 레벨 스코프를 가집니다. 재할당이 필요하면 `let`, 필요하지 않으면 `const`를 사용하고 `var`는 특별한 이유가 없다면 피하는 것이 좋습니다.

> 참고
>
> - [JavaScript ES6 블록 레벨 스코프에 대해 알아보자 (feat. let, const)](https://eblee-repo.tistory.com/37)
