---
layout: single
title: "웹 페이지가 브라우저에 렌더링 되는 과정"
categories: [CS]
date: 2023-05-30
---

프론트엔드 면접에서 단골로 나오는 질문이 **"웹 페이지가 브라우저에 렌더링 되는 과정을 설명해 주세요"**입니다. 단순히 외우기보다 각 단계가 왜 필요한지 이해하면 성능 최적화로도 자연스럽게 이어집니다.

## 브라우저란?

웹에서 페이지를 검색하고 표시하며, 사용자가 하이퍼링크를 통해 추가 페이지에 접근할 수 있도록 하는 프로그램입니다.

## 렌더링 동작 과정 요약

브라우저가 화면을 그리는 과정은 크게 다섯 단계로 나뉩니다.

1. **Parsing** — HTML, CSS 파일을 파싱해서 각각 Tree를 만든다.
2. **Style** — 두 Tree를 결합하여 Render Tree를 만든다.
3. **Layout** — Render Tree에서 각 노드의 위치와 크기를 계산한다.
4. **Paint** — 계산된 값을 이용해 각 노드를 화면상의 실제 픽셀로 변환하고, 레이어를 만든다.
5. **Composite** — 레이어를 합성하여 실제 화면에 나타낸다.

이제 각 단계를 조금 더 깊게 살펴보겠습니다.

---

## 1. Parsing

브라우저가 페이지를 렌더링 하려면 가장 먼저 받아온 HTML 파일을 해석해야 합니다. Parsing 단계는 HTML 파일을 해석하여 **DOM(Document Object Model) Tree**를 구성하는 단계입니다.

파싱 중 HTML에 CSS가 포함되어 있다면 **CSSOM(CSS Object Model) Tree** 구성 작업도 함께 진행합니다.

## 2. Style

Style 단계에서는 Parsing 단계에서 생성된 DOM Tree와 CSSOM Tree를 매칭시켜서 **Render Tree**를 구성합니다. Render Tree는 실제로 화면에 그려질 Tree입니다.

예를 들어 Render Tree를 구성할 때

- `visibility: hidden`은 요소가 **공간을 차지하고 보이지만 않기 때문에** Render Tree에 포함됩니다.
- `display: none`은 Render Tree에서 **제외**됩니다.

## 3. Layout

Layout 단계에서는 Render Tree를 화면에 어떻게 배치할 것인지, 노드의 정확한 위치와 크기를 계산합니다. 루트부터 노드를 순회하면서 정확한 크기와 위치를 계산하고 Render Tree에 반영합니다.

만약 크기 값을 `%`로 지정했다면, Layout 단계에서 `%` 값을 계산해서 픽셀 단위로 변환합니다.

## 4. Paint

Paint 단계에서는 Layout 단계에서 계산된 값을 이용해 Render Tree의 각 노드를 화면상의 실제 픽셀로 변환합니다. 이때 픽셀로 변환된 결과는 하나의 레이어가 아니라 **여러 개의 레이어**로 관리됩니다.

당연한 말이지만 스타일이 복잡할수록 Paint 시간도 늘어납니다. 예를 들어 단색 배경은 시간과 작업이 적게 필요하지만, 그림자 효과는 시간과 작업이 더 많이 필요합니다.

## 5. Composite

Composite 단계에서는 Paint 단계에서 생성된 레이어를 합성하여 실제 화면에 나타냅니다. 이 과정을 거쳐야 우리가 화면에서 웹 페이지를 볼 수 있습니다.

---

## 한 줄 요약

브라우저는 **Parsing → Style → Layout → Paint → Composite** 순서로 동작하며, HTML과 CSS를 해석해 Tree를 만들고(Parsing·Style), 위치와 크기를 계산한 뒤(Layout), 픽셀로 변환하고(Paint), 레이어를 합성해(Composite) 최종 화면을 그립니다.

> 참고
>
> - [브라우저는 어떻게 동작하는가? | 우아한테크코스](https://tecoble.techcourse.co.kr/post/2021-10-24-browser-rendering/)
> - [브라우저는 어떻게 동작하는가 | NAVER D2](https://d2.naver.com/helloworld/59361)
