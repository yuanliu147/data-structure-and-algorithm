/** 
* $ 插入排序和选择排序的区别是?
* $ 插入排序的重要特性?
*/

const { swap } = require('./util')

function insertSort(arr) {
  // 循环不变量：[0, i)是排好序的，[i, length)是未排序的
  for(let i = 0; i < arr.length; i++) {
    for(let j = i; j - 1 >= 0; j--) { // 注意条件
      if(arr[j - 1] > arr[j]) {
        swap(arr, j, j - 1) // 每次交换的是 j, j - 1
      }
      else break
    }
  }
}

// ***小优化(常数级别)：不必每次交换，而是平移，最后再赋值****

function insertSort(arr) {
  for(let i = 0; i < arr.length; i++) {
    const currValue = arr[i]
    let j
    for(j = i; j - 1 >= 0; j--) {
      if(arr[j - 1] > currValue) arr[j] = arr[j - 1]
      else break
    }
    arr[j] = currValue
  }
}

// ***换个方式实现插入排序法***
function insertSort(arr) {
  // 循环不变量：[i, length)已排序的，[0, i)未排序的。<<初始情况>>
  for(let i = arr.length - 1; i >= 0; i--) {
    const currValue = arr[i]
    let j
    for(j = i; j + 1 < arr.length; j++) {
      if(arr[j + 1] < currValue) arr[j] = arr[j + 1] // 注意是currValue,而不是arr[i/j]
      else break 
    }
    arr[j] = currValue
  }
}

function insertSort2(arr, left, right) {
  for(let i = right; i >= left; i--) {
    const currValue = arr[i]
    let j
    for(j = i; j + 1 <= right; j++) {
      if(arr[j + 1] < currValue) arr[j] = arr[j + 1] // 注意是currValue,而不是arr[i/j]
      else break 
    }
    arr[j] = currValue
  }
}


// $时间复杂度：O(n^2)
// $空间复杂度：O(1)

// const arr = [1,1,1,3,3,4,3,2,4,2]
// console.time('insertSort: ')
// insertSort2(arr, 0, arr.length - 1)
// console.timeEnd('insertSort: ')
// console.log(arr)

/** 
 * $ 特性：对于**有序数组**，插入排序的时间复杂度是O(n),所以对于趋近有序的数组，插入排序的性能往往比高级排序算法(O(nlogn))更优
*/

module.exports = insertSort2