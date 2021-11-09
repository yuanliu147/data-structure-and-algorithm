/* 
 * @基本思想：让数组越来越有序。
 * 不能只处理相邻的逆序对
 */

/* function shellSort(arr) {
  let step = (arr.length - 1) >> 1
  while(step >= 1) {
    for(let start = 0; start < step; start++) { // 每个组的第一个元素，接下来，对每个组进行插入排序
      for(let i = start + step; i < arr.length; i += step) { // 遍历每个组的元素
        const temp = arr[i] // 获取标定元素
        let j
        for(j = i; j - step >= 0; j -= step) { // 从当前元素开始，依次看'前一个'元素是否比当前元素大，如果大的话，则将该元素后移，且当前元素移动到当前的'前一个'元素
          if(arr[j - step] > temp) arr[j] = arr[j - step]
          else break // 如果，已经遇到不再大于的元素，则跳出循环
        }
        arr[j] = temp // 此时arr[j]为已经往后移的那个最后一个大于temp的元素，即，将temp插入当前位置
      }
    }
    step = step >> 1
  }
} */

// ****换个方式实现：三重循环变成两重循环****
// ***上面的思想是先对每个组的元素进行插入排序，这里的思想是对单个元素进行插入排序，毕竟不管是哪个组的元素的前一个元素都是相差step***

function shellSort(arr) {
  let step = (arr.length - 1) >> 1
  while (step >= 1) {
    for (let i = step; i < arr.length; i++) { // $注意差别，let i = step而不是start + step，且i++而不是i += step
      const temp = arr[i] // 获取标定元素
      let j
      for (j = i; j - step >= 0; j -= step) { // 从当前元素开始，依次看'前一个'元素是否比当前元素大，如果大的话，则将该元素后移，且当前元素移动到当前的'前一个'元素
        if (arr[j - step] > temp) arr[j] = arr[j - step]
        else break // 如果，已经遇到不再大于的元素，则跳出循环
      }
      arr[j] = temp // 此时arr[j]为已经往后移的那个最后一个大于temp的元素，即，将temp插入当前位置
    }
    step = step >> 1
  }
}


// const arr = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]
// // const arr = [5, 6, 3, 4, 1, 2]
// console.time('shellSort: ')
// shellSort(arr)
// console.timeEnd('shellSort: ')
// console.log(arr)

// *时间复杂度 O(nlogn) // 计算出来的是O(n^2)，
// *可是，每次排序时都是让数组越来越有序。所以，时间复杂度应该是[O(nlogn), O(n^2)]之间。然而实际上，其时间复杂度趋近于O(nlogn)
// *空间复杂度 O(1)

// 数量略少时(10万级别)貌似会比归并排序略快
// 数量大时，还是会比归并排序略慢

module.exports = shellSort