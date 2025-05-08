const { __mergeInplace } = require('../merge')
const { __insertionsort } = require('./insertionsort')
const { compare, compareBy } = require('../../function/compare')
const { __copy } = require('../copy')

const INSERTION_SORT_CUTOFF = 16

const buffer = []

const __recurse = (arr, start, end, fnCmp, cutoff, takeover) => {
	const length = end - start
	if (length <= 1) { return }
	if (length <= cutoff) {
		takeover(arr, start, start + 1, end, fnCmp)
		return
	}

	const mid = start + Math.floor(length / 2)
	__recurse(arr, start, mid, fnCmp, cutoff, takeover)
	__recurse(arr, mid, end, fnCmp, cutoff, takeover)
	__mergeInplace(arr, start, mid, end, buffer, fnCmp)
}

const __mergesort = (arr, start, end, fnCmp, cutoff, takeover) => {
	buffer.length = Math.max(buffer.length, Math.floor((end - start) / 2))
	__recurse(arr, start, end, fnCmp, cutoff, takeover)
}


const mergesortWith = (arr, fnCmp) => {
	const res = Array.from(arr)
	__mergesort(res, 0, arr.length, fnCmp, INSERTION_SORT_CUTOFF, __insertionsort)
	return res
}

const mergesortWithTo = (dst, arr, fnCmp) => {
	const { length } = arr
	dst.length = length
	__copy(dst, 0, arr, 0, length)
	__mergesort(dst, 0, length, fnCmp, INSERTION_SORT_CUTOFF, __insertionsort)
	return dst
}

const mergesortWith$$$ = (arr, fnCmp) => {
	__mergesort(arr, 0, arr.length, fnCmp, INSERTION_SORT_CUTOFF, __insertionsort)
	return arr
}

mergesortWith.to = mergesortWithTo
mergesortWith.$$$ = mergesortWith$$$


const mergesortBy = (arr, fnMap) => {
	const res = Array.from(arr)
	__mergesort(res, 0, arr.length, compareBy(fnMap), INSERTION_SORT_CUTOFF, __insertionsort)
	return res
}

const mergesortByTo = (dst, arr, fnMap) => {
	const { length } = arr
	dst.length = length
	__copy(dst, 0, arr, 0, length)
	__mergesort(dst, 0, length, compareBy(fnMap), INSERTION_SORT_CUTOFF, __insertionsort)
	return dst
}

const mergesortBy$$$ = (arr, fnMap) => {
	__mergesort(arr, 0, arr.length, compareBy(fnMap), INSERTION_SORT_CUTOFF, __insertionsort)
	return arr
}

mergesortBy.to = mergesortByTo
mergesortBy.$$$ = mergesortBy$$$


const mergesort = (arr) => {
	const res = Array.from(arr)
	__mergesort(res, 0, arr.length, compare, INSERTION_SORT_CUTOFF, __insertionsort)
	return res
}

const mergesortTo = (dst, arr) => {
	const { length } = arr
	dst.length = length
	__copy(dst, 0, arr, 0, length)
	__mergesort(dst, 0, length, compare, INSERTION_SORT_CUTOFF, __insertionsort)
	return dst
}

const mergesort$$$ = (arr) => {
	__mergesort(arr, 0, arr.length, compare, INSERTION_SORT_CUTOFF, __insertionsort)
	return arr
}

mergesort.to = mergesortTo
mergesort.$$$ = mergesort$$$


module.exports = {
	__mergesort,
	mergesortWith,
	mergesortBy,
	mergesort,
}
