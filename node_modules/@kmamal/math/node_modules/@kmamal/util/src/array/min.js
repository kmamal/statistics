const { compare, compareBy } = require('../function/compare')

const lengthZeroResult = { item: undefined, index: -1 }
const lengthOneResult = { item: null, index: 0 }
const _ret = { item: null, index: -1 }


const __min = (arr, start, end, fnCmp) => {
	const length = end - start
	if (length <= 0) { return lengthZeroResult }

	if (length === 1) {
		lengthOneResult.item = arr[start]
		return lengthOneResult
	}

	let minItem = arr[start]
	let minIndex = 0

	for (let i = start; i < end; i++) {
		const item = arr[i]
		if (fnCmp(item, minItem) >= 0) { continue }
		minItem = item
		minIndex = i
	}

	_ret.item = minItem
	_ret.index = minIndex
	return _ret
}


const minIndexWith = (arr, fnCmp) => __min(arr, 0, arr.length, fnCmp).index

const minIndexBy = (arr, fnMap) => __min(arr, 0, arr.length, compareBy(fnMap)).index

const minIndex = (arr) => __min(arr, 0, arr.length, compare).index


const minWith = (arr, fnCmp) => __min(arr, 0, arr.length, fnCmp).item

const minBy = (arr, fnMap) => __min(arr, 0, arr.length, compareBy(fnMap)).item

const min = (arr) => __min(arr, 0, arr.length, compare).item


module.exports = {
	__min,
	minIndexWith,
	minIndexBy,
	minIndex,
	minWith,
	minBy,
	min,
}
