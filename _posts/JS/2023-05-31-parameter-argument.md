---
layout: single
title: "parameter와 argument의 차이"
categories: [JS]
date: 2023-05-31
---

## parameter(매개변수)

함수의 **정의 부분에 나열된 변수**입니다. 함수에게 전달되는 값을 받아들이기 위해 사용되며, 함수 내부에서는 해당 변수의 이름으로 사용됩니다. 매개변수의 값은 함수가 호출될 때 외부에서 전달되는 argument에 의해 결정됩니다.

## argument(인자)

함수를 **호출할 때 전달되는 값**입니다. 호출 시 argument의 값이 parameter로 복사되어 함수 내부에서 사용됩니다. 함수를 호출할 때는 argument를 필요한 parameter의 수와 순서에 맞게 전달해야 합니다.

## 예시

```js
function homework(name) {  // "name"은 parameter(매개변수)입니다.
  console.log("Hello, " + name);
}

homework("성근");  // "성근"은 argument(인자)입니다.
```

---

## 한 줄 요약

**parameter**는 함수 정의에 선언된 변수, **argument**는 함수 호출 시 그 자리에 전달하는 실제 값입니다.
