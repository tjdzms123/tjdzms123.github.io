---
layout: single
title: "고차 함수란? 함수를 인자로 받거나 반환하기"
categories: [JS]
date: 2024-10-08
---

**고차 함수(Higher-order function)**는 함수를 인자로 받거나 함수를 반환하는 함수입니다. JavaScript에서는 함수를 변수에 저장하고 값처럼 전달할 수 있기 때문에 이러한 구성이 가능합니다.

## 함수를 인자로 받기

배열의 `map`, `filter`, `reduce`는 함수를 인자로 받는 대표적인 고차 함수입니다.

```js
const scores = [45, 70, 90];
const passed = scores.filter(score => score >= 60);
const labels = passed.map(score => `${score}점`);

console.assert(JSON.stringify(labels) === '["70점","90점"]');
console.assert(scores.length === 3);
```

`filter`는 조건에 맞는 요소를 고르고, `map`은 각 요소를 변환합니다. 순회하는 공통 흐름은 배열 메서드에 맡기고, 달라지는 조건과 변환 규칙을 함수로 전달한 것입니다.

`map`이 새 배열을 반환하더라도 콜백에서 원본 객체를 변경하면 부수 효과가 생길 수 있습니다. 고차 함수라는 특징이 순수 함수를 보장하지는 않습니다.

## 함수를 반환하기

```js
function multiplyBy(factor) {
  return value => value * factor;
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.assert(double(5) === 10);
console.assert(triple(5) === 15);
```

`multiplyBy`는 곱셈 결과가 아니라 **곱셈을 수행할 함수**를 반환합니다. 반환된 함수가 바깥 함수의 `factor`를 계속 사용할 수 있는 것은 클로저 덕분입니다.

## 콜백과 고차 함수의 관계

위 예제에서 `filter`는 고차 함수이고, `score => score >= 60`은 전달된 콜백 함수입니다. 같은 동작에서 바라보는 역할이 다릅니다.

콜백은 비동기 작업에만 사용하지 않습니다. `map`과 `filter`의 콜백처럼 동기적으로 실행되는 경우도 많습니다.

## 언제 사용하면 좋을까?

전체 흐름은 같고 조건이나 처리 방식만 달라질 때 유용합니다. 정렬 기준, 이벤트 처리, 데이터 변환 규칙 등을 함수로 전달하면 공통 로직을 재사용할 수 있습니다. 단순한 계산을 위해 불필요하게 여러 겹의 함수를 만드는 것은 오히려 읽기 어려워질 수 있습니다.

> 참고
>
> - [MDN — First-class function](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function)
> - [MDN — Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures)
