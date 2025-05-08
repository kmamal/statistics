const { __binarySearch } = require('../searching/binary')
const { compare, compareBy, strictGreater } = require('../../function/compare')
const { __copy } = require('../copy')

const __binsertionsort = (arr, start, sortedEnd, end, fnCmp) => {
	const fnCmpGt = strictGreater(fnCmp)
	for (let i = sortedEnd; i < end; i++) {
		const item = arr[i]
		const position = __binarySearch(arr, start, i, item, fnCmpGt)
		for (let j = i; j > position; j--) {
			arr[j] = arr[j - 1]
		}
		arr[position] = item
	}
}

const binsertionsortWith = (arr, fnCmp) => {
	const res = Array.from(arr)
	__binsertionsort(res, 0, 1, arr.length, fnCmp)
	return res
}

const binsertionsortWithTo = (dst, arr, fnCmp) => {
	const { length } = arr
	dst.length = length
	__copy(dst, 0, arr, 0, length)
	__binsertionsort(dst, 0, 1, length, fnCmp)
	return arr
}

const binsertionsortWith$$$ = (arr, fnCmp) => {
	__binsertionsort(arr, 0, 1, arr.length, fnCmp)
	return arr
}

binsertionsortWith.to = binsertionsortWithTo
binsertionsortWith.$$$ = binsertionsortWith$$$


const binsertionsortBy = (arr, fnMap) => {
	const res = Array.from(arr)
	__binsertionsort(res, 0, 1, arr.length, compareBy(fnMap))
	return res
}

const binsertionsortByTo = (dst, arr, fnMap) => {
	const { length } = arr
	dst.length = length
	__copy(dst, 0, arr, 0, length)
	__binsertionsort(dst, 0, 1, length, compareBy(fnMap))
	return arr
}

const binsertionsortBy$$$ = (arr, fnMap) => {
	__binsertionsort(arr, 0, 1, arr.length, compareBy(fnMap))
	return arr
}

binsertionsortBy.to = binsertionsortByTo
binsertionsortBy.$$$ = binsertionsortBy$$$


const binsertionsort = (arr) => {
	const res = Array.from(arr)
	__binsertionsort(res, 0, 1, arr.length, compare)
	return res
}

const binsertionsortTo = (dst, arr) => {
	const { length } = arr
	dst.length = length
	__copy(dst, 0, arr, 0, length)
	__binsertionsort(dst, 0, 1, length, compare)
	return arr
}

const binsertionsort$$$ = (arr) => {
	__binsertionsort(arr, 0, 1, arr.length, compare)
	return arr
}

binsertionsort.to = binsertionsortTo
binsertionsort.$$$ = binsertionsort$$$


module.exports = {
	__binsertionsort,
	binsertionsortWith,
	binsertionsortBy,
	binsertionsort,
}
