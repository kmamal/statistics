const { compare, compareBy } = require('../../function/compare')
const { clone } = require('../clone')
const { __copy } = require('../copy')

const __insertionsort = (arr, start, sortedEnd, end, fnCmp) => {
	for (let i = sortedEnd; i < end; i++) {
		const item = arr[i]
		let lastJ = i
		for (let j = lastJ - 1; j >= start; j--) {
			const current = arr[j]
			if (fnCmp(current, item) <= 0) { break }
			arr[lastJ] = current
			lastJ = j
		}
		arr[lastJ] = item
	}
}


const insertionsortWith = (arr, fnCmp) => {
	const res = clone(arr)
	__insertionsort(res, 0, 1, arr.length, fnCmp)
	return res
}

const insertionsortWithTo = (dst, arr, fnCmp) => {
	const { length } = arr
	dst.length = length
	__copy(dst, 0, arr, 0, length)
	__insertionsort(dst, 0, 1, arr.length, fnCmp)
	return dst
}

const insertionsortWith$$$ = (arr, fnCmp) => {
	__insertionsort(arr, 0, 1, arr.length, fnCmp)
	return arr
}

insertionsortWith.to = insertionsortWithTo
insertionsortWith.$$$ = insertionsortWith$$$


const insertionsortBy = (arr, fnMap) => {
	const res = clone(arr)
	__insertionsort(res, 0, 1, arr.length, compareBy(fnMap))
	return res
}

const insertionsortByTo = (dst, arr, fnMap) => {
	const { length } = arr
	dst.length = length
	__copy(dst, 0, arr, 0, length)
	__insertionsort(dst, 0, 1, arr.length, compareBy(fnMap))
	return dst
}

const insertionsortBy$$$ = (arr, fnMap) => {
	__insertionsort(arr, 0, 1, arr.length, compareBy(fnMap))
	return arr
}

insertionsortBy.to = insertionsortByTo
insertionsortBy.$$$ = insertionsortBy$$$


const insertionsort = (arr) => {
	const res = clone(arr)
	__insertionsort(res, 0, 1, arr.length, compare)
	return res
}

const insertionsortTo = (dst, arr) => {
	const { length } = arr
	dst.length = length
	__copy(dst, 0, arr, 0, length)
	__insertionsort(dst, 0, 1, arr.length, compare)
	return dst
}

const insertionsort$$$ = (arr) => {
	__insertionsort(arr, 0, 1, arr.length, compare)
	return arr
}

insertionsort.to = insertionsortTo
insertionsort.$$$ = insertionsort$$$


module.exports = {
	__insertionsort,
	insertionsortWith,
	insertionsortBy,
	insertionsort,
}
