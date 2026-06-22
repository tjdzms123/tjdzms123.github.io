---
layout: single
title: "require와 import의 차이"
categories: [JS]
date: 2023-06-07
---

면접에서 **"require와 import의 차이점을 설명해 주세요. 각각 어떤 상황에서 쓸 수 있나요?"**라는 질문이 자주 나옵니다. 두 모듈 시스템을 나눠서 정리해 보겠습니다.

## require

- `require`는 **CommonJS** 모듈 시스템에서 사용되는 키워드입니다. 주로 **Node.js** 환경에서 사용됩니다.
- **동기적으로** 작동하며, 모듈을 가져올 때 코드 실행을 일시 중지합니다.
- 모듈을 가져올 때 해당 모듈의 **전체 내용**을 반환합니다.
- 모듈의 경로를 상대 또는 절대 경로로 지정해야 합니다.
- 일반적으로 서버 측 개발에 사용되며, **실행 시점에 모듈을 가져오는 데** 적합합니다.

```js
const fs = require('fs');
const mathUtils = require('./utils/math');
```

---

## import

- `import`는 **ECMAScript 모듈 시스템(ESM)**에서 사용되는 키워드입니다. 웹 브라우저 및 최신 JavaScript 환경에서 지원됩니다.
- 모듈의 **일부 또는 특정 항목만** 가져올 수 있습니다.
- 모듈의 경로는 상대 또는 절대 경로로 지정합니다.
- 주로 클라이언트 측 개발에 사용되며, **미리 모듈을 가져와야 하는 경우**에 적합합니다.

```js
import fs from 'fs';
import { add, subtract } from './utils/math';
```

---

## 차이점

- ECMAScript 모듈 시스템은 **정적 모듈 시스템**이기 때문에 `import` 문은 파일의 **최상위 수준에서만** 사용할 수 있습니다. 조건문이나 함수 내에서는 사용할 수 없습니다. 이와 달리 `require`는 **동적으로** 사용할 수 있습니다.
- Node.js에서는 전통적으로 `require`를 사용해 왔지만, 최신 버전의 Node.js에서는 ESM을 지원하므로 `import`를 사용할 수도 있습니다.

> 동적으로 모듈을 불러와야 할 때는 `import()` 함수(동적 import)를 사용할 수 있으며, 이 경우 Promise를 반환합니다.

---

## 한 줄 요약

`require`는 **CommonJS의 동기적·동적** 방식으로 모듈 전체를 가져오고, `import`는 **ESM의 정적** 방식으로 필요한 항목만 최상위에서 가져옵니다. 서버 측은 `require`, 최신 환경·브라우저는 `import`가 일반적입니다.
