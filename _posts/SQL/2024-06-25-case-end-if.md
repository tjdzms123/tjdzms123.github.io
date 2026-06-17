---
layout: single
title: "MSSQL CASE ~ END 활용"
categories: [SQL]
date: 2024-06-25
---

```jsx
const sql = require("mssql");
const { mssqlConfig } = require("./config");

async function getMSSQLData() {
  try {
    // MSSQL 데이터베이스에 연결
    await sql.connect(mssqlConfig);

    // 사용자등록 테이블에서 데이터를 가져오는 쿼리 실행
    const { recordset } = await sql.query`
      SELECT 
        사용자ID, 
        사용자, 
        비밀번호, 
        이동통신, 
        전화번호, 
        부서, 
        직위, 
        전자우편, 
        개인그룹, 
        메모, 
        CASE 
          WHEN 부서 LIKE '%기술%' THEN 'AE'
          ELSE 'SR'
        END AS job_type, 
        CASE 
          WHEN 사용자 LIKE '(퇴사자)%' THEN 'N'
          ELSE 'Y'
        END AS is_work
      FROM 사용자등록`;

    // 가져온 데이터 반환
    return recordset;
  } catch (err) {
    console.error("MSSQL error", err);
  } finally {
    // 데이터베이스 연결 종료
    await sql.close();
  }
}

module.exports = getMSSQLData;
```
