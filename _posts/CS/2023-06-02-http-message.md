---
layout: single
title: "HTTP와 HTTP 메시지 구조"
categories: [CS]
date: 2023-06-02
---

면접에서 **"HTTP에 대해 설명하고, 알고 있다면 HTTP 메시지 구조에 대해 더 자세히 설명해 주세요."**라는 질문이 자주 나옵니다. 개념부터 요청·응답 메시지 구조까지 정리해 보겠습니다.

## HTTP란?

**HyperText Transfer Protocol**로, 서버와 클라이언트 사이에서 어떻게 메시지를 교환할지 정해 놓은 규칙입니다. 기본적으로 **Request(요청)/Response(응답)** 구조로 되어 있습니다.

---

## HTTP 메시지 구조

**서버에게 요청**을 보내거나 **서버에서 응답**을 보낼 때 **정보를 담아 메시지**를 보내는데, 이를 HTTP 메시지라고 합니다.

### Request Message 구조

#### Start Line

- **HTTP method** : 요청의 의도를 담고 있으며 GET, POST, PUT, DELETE 등이 있습니다.
- **Request target** : HTTP Request가 전송되는 목표 주소입니다.
- **HTTP version** : version에 따라 Request 메시지의 구조나 데이터가 다를 수 있어 version을 명시합니다.

#### Headers

- 해당 request에 대한 **추가 정보**를 담고 있는 부분입니다.
- request 메시지에 대한 메타 정보, body의 총 길이 등이 포함됩니다.

#### Body

- request의 **실제 메시지/내용**입니다.
- 전송하는 메시지가 없다면 body 부분은 비어 있습니다.

---

### Response Message 구조

#### Status Line

Response의 상태를 간략하게 나타내 주는 부분으로, 다음 정보를 담습니다.

- **HTTP version**
- **Status Code** (예: 200, 404, 500)
- **Status Text** (예: OK, Not Found)

#### Headers

- 해당 response에 대한 **추가 정보**를 담는 부분입니다.
- response 메시지에 대한 메타 정보, body의 총 길이 등이 포함됩니다.

#### Body

- response의 **실제 메시지/내용**입니다.
- 모든 Response가 body를 갖지는 않으며, 데이터를 전송할 필요가 없을 경우 body가 비어 있게 됩니다.

---

## 한 줄 요약

HTTP는 서버와 클라이언트가 **메시지를 어떻게 주고받을지 정한 규칙(Request/Response 구조)**입니다. 메시지는 **Start Line(또는 Status Line) · Headers · Body**로 구성되며, Body는 전송할 데이터가 없으면 비어 있을 수 있습니다.
