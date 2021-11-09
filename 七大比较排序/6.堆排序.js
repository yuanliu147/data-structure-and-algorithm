const utils = require('./util')

function heapSort(arr) {
  for(let i = (arr.length - 2) >> 1; i >= 0; i--) {
    siftDown(arr, i, arr.length)
  } // 此步骤是heapify

  for(let i = arr.length - 1; i >= 0; i--) { // heapSort
    utils.swap(arr, 0, i)
    siftDown(arr, 0, i)
  }
}

function siftDown(arr, index, length) {
  if(index * 2 + 1 >= length) return
  let maxChildIndex = index * 2 + 1
  if(maxChildIndex + 1 < length && arr[maxChildIndex] < arr[maxChildIndex + 1]) {
    maxChildIndex++
  }
  if(arr[index] >= arr[maxChildIndex]) return
  utils.swap(arr, index, maxChildIndex)
  siftDown(arr, maxChildIndex, length)
}

// const arr = [1,1,1,3,3,4,3,2,4,2]
// // const arr = [5, 6, 3, 4, 1, 2]
// console.time('heapSort: ')
// heapSort(arr)
// console.timeEnd('heapSort: ')
// console.log(arr)

module.exports = heapSort