const { __bubbleDown } = require('./bubble-down')
const { compare, compareBy } = require('@kmamal/util/function/compare')


const __remove = (arr, start, end, index, fnCmp, indexKey) => {
	const item = arr[index]

	const lastIndex = end - 1
	if (index !== lastIndex) {
		arr[index] = arr[lastIndex]
		__bubbleDown(arr, start, lastIndex, index, fnCmp, indexKey)
		arr[lastIndex] = item
	}

	if (indexKey) { delete item[indexKey] }
}


const removeWith = (arr, index, fnCmp, indexKey) => {
	__remove(arr, 0, arr.length, index, fnCmp, indexKey)
	arr.length--
}

const removeBy = (arr, index, fnMap, indexKey) => {
	removeWith(arr, index, compareBy(fnMap), indexKey)
}

const remove = (arr, index, indexKey) => {
	removeWith(arr, index, compare, indexKey)
}


module.exports = {
	__remove,
	removeWith,
	removeBy,
	remove,
}
