const { __quicksort } = require('./quicksort')
const { __heapsort } = require('./heapsort')
const { __insertionsort } = require('./insertionsort')
const { compare, compareBy } = require('../../function/compare')
const { clone } = require('../clone')
const { __copy } = require('../copy')

const INSERTION_SORT_CUTOFF = 16

const takeover = (arr, start, sortedEnd, end, fnCmp) => end - start <= INSERTION_SORT_CUTOFF
	? __insertionsort(arr, start, sortedEnd, end, fnCmp)
	: __heapsort(arr, start, end, fnCmp)

const __introsort = (arr, start, end, fnCmp) => {
	const heapsortCutoff = 2 * Math.log(end - start)
	__quicksort(arr, start, end, fnCmp, INSERTION_SORT_CUTOFF, heapsortCutoff, takeover)
}


const introsortWith = (arr, fnCmp) => {
	const res = clone(arr)
	__introsort(res, 0, arr.length, fnCmp)
	return res
}

const introsortWithTo = (dst, arr, fnCmp) => {
	const { length } = arr
	dst.length = length
	__copy(dst, 0, arr, 0, length)
	__introsort(dst, 0, length, fnCmp)
	return dst
}

const introsortWith$$$ = (arr, fnCmp) => {
	__introsort(arr, 0, arr.length, fnCmp)
	return arr
}

introsortWith.to = introsortWithTo
introsortWith.$$$ = introsortWith$$$


const introsortBy = (arr, fnMap) => {
	const res = clone(arr)
	__introsort(res, 0, arr.length, compareBy(fnMap))
	return res
}

const introsortByTo = (dst, arr, fnMap) => {
	const { length } = arr
	dst.length = length
	__copy(dst, 0, arr, 0, length)
	__introsort(dst, 0, length, compareBy(fnMap))
	return dst
}

const introsortBy$$$ = (arr, fnMap) => {
	__introsort(arr, 0, arr.length, compareBy(fnMap))
	return arr
}

introsortBy.to = introsortByTo
introsortBy.$$$ = introsortBy$$$


const introsort = (arr) => {
	const res = clone(arr)
	__introsort(res, 0, arr.length, compare)
	return res
}

const introsortTo = (dst, arr) => {
	const { length } = arr
	dst.length = length
	__copy(dst, 0, arr, 0, length)
	__introsort(dst, 0, length, compare)
	return dst
}

const introsort$$$ = (arr) => {
	__introsort(arr, 0, arr.length, compare)
	return arr
}

introsort.to = introsortTo
introsort.$$$ = introsort$$$


module.exports = {
	__introsort,
	introsortWith,
	introsortBy,
	introsort,
}
