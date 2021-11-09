const { swap } = require('./util')
// $ i表示的是需要执行的遍历次数，以及最少能保证最后i个元素是有序的
// $ j表示在依次对数组进行遍历，且执行交换
/* function bubbleSort(arr) {
  for(let i = 0; i < arr.length; i++){
    for(let j = 0; j < arr.length - 1; j++) {
      if(arr[j + 1] < arr[j])
        swap(arr, j, j + 1)
    }
  }
} */
// $ 当前这个排序有什么缺陷呢？
// $ (1)、若是在排序过程中已经是有序的了，则不需要再执行剩余的遍历次数了
// $ (2)、在每次排序过程中，可能并不只是新增一个元素是有序的

// *********针对第一种情况进行优化********

/* function bubbleSort(arr) { 
  for(let i = 0; i < arr.length; i++) {
    let isSwapped = false
    for(let j = 0; j < arr.length - 1; j++) {
      if(arr[j + 1] < arr[j]){
        swap(arr, j, j + 1)
        isSwapped = true
      }
    }
    if(!isSwapped) return // 若是存在一次遍历并没有交换元素，则表示数组已经是有序的了
  }
} */

// **********************第二种(在第一种基础之上)**********

function bubbleSort(arr) {
  let i = 0
  while(i < arr.length) { // 由于不确定每次bubbleSort能保证有序的个数(最少一个)，所以不能简单执行i++了事
    let lastSwappedIndex = -1
    for(let j = 0; j < arr.length - 1; j++) {
      if(arr[j + 1] < arr[j]){
        swap(arr, j, j + 1)
        lastSwappedIndex = j + 1 // 最后一个交换可以保证 [j + 1, length - 1]是有序的，此时不需要对剩下数进行冒泡排序了
      }
    }
    i += arr.length - lastSwappedIndex 
    // 为什么需要执行此操作呢?
    // 因为目前可以保证[lastSwappedIndex, length - 1]有序了，
    // 所以i也应该更新到这个区间的元素个数：(length - 1) - lastSwappedIndex + 1 => length - lastSwappedIndex

    /* 
      if(!isSwapped) return
      那，为什么不需要类似上面这条语句这样的判断跳出返回了呢？或者说为什么这次优化是在第一次优化基础之上呢？
      因为：若是没有进行交换，那么lastSwappedIndex = -1, 此时length - lastSwappedIndex > length, 就不满足while的循环条件了
    */
  }
}

// 时间复杂度：O(n^2)
// 空间复杂度：O(1)

const arr = [1,1,1,3,3,4,3,2,4,2]
console.time('未经过优化的bubbleSort: ')
bubbleSort(arr)
console.timeEnd('未经过优化的bubbleSort: ')
console.log(arr)