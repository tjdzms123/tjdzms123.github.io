---
layout: single
title: "JavaScript의 값 전달과 객체 참조 전달 이해하기"
categories: [JS]
date: 2024-10-07
---

JavaScript에서 함수 인자는 **값으로 전달**됩니다. 객체를 넘기면 객체를 가리키는 참조 값이 복사되므로, 함수 안에서 속성을 바꿨을 때 바깥에서도 변경이 보입니다.

이 동작을 흔히 “객체는 참조로 전달한다”라고 설명하지만, 함수가 호출자의 변수 자체를 바꿀 수 있는 참조 전달과는 구분해야 합니다.

## 원시 값 전달

```js
function increase(value) {
  value += 1;
  return value;
}

const count = 3;
const result = increase(count);

console.assert(count === 3);
console.assert(result === 4);
```

매개변수 `value`는 전달된 숫자 값으로 초기화됩니다. 함수 안에서 `value`를 재할당해도 호출자의 `count`는 바뀌지 않습니다.

## 객체 속성을 변경하는 경우

```js
function renameUser(user) {
  user.name = "민수";
}

const person = { name: "성근" };
renameUser(person);

console.assert(person.name === "민수");
```

`person`과 매개변수 `user`가 같은 객체를 가리키기 때문에 변경이 보입니다. 객체 전체를 복제해서 전달한 것이 아닙니다. 배열도 동일하게 동작합니다.

## 매개변수를 재할당하는 경우

```js
function replaceUser(user) {
  user = { name: "지수" };
  return user;
}

const person = { name: "성근" };
const replacement = replaceUser(person);

console.assert(person.name === "성근");
console.assert(replacement.name === "지수");
console.assert(person !== replacement);
```

각 예제는 독립적으로 실행합니다. 매개변수에 새 객체를 할당해도 호출자의 `person`은 그대로입니다. 바뀐 것은 함수 내부의 지역 변수 `user`가 가리키는 대상입니다.

## 실무에서의 의미

함수가 전달받은 객체를 변경하는지, 새 객체를 반환하는지 명확히 해야 합니다. 원본 변경을 피하려면 새 객체를 반환하고, 중첩 객체까지 바꿀 때는 필요한 깊이만큼 복사합니다.

**참조 값의 복사**와 **객체의 복사**를 구분하면 원본이 예상치 않게 변경되는 문제를 이해하기 쉬워집니다.

> 참고
>
> - [MDN — Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
