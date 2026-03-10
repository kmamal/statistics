const { kIndex, getParent } = require('./tree-helpers')
const { __bubbleDown } = require('./bubble-down')
const { compare, compareBy } = require('@kmamal/util/function/compare')

const __heapify = (arr, start, end, fnCmp) => {
	const first = start + getParent((end - start) - 1)
	for (let i = end - 1; i > first; i--) {
		arr[i][kIndex] = i
	}
	for (let i = first; i >= start; i--) {
		__bubbleDown(arr, start, end, i, fnCmp)
	}
}


const heapifyWith = (arr, fnCmp) => {
	__heapify(arr, 0, arr.length, fnCmp)
}

const heapifyBy = (arr, fnMap) => {
	heapifyWith(arr, compareBy(fnMap))
}

const heapify = (arr) => {
	heapifyWith(arr, compare)
}


module.exports = {
	__heapify,
	heapifyWith,
	heapifyBy,
	heapify,
}
