---
layout: single
title: "MSSQL → PostgreSQL INSERT 시 날짜 9시간 차이 문제"
categories: [SQL]
date: 2024-06-03
---

## 문제 원인

MSSQL에서 데이터를 받을 때부터 timezone이 UTC(협정 세계시)로 설정되어 있음

- **T의 의미**: 날짜와 시간 사이를 구분하는 문자. ISO 8601 형식에서 날짜와 시간은 `YYYY-MM-DDTHH:MM:SS` 형식으로 표기됨
- **Z의 의미**: 시간의 표준 시간대를 나타내며, Coordinated Universal Time (UTC)을 의미. ISO 8601 형식에서 `Z`는 시간 끝에 붙어 UTC임을 나타냄

## 오류 내용

날짜 데이터 삽입 시 9시간이 추가되어 저장됨

## 해결 방안

칼럼 데이터 타입도 바꿔보고, 라이브러리를 이용해 코드도 수정해보았지만 실패…!

**방법 1.** 내 컴퓨터의 날짜 및 시간 설정에서 표준 시간대를 협정 세계시로 바꾸어 해결

**방법 2.** `dayjs` 라이브러리를 활용해 UTC 형태로 변환 후 INSERT

```jsx
// insertToPostgres.js 파일
const { pgClient } = require("./config");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

async function insertToPostgres(data) {
  try {
    await pgClient.connect();

    for (const row of data) {
      const query = {
        text: `INSERT INTO tmp_purchase_info (
            guid, company_code, item_code, product_category, product_name, sn, 
            lic, pono, type, module, received_date, delivery_date, ma_expiry_date,
            invoiceno, amount, registrant, registration_date, modifier, 
            modification_date, product_note, status, hq_expiry_date, 
            quantity, regcode, ma_contract_date
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, 
            $16, $17, $18, $19, $20, $21, $22, $23, $24, $25
          )`,
        values: [
          row.Guid,
          row.기업코드,
          row.품목코드,
          row.제품분류,
          row.제품명,
          row.SN,
          row.Lic,
          row.PONO,
          row.Type,
          row.Module,
          row.입고일 ? dayjs(row.입고일).utc().format() : null,
          row.납품일 ? dayjs(row.납품일).utc().format() : null,
          row.MA만료일 ? dayjs(row.MA만료일).utc().format() : null,
          row.InvoiceNo,
          row.금액,
          row.등록자,
          row.등록일 ? dayjs(row.등록일).utc().format() : null,
          row.수정자,
          row.수정일 ? dayjs(row.수정일).utc().format() : null,
          row.제품메모,
          row.상태,
          row.본사만료일 ? dayjs(row.본사만료일).utc().format() : null,
          row.수량,
          row.RegCode,
          row.MA계약일 ? dayjs(row.MA계약일).utc().format() : null,
        ],
      };
      await pgClient.query(query);
    }

    console.log("Data successfully inserted into PostgreSQL");
  } catch (err) {
    console.error("PostgreSQL error", err);
  } finally {
    await pgClient.end();
  }
}

module.exports = insertToPostgres;
```
