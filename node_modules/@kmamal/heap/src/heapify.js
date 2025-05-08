const { getParent } = require('./tree-helpers')
const { __bubbleDown } = require('./bubble-down')
const { compare, compareBy } = require('@kmamal/util/function/compare')

const __heapify = (arr, start, end, fnCmp, indexKey) => {
	const first = start + getParent((end - start) - 1)
	for (let i = first; i >= start; i--) {
		__bubbleDown(arr, start, end, i, fnCmp, false)
	}
	if (indexKey) {
		for (let i = start; i < end; i++) {
			arr[i][indexKey] = i
		}
	}
}


const heapifyWith = (arr, fnCmp, indexKey) => {
	__heapify(arr, 0, arr.length, fnCmp, indexKey)
}

const heapifyBy = (arr, fnMap, indexKey) => {
	heapifyWith(arr, compareBy(fnMap), indexKey)
}

const heapify = (arr, indexKey) => {
	heapifyWith(arr, compare, indexKey)
}


module.exports = {
	__heapify,
	heapifyWith,
	heapifyBy,
	heapify,
}
