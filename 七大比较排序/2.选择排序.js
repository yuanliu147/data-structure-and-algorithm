const { swap } = require('./util')

// ***从前往后排***
/* function selectionSort(arr) {
  // 每次遍历保证[0, i)是有序的，[i, length)是未排序的
  for(let i = 0; i < arr.length - 1; i++) { // 注意条件不能是 i < arr.length
    let minIndex = i
    for(let j = i + 1; j < arr.length; j++) { // 每次在未遍历的元素中选出最小的元素与当前元素进行排序
      if(arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    swap(arr, i, minIndex)
  }
} */

// ***换个方式：从后往前排***
function selectionSort(arr) {
  // 此时循环不变量是 [i, length)是排序的，[0, i)是未排序的
  for(let i = arr.length - 1; i > 0; i--) {
    let maxIndex = i
    for(let j = i - 1; j >= 0; j--) {
      if(arr[j] > arr[maxIndex]) {
        maxIndex = j
      }
    }
    swap(arr, maxIndex, i)
  }
}


// 时间复杂度：O(n^2)
// 空间复杂度：O(1)

const arr = [1,1,1,3,3,4,3,2,4,2]
console.time('selectionSort: ')
selectionSort(arr)
console.timeEnd('selectionSort: ')
console.log(arr)