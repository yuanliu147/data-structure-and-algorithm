const {
  createRandom,
  getIntervalTime,
  isSort,
  swap,
  createNearlyOrderded,
  createAllSameValue
} = require('./util')

const shellSort = require('./7.希尔排序')
const heapSort = require('./6.堆排序')
const quickSort = require('./5.快速排序')
const mergeSort = require('./4.归并排序')

const n = 10000000

const randomArr1 = createRandom(n)
const randomArr2 = [...randomArr1]
const randomArr3 = [...randomArr1]
const randomArr4 = [...randomArr1]

const orderArr1 = createNearlyOrderded(1000000, 50)
const orderArr2 = [...orderArr1]
const orderArr3 = [...orderArr1]
const orderArr4 = [...orderArr1]

getIntervalTime(shellSort, randomArr1, `shellSort-random: --`)
getIntervalTime(heapSort, randomArr2, `heapSort-random: --`)
getIntervalTime(quickSort, randomArr3, `quickSort-random: --`)
getIntervalTime(mergeSort, randomArr4, `mergeSort-random: --`)

getIntervalTime(shellSort, orderArr1, `shellSort-order: --`)
getIntervalTime(heapSort, orderArr2, `heapSort-order: --`)
getIntervalTime(quickSort, orderArr3, `quickSort-order: --`)
getIntervalTime(mergeSort, orderArr4, `mergeSort-order: --`)

isSort(randomArr1, 'shellSort - random')
isSort(randomArr2, 'heapSort - random')
isSort(randomArr3, 'quickSort - random')
isSort(randomArr4, 'mergeSort - random')

isSort(orderArr1, 'shellSort - order')
isSort(orderArr2, 'heapSort - order')
isSort(orderArr3, 'quickSort - order')
isSort(orderArr4, 'mergeSort - order')