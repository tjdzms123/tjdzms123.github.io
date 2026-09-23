---
layout: single
title: "얕은 복사와 깊은 복사의 차이 및 구현 방법"
categories: [JS]
date: 2024-10-06
---

객체를 다른 변수에 할당하는 것과 객체를 복사하는 것은 다릅니다. **얕은 복사는 바깥 객체를 새로 만들지만 중첩 객체는 공유**하고, 깊은 복사는 지원하는 데이터의 중첩 구조까지 새로 만듭니다.

## 할당과 얕은 복사

```js
const original = { name: "성근", address: { city: "서울" } };
const assigned = original;
const shallow = { ...original };

console.assert(assigned === original);
console.assert(shallow !== original);
console.assert(shallow.address === original.address);

shallow.name = "민수";
console.assert(original.name === "성근");

shallow.address.city = "부산";
console.assert(original.address.city === "부산");
```

단순 할당은 같은 객체를 가리킵니다. 전개 구문으로 복사하면 `name`처럼 원시 값인 속성은 독립적으로 바꿀 수 있지만, `address`가 가리키는 객체는 공유합니다.

`Object.assign({}, object)`, 배열의 전개 구문, `slice()` 역시 대표적인 얕은 복사 방법입니다.

## structuredClone으로 깊은 복사

```js
const original = { items: [{ name: "노트", count: 1 }] };
const copied = structuredClone(original);

copied.items[0].count = 2;

console.assert(copied.items !== original.items);
console.assert(original.items[0].count === 1);
console.assert(copied.items[0].count === 2);
```

위 두 코드 블록은 각각 독립적으로 실행합니다. `structuredClone`은 순환 참조와 `Date`, `Map`, `Set` 등 여러 데이터 형식을 지원합니다. 다만 함수나 DOM 노드 등 복제할 수 없는 값은 오류를 일으키며, 사용자 정의 클래스의 동작과 프로토타입까지 그대로 보존하는 범용 복제기는 아닙니다.

## JSON으로 복사할 때의 한계

`JSON.parse(JSON.stringify(value))`는 JSON으로 표현 가능한 데이터에만 적합합니다. `undefined`나 함수가 사라질 수 있고, `Date`는 문자열이 되며, 순환 참조나 `BigInt`는 일반적인 사용에서 오류를 일으킵니다.

복사하려는 데이터의 타입을 확인하지 않고 깊은 복사의 대체 수단으로 사용하면 값이 손실될 수 있습니다.

## 필요한 범위만 복사하기

중첩된 상태의 일부만 바꾼다면 모든 데이터를 깊게 복사할 필요는 없습니다. 변경할 경로에 있는 객체만 새로 만드는 방식이 유용합니다.

```js
const user = { name: "성근", address: { city: "서울" } };
const nextUser = { ...user, address: { ...user.address, city: "부산" } };

console.assert(user.address.city === "서울");
console.assert(nextUser.address.city === "부산");
```

> 참고
>
> - [MDN — structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone)
> - [React — Updating Objects in State](https://react.dev/learn/updating-objects-in-state)
