const { compare } = require('../../function/compare')

const __binarySearch = (arr, start, end, x, fnCmp) => {
	let low = start
	let high = end
	for (;;) {
		if (high <= low) { return low }
		const mid = Math.floor((high + low) / 2)
		const value = arr[mid]
		const cmp = fnCmp(x, value)
		if (cmp === 0) { return mid }
		cmp < 0 ? high = mid : low = mid + 1
	}
}

const __binarySearchFirst = (arr, start, end, x, fnCmp) => {
	let low = start
	let high = end
	for (;;) {
		if (high <= low) { return low }
		const mid = Math.floor((high + low) / 2)
		const value = arr[mid]
		const cmp = fnCmp(x, value)
		cmp <= 0 ? high = mid : low = mid + 1
	}
}

const __binarySearchLast = (arr, start, end, x, fnCmp) => {
	let low = start
	let high = end
	for (;;) {
		if (high <= low) { return low }
		const mid = Math.floor((high + low) / 2)
		const value = arr[mid]
		const cmp = fnCmp(x, value)
		cmp < 0 ? high = mid : low = mid + 1
	}
}

const binarySearchWith = (arr, x, fnCmp) => __binarySearch(arr, 0, arr.length, x, fnCmp)
const binarySearchFirstWith = (arr, x, fnCmp) => __binarySearchFirst(arr, 0, arr.length, x, fnCmp)
const binarySearchLastWith = (arr, x, fnCmp) => __binarySearchLast(arr, 0, arr.length, x, fnCmp)

const binarySearchBy = (arr, x, fnMap) => {
	// HACK: The first argument to compare is always x
	const xValue = fnMap(x)
	return binarySearchWith(arr, x, (a, b) => compare(xValue, fnMap(b)))
}
const binarySearchFirstBy = (arr, x, fnMap) => {
	// HACK: The first argument to compare is always x
	const xValue = fnMap(x)
	return binarySearchFirstWith(arr, x, (a, b) => compare(xValue, fnMap(b)))
}
const binarySearchLastBy = (arr, x, fnMap) => {
	// HACK: The first argument to compare is always x
	const xValue = fnMap(x)
	return binarySearchLastWith(arr, x, (a, b) => compare(xValue, fnMap(b)))
}

const binarySearch = (arr, x) => binarySearchWith(arr, x, compare)
const binarySearchFirst = (arr, x) => binarySearchFirstWith(arr, x, compare)
const binarySearchLast = (arr, x) => binarySearchLastWith(arr, x, compare)

module.exports = {
	__binarySearch,
	__binarySearchFirst,
	__binarySearchLast,
	binarySearchWith,
	binarySearchFirstWith,
	binarySearchLastWith,
	binarySearchBy,
	binarySearchFirstBy,
	binarySearchLastBy,
	binarySearch,
	binarySearchFirst,
	binarySearchLast,
}
