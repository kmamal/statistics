const { compare, compareBy } = require('../function/compare')

const lengthZeroResult = { item: undefined, index: -1 }
const lengthOneResult = { item: null, index: 0 }
const _ret = { item: null, index: -1 }


const __max = (arr, start, end, fnCmp) => {
	const length = end - start
	if (length <= 0) { return lengthZeroResult }

	if (length === 1) {
		lengthOneResult.item = arr[start]
		return lengthOneResult
	}

	let maxItem = arr[start]
	let maxIndex = 0

	for (let i = start; i < end; i++) {
		const item = arr[i]
		if (fnCmp(item, maxItem) <= 0) { continue }
		maxItem = item
		maxIndex = i
	}

	_ret.item = maxItem
	_ret.index = maxIndex
	return _ret
}


const maxIndexWith = (arr, fnCmp) => __max(arr, 0, arr.length, fnCmp).index

const maxIndexBy = (arr, fnMap) => __max(arr, 0, arr.length, compareBy(fnMap)).index

const maxIndex = (arr) => __max(arr, 0, arr.length, compare).index


const maxWith = (arr, fnCmp) => __max(arr, 0, arr.length, fnCmp).item

const maxBy = (arr, fnMap) => __max(arr, 0, arr.length, compareBy(fnMap)).item

const max = (arr) => __max(arr, 0, arr.length, compare).item


module.exports = {
	__max,
	maxIndexWith,
	maxIndexBy,
	maxIndex,
	maxWith,
	maxBy,
	max,
}
