---
layout: single
title: "JavaScript의 ==와 === 연산자 차이"
categories: [JS]
date: 2024-09-23
---

JavaScript의 `==`와 `===`는 두 값을 비교하지만, **비교 과정에서 타입을 변환하는지**가 다릅니다. 숫자처럼 보이는 문자열을 다룰 때 특히 주의해야 합니다.

## 동등 연산자 ==

`==`는 피연산자의 타입이 다르면 정해진 규칙에 따라 변환한 뒤 비교합니다. 따라서 타입이 달라도 결과가 `true`일 수 있습니다.

```js
console.log(7 == "7");          // true: 문자열을 숫자로 변환해 비교
console.log(0 == false);        // true: false를 숫자 0으로 변환
console.log(null == undefined); // true: 동등 비교의 특별 규칙
```

모든 값을 문자열로 바꾸는 방식은 아닙니다. 피연산자의 조합에 따라 변환 규칙이 달라서, 규칙을 모르면 의도하지 않은 비교 결과가 나올 수 있습니다.

## 일치 연산자 ===

`===`는 타입을 변환하지 않습니다. 타입이 다르면 바로 `false`이며, 타입이 같으면 해당 타입의 비교 규칙을 따릅니다.

```js
console.log(7 === "7");          // false: 타입이 다름
console.log(7 === 7);            // true
console.log(null === undefined); // false
```

| 비교 | `==` | `===` |
| --- | --- | --- |
| `1`과 `"1"` | `true` | `false` |
| `0`과 `false` | `true` | `false` |
| `null`과 `undefined` | `true` | `false` |
| 같은 객체를 가리키는 두 변수 | `true` | `true` |

## 객체와 NaN은 별도로 이해하기

두 연산자 모두 객체의 내부 속성을 하나씩 비교하지 않습니다. **동일한 객체를 참조하는지**를 비교합니다.

```js
const first = { score: 7 };
const second = { score: 7 };
const same = first;

console.assert(first !== second, "별개 객체는 내용이 같아도 다릅니다.");
console.assert(first === same, "동일한 객체를 참조합니다.");
console.assert(Number.isNaN(NaN), "NaN 여부는 Number.isNaN으로 확인합니다.");
```

`NaN === NaN`은 `false`이고, `+0 === -0`은 `true`입니다. `Object.is`는 이 두 경우를 다르게 취급하므로 모든 상황에서 `===`와 같지는 않습니다.

## 어떤 연산자를 사용할까?

일반적인 비교에는 `===`를 사용하고, 외부 입력을 숫자로 비교해야 한다면 필요한 변환과 유효성 검사를 먼저 수행하면 의도가 분명해집니다. `==`를 사용할 때는 타입 변환 자체가 의도된 것인지 확인합니다.

> 참고
>
> - [MDN — Strict equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)
