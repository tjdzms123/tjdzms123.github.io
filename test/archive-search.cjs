const assert = require('node:assert/strict');
const { matchesRecord } = require('../assets/archive.js');
assert.equal(matchesRecord('Promise 비동기 완료', 'promise 완료'), true);
assert.equal(matchesRecord('본문에만 있는 함수', '함수'), true);
assert.equal(matchesRecord('함수', '없는 단어'), false);
assert.equal(matchesRecord('함수', '  '), true);
assert.equal(matchesRecord('한글', '한글'.normalize('NFD')), true);
console.log('검색 조건 확인 완료');
