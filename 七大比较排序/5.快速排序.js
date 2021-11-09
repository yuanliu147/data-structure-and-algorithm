const util = require('./util')

// ***第一版***
function partition(arr, left, right) {
  const temp = (left + Math.random() * (right - left)) | 0
  util.swap(arr, left, temp)
  const mark = arr[left] // 获取标志元素值
  // 循环不变量：[left + 1, j)为小于mark，[j, i)为大于mark
  let j = left + 1
  for(let i = left + 1; i <= right; i++) {
    if(arr[i] < mark) {
      util.swap(arr, i, j)
      j++
    }
  }
  util.swap(arr, left, j - 1) // 最后需要将标志数值与中间值(左区间最后一个数)进行交换
  return j - 1
}
// ***第一版存在什么问题？***
// $若是数组趋近于所有的元素相等时，那么时间复杂度仍然会退化为O(n^2)
// $因为不论是在相等时，放在左边，还是右边，都会导致每次只在对应区间确定一个元素的位置，此时，就会出现问题，还可能出现系统栈溢出的情况

// ***第二版：双路快排，针对上述问题解决：使等于标志元素则平均分配于左右区间***
function partition2(arr, left, right) {
  const temp = (left + Math.random() * (right - left)) | 0
  util.swap(arr, left, temp)
  const mark = arr[left] // 获取标志元素值
  // 循环不变量：[left + 1, j] 为小于等于mark的值，[i, right]为大于等于mark的值
  let j = left, i = right + 1
  while(true) {
    while(j + 1 < i && arr[j + 1] < mark) j++
    while(j < i - 1 && arr[i - 1] > mark) i--
    if(j + 1 >= i) break
    util.swap(arr, j + 1, i - 1)
    j++
    i--
  }
  util.swap(arr, left, j)
  return j
}

// ***三路快排：针对第二种虽然能解决数组元素趋近于所有元素相等，但分区间后仍然需要遍历所有元素相等的区间***
// ***所有元素相同时，时间复杂度为：O(n)****
function partition3(arr, left, right) {
  const temp = (left + Math.random() * (right - left)) | 0
  util.swap(arr, left, temp)
  const mark = arr[left] // 获取标志元素值
  // 循环不变量：[left + 1, lt]小于mark, [lt + 1, gt - 1]等于mark, [gt, right]大于
  let lt = left, gt = right + 1, i = left + 1
  while(i < gt) {
    if(arr[i] < mark){
      lt++
      util.swap(arr, lt, i)
      i++
    } else if (arr[i] > mark) { // 注意了：为什么不用for循环?因为并不是所有情况都需要i++,在这种情况，交换了i位置就已经是未遍历的元素了，不需要再i++ 
      util.swap(arr, i, gt - 1)
      gt--
    } else i++
  }
  util.swap(arr, left, lt)
  return [lt - 1, gt]
}

function sort3(arr, left, right) {
  if(left >= right) return

  const [lt, gt] = partition3(arr, left, right)
  sort3(arr, left, lt)
  sort3(arr, gt, right)
}

function sort(arr, left, right) {
  if(left >= right) return

  const part = partition2(arr, left, right)
  sort(arr, left, part - 1)
  sort(arr, part + 1, right)
}

function quickSort(arr) {
  sort3(arr, 0, arr.length - 1)
}

// 时间复杂度：O(nlogn)
// 空间复杂度：O(1)

// const randomArr = util.createRandom(1000000)
// util.getIntervalTime(quickSort, randomArr, 'randomArr-quickSort: ')
// util.isSort(randomArr)

// const orderArr = util.createNearlyOrderded(1000000, 1)
// util.getIntervalTime(quickSort, orderArr, 'orderArr-quickSort: ')
// util.isSort(orderArr)

// const sameValueArr = util.createAllSameValue(1000000)
// util.getIntervalTime(quickSort, sameValueArr, 'sameValueArr-quickSort: ')
// util.isSort(sameValueArr)

// const arr = [1,1,1,3,3,4,3,2,4,2]
// // const arr = [5, 6, 3, 4, 1, 2]
// console.time('quickSort: ')
// quickSort(arr)
// console.timeEnd('quickSort: ')
// console.log(arr)

/** 
 * $ 为什么在设置标志元素值时，需要随机设置?
 * # 因为若是只是简单的设置arr[left]为标志值时，
 * # 若是数组趋近有序时,则左区间每次都为空，右区间每次少一个元素，此时，时间复杂度变成了O(n^2)。且十分容易出现系统栈溢出的情况
 * # 而随机设置的话，想要每次都是最小值的话，几率是很小的(几乎可以忽略不计：1/n * 1/(n-1) * 1/(n-2) ...)
*/

module.exports = quickSort