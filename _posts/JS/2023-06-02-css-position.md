---
layout: single
title: "CSS position 속성 사용법"
categories: [JS]
date: 2023-06-02
---

면접에서 **"position을 어떻게 사용하는지 알려주세요."**라는 질문이 자주 나옵니다. 각 값의 특징과 차이를 정리해 보겠습니다.

## position이란?

CSS 속성 중 하나로, **웹 문서 안 요소들을 어떻게 배치할지**를 정하는 속성입니다. position 속성을 이용하면 텍스트나 이미지 같은 요소들을 원하는 곳에 위치시킬 수 있습니다.

---

## position의 종류

### static

position 속성의 **기본값**입니다. 다른 요소와의 관계에 의해 자동으로 배치되며, `top`, `left`, `right`, `bottom` 등의 offset 값을 지정할 수 없습니다.

### relative

static과 마찬가지로 요소가 문서의 일반적인 흐름에 따라 배치됩니다. static과의 차이점은 요소가 **자신의 static 위치를 기준으로** `top`, `right`, `bottom`, `left` 속성에 의한 **상대적인(relative) 위치**로 배치된다는 점입니다.

### absolute

요소가 문서의 일반적인 흐름을 따르지 않습니다. 대신 가장 가까운 위치에 있는 **조상 요소(static이 아닌)**에 **상대적 위치**로 배치됩니다. 조상 요소가 없으면 문서 본문(body)을 기준으로 삼고 페이지 스크롤에 따라 움직입니다.

### fixed

absolute와 마찬가지로 요소가 문서의 일반적인 흐름에서 제거됩니다. 대신 스크린의 **뷰포트(viewport)를 기준**으로 한 위치에 배치됩니다. 즉, 스크롤되어도 움직이지 않는 **고정된 자리**를 갖게 됩니다.

> **뷰포트(viewport)** : 웹페이지가 사용자에게 보여지는 영역

### sticky

요소가 문서의 일반적인 흐름에 따라 배치되며, `top`, `right`, `bottom`, `left` 속성 값을 기준으로 flow root 및 해당 요소를 포함하는 containing block에 대한 **상대적(relative) 위치**에 배치됩니다. 그래서 sticky로 지정했는데 `top`, `right`, `bottom`, `left` 속성이 주어지지 않으면 static으로 배치되는 위치와 같아집니다. sticky는 relative와 마찬가지로 **다른 요소들에 영향을 주지 않는** 특징을 가집니다.

---

## fixed vs sticky

- **fixed**는 문서의 흐름을 따르지 않고 **뷰포트를 기준**으로 배치됩니다.
- **sticky**는 문서의 흐름을 따르면서 **containing box를 기준**으로 상대적인 위치에 배치됩니다.

즉, fixed를 쓰면 요소들이 겹쳐 보일 수 있는 상황이 나올 수 있는 반면, sticky를 쓰면 그러한 상황을 예방할 수 있습니다.

---

## 한 줄 요약

position은 요소의 배치 방식을 정하는 CSS 속성으로, **static(기본) · relative(자기 자리 기준) · absolute(조상 기준) · fixed(뷰포트 고정) · sticky(흐름을 따르다 고정)**의 다섯 값으로 구분됩니다.

> 참고
>
> - [(CSS) CSS Position 설명](https://medium.com/@su_bak/css-css-position-%EC%84%A4%EB%AA%85-f2c0a0b26556)
