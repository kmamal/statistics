const { __selectPivotMedianOfThree } = require('./select-pivot-median-of-three')
const { __partitionLeftRight } = require('./partition-left-right')
const { __insertionsort } = require('../insertionsort')
const { compare, compareBy } = require('../../../function/compare')
const { clone } = require('../../clone')
const { __copy } = require('../../copy')

const INSERTION_SORT_CUTOFF = 16

const __quicksort = (arr, _start, _end, fnCmp, sizeCutoff, depthCutoff, takeover) => {
	const stack = [ { start: _start, end: _end, depth: 0 } ]
	for (;;) {
		const item = stack.pop()
		if (!item) { break }

		const { start, end, depth } = item

		const length = end - start
		if (length <= 1) { continue }
		if (length <= sizeCutoff || depth === depthCutoff) {
			takeover(arr, start, start + 1, end, fnCmp)
			continue
		}

		const pivot = __selectPivotMedianOfThree(arr, start, end, fnCmp)
		const { left, right } = __partitionLeftRight(arr, start, end, pivot, fnCmp)

		stack.push({ start, end: left, depth: depth + 1 })
		stack.push({ start: right, end, depth: depth + 1 })
	}
}


const quicksortWith = (arr, fnCmp) => {
	const res = clone(arr)
	__quicksort(res, 0, res.length, fnCmp, INSERTION_SORT_CUTOFF, Infinity, __insertionsort)
	return res
}

const quicksortWithTo = (dst, arr, fnCmp) => {
	const { length } = arr
	dst.length = length
	__copy(dst, 0, arr, 0, length)
	__quicksort(dst, 0, length, fnCmp, INSERTION_SORT_CUTOFF, Infinity, __insertionsort)
	return dst
}

const quicksortWith$$$ = (arr, fnCmp) => {
	__quicksort(arr, 0, arr.length, fnCmp, INSERTION_SORT_CUTOFF, Infinity, __insertionsort)
	return arr
}

quicksortWith.to = quicksortWithTo
quicksortWith.$$$ = quicksortWith$$$


const quicksortBy = (arr, fnMap) => {
	const res = clone(arr)
	__quicksort(res, 0, res.length, compareBy(fnMap), INSERTION_SORT_CUTOFF, Infinity, __insertionsort)
	return res
}

const quicksortByTo = (dst, arr, fnMap) => {
	const { length } = arr
	dst.length = length
	__copy(dst, 0, arr, 0, length)
	__quicksort(dst, 0, length, compareBy(fnMap), INSERTION_SORT_CUTOFF, Infinity, __insertionsort)
	return dst
}

const quicksortBy$$$ = (arr, fnMap) => {
	__quicksort(arr, 0, arr.length, compareBy(fnMap), INSERTION_SORT_CUTOFF, Infinity, __insertionsort)
	return arr
}

quicksortBy.to = quicksortByTo
quicksortBy.$$$ = quicksortBy$$$


const quicksort = (arr) => {
	const res = clone(arr)
	__quicksort(res, 0, res.length, compare, INSERTION_SORT_CUTOFF, Infinity, __insertionsort)
	return res
}

const quicksortTo = (dst, arr) => {
	const { length } = arr
	dst.length = length
	__copy(dst, 0, arr, 0, length)
	__quicksort(dst, 0, length, compare, INSERTION_SORT_CUTOFF, Infinity, __insertionsort)
	return dst
}

const quicksort$$$ = (arr) => {
	__quicksort(arr, 0, arr.length, compare, INSERTION_SORT_CUTOFF, Infinity, __insertionsort)
	return arr
}

quicksort.to = quicksortTo
quicksort.$$$ = quicksort$$$


module.exports = {
	__quicksort,
	quicksortWith,
	quicksortBy,
	quicksort,
}
