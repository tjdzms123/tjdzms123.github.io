---
layout: single
title: "RESTful API와 HTTP 메서드 정리"
categories: [CS]
date: 2023-05-30
---

면접에서 **"RESTful API에 대해 설명해 주세요. GET, POST 외에 알고 있는 메서드와 그 기준은? RESTful하지 않은 것은 무엇인가요?"**라는 질문이 자주 나옵니다. 용어를 하나씩 짚어보면서 정리해 보겠습니다.

## RESTful API란?

두 컴퓨터 시스템이 인터넷을 통해 정보를 안전하게 교환하기 위해 사용하는 인터페이스입니다. 이 개념을 이해하려면 **API**와 **REST**를 나눠서 봐야 합니다.

### API

애플리케이션 프로그래밍 인터페이스(API)는 다른 소프트웨어 시스템과 통신하기 위해 따라야 하는 **규칙**입니다. 웹 API는 클라이언트와 웹 리소스 사이의 게이트웨이로 생각할 수 있습니다.

### REST

Representational State Transfer(REST)는 API 작동 방식에 대한 조건을 부과하는 **소프트웨어 아키텍처**를 뜻합니다. 이 조건(제약)을 잘 지킨 API를 RESTful API라고 부릅니다.

---

## HTTP 메서드와 기준

### GET

클라이언트는 GET을 사용하여 서버의 지정된 URL에 있는 리소스에 **액세스(조회)**합니다. GET 요청은 캐싱할 수 있고, 요청에 파라미터를 넣어 전송하면 데이터를 필터링하도록 서버에 지시할 수 있습니다.

### POST

클라이언트는 POST를 사용하여 서버에 **데이터를 전송(생성)**합니다. 요청과 함께 데이터 표현이 포함됩니다. 동일한 POST 요청을 여러 번 전송하면 동일한 리소스를 여러 번 생성하는 부작용이 있습니다.

### PUT

클라이언트는 PUT을 사용하여 서버의 기존 리소스를 **업데이트**합니다. POST와 달리, RESTful 웹 서비스에서 **동일한 PUT 요청을 여러 번 전송해도 결과는 동일**합니다.

### DELETE

클라이언트는 DELETE 요청을 사용하여 리소스를 **제거**합니다. DELETE 요청은 서버 상태를 변경할 수 있지만, 사용자에게 적절한 인증이 없으면 요청은 실패합니다.

### PATCH

서버에서 자원의 **일부분만 업데이트**합니다. PUT과 유사하지만, PATCH는 전체 자원을 대체하지 않고 **변경 사항만** 전달합니다.

---

## RESTful API가 아닌 것들

REST의 제약을 지키지 않으면 RESTful하다고 보기 어렵습니다. 대표적인 예는 다음과 같습니다.

- CRUD 기능을 **모두 POST로만** 처리하는 API
- route에 resource, id 외의 정보가 들어가는 경우 (예: `/students/updateName`)
  - 동작(updateName)은 메서드(PUT/PATCH)로 표현해야 하며, URL에는 자원만 두는 것이 원칙입니다. (예: `PATCH /students/{id}`)

---

## 한 줄 요약

RESTful API는 **REST 아키텍처의 제약을 지킨 웹 API**로, 자원은 URL로 표현하고 행위는 HTTP 메서드(GET·POST·PUT·DELETE·PATCH)로 구분합니다. CRUD를 전부 POST로 처리하거나 URL에 동작을 넣는 방식은 RESTful하지 않습니다.

> 참고
>
> - [RESTful API란 무엇인가요? | AWS](https://aws.amazon.com/ko/what-is/restful-api/)
> - [\[Network\] REST란? REST API란? RESTful이란? | Heee's Development Blog](https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html)
