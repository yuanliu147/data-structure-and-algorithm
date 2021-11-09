const utils = require('./util')
const insertSort = require('./3.插入排序')

function merge(arr, left, mid, right) {
  let pl = left, pr = mid + 1
  const tempArr = []
  while(pl <= mid && pr <= right) {
    if(arr[pl] < arr[pr]) {
      tempArr.push(arr[pl])
      pl++
    } else {
      tempArr.push(arr[pr])
      pr++
    }
  }
  while(pl <= mid) tempArr.push(arr[pl++])
  while(pr <= right) tempArr.push(arr[pr++])
  for(let i = left; i <= right; i++) {
    arr[i] = tempArr[i - left]
  }
}

// ***第一种sort***
// 宏观语义：就是对arr的[left, right]区间进行排序
/* function sort(arr, left, right) {
  if(left >= right) return

  const mid = left + ((right - left) >> 1) // '>>'的优先级很低，如果不加括号，会使前面'+'先执行

  sort(arr, left, mid)
  sort(arr, mid + 1, right)

  merge(arr, left, mid, right)
} */

// ***sort优化：当arr[mid] <= arr[mid + 1]时，则不需要进行merge了 ****
function sort(arr, left, right) {
  if(left >= right) return

  const mid = left + ((right - left) >> 1) // '>>'的优先级很低，如果不加括号，会使前面'+'先执行

  sort(arr, left, mid)
  sort(arr, mid + 1, right)
  if(arr[mid] > arr[mid + 1]) {
    merge(arr, left, mid, right)
  }
}

// ***优化：当元素数量比较少时，使用插入排序而不是归并排序***
/* function sort(arr, left, right) {
  // if(left >= right) return

  if(right - left <= 15) {
    insertSort(arr, left, right)
    return
  }

  const mid = left + ((right - left) >> 1) // '>>'的优先级很低，如果不加括号，会使前面'+'先执行

  sort(arr, left, mid)
  sort(arr, mid + 1, right)
  if(arr[mid] > arr[mid + 1]) {
    merge(arr, left, mid, right)
  }
} */

// $此时，若是数组趋近于有序，则时间复杂度为O(n)

function mergeSort(arr) {
  sort(arr, 0, arr.length - 1)
}


// $换种方式解决****自底向上
function mergeSortBU(arr) {
  // 循环不变量：对[left, left + sz - 1], [left + sz, left + sz + sz - 1]两个区间的元素进行合并
  // 需要注意的是，当left + sz - 1 <= arr.length - 1时，才存在右边的区间，才可以合并
  // sz为左、右区间的元素数
  for(let sz = 1; sz < arr.length; sz += sz) {
    for(let i = 0; i + sz < arr.length; i += sz * 2) {// 注意，循环条件是 i + sz < arr.length
      if(arr[i + sz - 1] > arr[i + sz]) { // 优化
        merge(arr, i, i + sz - 1, Math.min(i + sz + sz - 1, arr.length - 1)) // 注意：merge的第四个参数光是 i + sz + sz - 1还不行，因为存在其大于arr.length的情况，此时则需要将第四个参数设置为arr.length
      }
    }
  }
}

// 时间复杂度：O(nlogn)
// 空间复杂度：O(n)

// const randomArr = utils.createRandom(1000000)
// const randomArr2 = [...randomArr]
// utils.getIntervalTime(mergeSort, randomArr, 'randomArr-mergeSort: ')
// utils.getIntervalTime(mergeSortBU, randomArr2, 'randomArr-mergeSort: ')
// utils.isSort(randomArr)
// utils.isSort(randomArr2)

// const orderArr = utils.createNearlyOrderded(1000000, 100)
// const orderArr2 = [...orderArr]
// utils.getIntervalTime(mergeSort, orderArr, 'orderArr-mergeSort: ')
// utils.getIntervalTime(mergeSortBU, orderArr2, 'orderArr-mergeSort: ')
// utils.isSort(orderArr)
// utils.isSort(orderArr2)

// $通过自行切换上面的sort方法，
// $不难发现，完全有序的情况下，没优化的sort性能反而好一些，而对于趋近于有序的数组，优化之后性能更好
// $不难发现，自底向上的归并排序比递归的归并排序性能更好
// const arr = [1,1,1,3,3,4,3,2,4,2]
// // const arr = [5, 6, 3, 4, 1, 2]
// console.time('mergeSort: ')
// mergeSort(arr)
// console.timeEnd('mergeSort: ')
// console.log(arr)

module.exports = mergeSort
