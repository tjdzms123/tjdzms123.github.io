---
layout: single
title: "이벤트 버블링과 캡처링, 이벤트 위임"
categories: [JS]
date: 2024-10-13
---

DOM 요소는 계층 구조를 이루므로, 버튼에서 발생한 이벤트를 상위 요소에서도 처리할 수 있습니다. **캡처링과 버블링은 이벤트가 이 계층을 따라 전달되는 방향**을 구분합니다.

## 이벤트 전파 단계

1. **캡처링**: 이벤트 경로의 상위 요소에서 대상 방향으로 내려갑니다.
2. **타깃**: 이벤트가 발생한 대상에 도달합니다.
3. **버블링**: 대상에서 상위 요소 방향으로 올라갑니다.

`addEventListener`는 기본적으로 캡처링 리스너를 등록하지 않습니다. `{ capture: true }` 옵션을 주면 캡처링 단계에서 처리합니다. `focus`처럼 버블링하지 않는 이벤트도 있으므로 모든 이벤트가 동일하게 올라오는 것은 아닙니다.

## 실행 순서 확인

다음 내용을 하나의 HTML 문서에서 실행하고 버튼을 누르면 순서를 확인할 수 있습니다.

```html
<div id="panel">
  <button id="save" type="button">저장</button>
</div>

<script>
  const panel = document.getElementById("panel");
  const save = document.getElementById("save");
  const steps = [];

  panel.addEventListener("click", () => {
    steps.length = 0;
    steps.push("부모 캡처링");
  }, { capture: true });

  save.addEventListener("click", () => steps.push("버튼 타깃"));

  panel.addEventListener("click", () => {
    steps.push("부모 버블링");
    console.log(steps);
    console.assert(
      steps.join(",") === "부모 캡처링,버튼 타깃,부모 버블링"
    );
  });
</script>
```

## target과 currentTarget

- `event.target`: 이벤트의 원래 대상입니다.
- `event.currentTarget`: 현재 실행 중인 리스너가 등록된 요소입니다.

부모 리스너에서 버튼 클릭을 처리하면 `target`은 버튼이고 `currentTarget`은 부모입니다. 버튼 안의 아이콘을 클릭하면 `target`은 아이콘일 수 있다는 점도 고려해야 합니다.

## 이벤트 위임

목록의 각 버튼에 리스너를 붙이는 대신 공통 부모에 리스너 하나를 등록하고 클릭한 항목을 판별하는 방식입니다. 나중에 추가되는 자식 요소도 부모를 통해 처리할 수 있습니다.

대상을 찾을 때는 `closest` 등으로 원하는 버튼을 찾고, 해당 버튼이 처리할 부모 영역 안에 있는지도 확인합니다. 중첩된 목록을 사용할 때 특히 필요합니다.

## 전파와 기본 동작은 별개

`stopPropagation()`은 이벤트 전파를 멈추고, `preventDefault()`는 링크 이동이나 폼 제출 같은 기본 동작을 막습니다. 하나가 다른 하나까지 대신하지는 않습니다. 전파 차단을 남용하면 부모의 이벤트 위임이나 분석 로직이 동작하지 않을 수 있습니다.

> 참고
>
> - [MDN — Event bubbling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling)
