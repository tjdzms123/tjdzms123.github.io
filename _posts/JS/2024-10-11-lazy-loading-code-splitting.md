---
layout: single
title: "Lazy loading과 Code splitting의 차이"
categories: [JS]
date: 2024-10-11
---

**Lazy loading은 자원을 언제 불러올지**, **Code splitting은 코드를 어떤 단위로 나눌지**에 관한 전략입니다. 둘을 함께 사용하면 첫 화면에 필요하지 않은 JavaScript의 다운로드와 실행을 뒤로 미룰 수 있습니다.

## Lazy loading

지연 로딩은 자원이 필요해지는 시점에 불러오는 방식입니다. 화면 아래의 이미지, 사용자가 열기 전에는 필요 없는 편집기 등이 대상이 될 수 있습니다.

```html
<img
  src="/assets/images/gallery.jpg"
  alt="여행 사진 모음"
  width="800"
  height="600"
  loading="lazy"
>
```

이 예제의 이미지 경로는 실제 프로젝트의 파일로 바꿔야 합니다. 크기를 지정하면 로딩 전에도 공간을 확보할 수 있습니다. 첫 화면의 핵심 이미지까지 지연 로딩하면 오히려 주요 콘텐츠 표시가 늦어질 수 있습니다.

## Code splitting

코드 분할은 하나의 큰 번들 대신 페이지나 기능별로 코드를 나누는 것입니다. 번들러가 지원하는 동적 `import()`를 사용하면 특정 기능을 별도 청크로 분리할 수 있습니다.

분리만 했다고 반드시 지연 로딩되는 것은 아닙니다. 나눈 파일을 모두 즉시 요청하면 초기 다운로드 양은 크게 줄지 않을 수 있습니다.

## React에서 함께 사용하기

다음 예제는 React 18과 동적 import를 지원하는 빌드 환경을 전제로 합니다.

```jsx
import { lazy, Suspense, useState } from "react";

const Help = lazy(() => import("./Help.jsx"));

export default function App() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <button onClick={() => setShowHelp(true)}>도움말 열기</button>
      {showHelp && (
        <Suspense fallback={<p role="status">도움말을 불러오는 중입니다.</p>}>
          <Help />
        </Suspense>
      )}
    </>
  );
}
```

`Help.jsx`에서는 컴포넌트를 기본 내보내기 합니다.

```jsx
export default function Help() {
  return <p>도움이 필요한 항목을 선택해 주세요.</p>;
}
```

캐시를 비운 뒤 네트워크 패널에서 버튼을 누를 때 도움말 청크가 요청되는지 확인할 수 있습니다. `lazy` 선언은 컴포넌트 바깥에 둡니다. `Suspense`는 로딩 대기를 처리하며, 다운로드 실패는 별도의 Error Boundary에서 처리해야 합니다.

## 분할 기준

페이지나 큰 기능 단위부터 나누는 것이 이해하기 쉽습니다. 파일을 너무 작게 나누면 요청과 관리 비용이 늘 수 있으므로 초기 번들 크기와 실제 로딩 흐름을 보고 조정합니다.

> 참고
>
> - [React — lazy](https://react.dev/reference/react/lazy)
> - [MDN — Lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading)
