const { kIndex } = require('./tree-helpers')
const { __bubbleDown } = require('./bubble-down')
const { compare, compareBy } = require('@kmamal/util/function/compare')


const __remove = (arr, start, end, index, fnCmp) => {
	const item = arr[index]

	const lastIndex = end - 1
	if (index !== lastIndex) {
		arr[index] = arr[lastIndex]
		__bubbleDown(arr, start, lastIndex, index, fnCmp)
		arr[lastIndex] = item
	}

	delete item[kIndex]
}


const removeWith = (arr, index, fnCmp) => {
	__remove(arr, 0, arr.length, index, fnCmp)
	arr.length--
}

const removeBy = (arr, index, fnMap) => {
	removeWith(arr, index, compareBy(fnMap))
}

const remove = (arr, index) => {
	removeWith(arr, index, compare)
}


module.exports = {
	__remove,
	removeWith,
	removeBy,
	remove,
}
