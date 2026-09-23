---
layout: single
title: "이분 탐색의 원리와 시간 복잡도"
categories: [CS]
date: 2024-09-29
---

**이분 탐색(Binary Search)**은 정렬된 데이터에서 가운데 값을 확인하고, 탐색 범위를 절반씩 줄이는 알고리즘입니다. 처음부터 끝까지 확인하는 선형 탐색과 달리 비교할 필요가 없는 구간을 한 번에 제외합니다.

## 탐색 과정

오름차순 배열 `[2, 5, 8, 12, 16, 23, 38]`에서 `23`을 찾는다고 가정합니다.

1. 가운데 값 `12`와 비교합니다.
2. `23`이 더 크므로 `12`와 그 왼쪽 구간을 제외합니다.
3. 남은 `[16, 23, 38]`의 가운데에서 `23`을 찾습니다.

정렬되어 있다는 전제 덕분에 절반을 버릴 수 있습니다. 정렬되지 않은 배열에 그대로 적용하면 값이 있어도 찾지 못할 수 있습니다.

## JavaScript 구현

다음 함수는 오름차순으로 정렬된 숫자 배열을 입력받고, 찾은 인덱스 또는 `-1`을 반환합니다.

```js
function binarySearch(sortedNumbers, target) {
  let left = 0;
  let right = sortedNumbers.length - 1;

  while (left <= right) {
    const middle = left + Math.floor((right - left) / 2);
    const value = sortedNumbers[middle];

    if (value === target) return middle;
    if (value < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
}

console.assert(binarySearch([2, 5, 8, 12, 16, 23, 38], 23) === 5);
console.assert(binarySearch([2, 5, 8], 2) === 0);
console.assert(binarySearch([2, 5, 8], 8) === 2);
console.assert(binarySearch([2, 5, 8], 7) === -1);
console.assert(binarySearch([], 7) === -1);
```

비교한 가운데 원소를 다음 구간에서 제외해야 범위가 계속 줄어듭니다. 위 구현은 중복 값이 있을 때 그중 하나를 반환하며, 첫 번째 위치를 보장하지는 않습니다.

## 시간·공간 복잡도

배열 길이가 `N`이면 탐색 범위는 `N → N/2 → N/4`처럼 줄어듭니다. 최악의 시간 복잡도는 **O(log N)**이며, 반복문 구현의 추가 공간은 **O(1)**입니다.

이는 배열처럼 가운데 원소에 빠르게 접근할 수 있을 때의 분석입니다. 연결 리스트에서는 가운데로 이동하는 비용도 고려해야 합니다. 또한 정렬되지 않은 데이터를 한 번만 검색한다면, 정렬 비용까지 포함해 선형 탐색과 비교해야 합니다.

> 참고
>
> - [NIST — Binary search](https://www.nist.gov/dads/HTML/binarySearch.html)
