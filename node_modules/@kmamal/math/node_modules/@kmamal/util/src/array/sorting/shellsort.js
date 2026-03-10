const { compare, compareBy } = require('../../function/compare')
const { clone } = require('../clone')
const { __copy } = require('../copy')

// Marcin Ciura's gap sequence
const GAPS = [ 1750, 701, 301, 132, 57, 23, 10, 4, 1 ]
const NUM_GAPS = GAPS.length

const __shellsort = (arr, start, sortedEnd, end, fnCmp) => {
	for (let g = 0; g < NUM_GAPS; g++) {
		const gap = GAPS[g]

		for (let i = sortedEnd + gap - 1; i < end; i++) {
			const item = arr[i]
			let lastJ = i
			let j = lastJ - gap
			while (j >= start) {
				const current = arr[j]
				if (fnCmp(current, item) <= 0) { break }
				arr[lastJ] = current
				lastJ = j
				j -= gap
			}
			arr[lastJ] = item
		}
	}
}


const shellsortWith = (arr, fnCmp) => {
	const res = clone(arr)
	__shellsort(res, 0, 1, arr.length, fnCmp)
	return res
}

const shellsortWithTo = (dst, arr, fnCmp) => {
	const { length } = arr
	dst.length = length
	__copy(dst, 0, arr, 0, length)
	__shellsort(dst, 0, 1, length, fnCmp)
	return dst
}

const shellsortWith$$$ = (arr, fnCmp) => {
	__shellsort(arr, 0, 1, arr.length, fnCmp)
	return arr
}

shellsortWith.to = shellsortWithTo
shellsortWith.$$$ = shellsortWith$$$


const shellsortBy = (arr, fnMap) => {
	const res = clone(arr)
	__shellsort(res, 0, 1, arr.length, compareBy(fnMap))
	return res
}

const shellsortByTo = (dst, arr, fnMap) => {
	const { length } = arr
	dst.length = length
	__copy(dst, 0, arr, 0, length)
	__shellsort(dst, 0, 1, length, compareBy(fnMap))
	return dst
}

const shellsortBy$$$ = (arr, fnMap) => {
	__shellsort(arr, 0, 1, arr.length, compareBy(fnMap))
	return arr
}

shellsortBy.to = shellsortByTo
shellsortBy.$$$ = shellsortBy$$$


const shellsort = (arr) => {
	const res = clone(arr)
	__shellsort(res, 0, 1, arr.length, compare)
	return res
}

const shellsortTo = (dst, arr) => {
	const { length } = arr
	dst.length = length
	__copy(dst, 0, arr, 0, length)
	__shellsort(dst, 0, 1, length, compare)
	return dst
}

const shellsort$$$ = (arr) => {
	__shellsort(arr, 0, 1, arr.length, compare)
	return arr
}

shellsort.to = shellsortTo
shellsort.$$$ = shellsort$$$


module.exports = {
	__shellsort,
	shellsortWith,
	shellsortBy,
	shellsort,
}
