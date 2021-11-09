function createRandom(n) {
  const arr = []
  for(let i = 0; i < n; i++) {
    arr[i] = Math.random() * n
  }
  return arr
}

function getIntervalTime(callBack, arr, str) {
  console.time(str)
  callBack(arr)
  console.timeEnd(str)
}

function isSort(arr, str = '') {
  for(let i = 1; i < arr.length; i++) {
    if(arr[i] < arr[i - 1]) {
      console.log(str, '-> is not sort!')
      return false
    }
  }
  console.log(str, '-> is sort!')
  return true
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

function createNearlyOrderded(n, times = 0) {
  const arr = []
  for(let i = 1; i <= n; i++) {
    arr.push(i)
  }
  for(let i = 0; i < times; i++) {
    const num1 = (Math.random() * n) >> 1
    const num2 = (Math.random() * n) >> 1
    
    swap(arr, num1, num2)
  }
  return arr
}

function createAllSameValue(n) {
  const value = (Math.random() * n) | 0
  const arr = new Array(n)
  for(let i = 0; i < n; i++) {
    arr[i] = value
  }
  return arr
}

module.exports = {
  createRandom,
  getIntervalTime,
  isSort,
  swap,
  createNearlyOrderded,
  createAllSameValue
}