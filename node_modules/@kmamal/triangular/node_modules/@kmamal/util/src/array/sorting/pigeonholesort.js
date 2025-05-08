const { max } = require('../max')
const { clone } = require('../clone')
const { identity } = require('../../function/identity')

const __pigeonholesortInitBuckets = (maxValue) => {
	const length = maxValue + 1
	const buckets = new Array(length)
	for (let i = 0; i < length; i++) {
		buckets[i] = []
	}
	return buckets
}

const __pigeonholesort = (dst, dstStart, src, srcStart, srcEnd, buckets, fnMap) => {
	for (let i = srcStart; i < srcEnd; i++) {
		const item = src[i]
		const value = fnMap(item)
		buckets[value].push(item)
	}

	let writeIndex = dstStart
	for (const bucket of buckets) {
		for (const item of bucket) {
			dst[writeIndex++] = item
		}
	}
}


const pigeonholesortBy = (arr, fnMap, _maxValue) => {
	const { length } = arr
	if (length <= 1) { return clone(arr) }

	const maxValue = _maxValue ?? max(arr)
	const buckets = __pigeonholesortInitBuckets(maxValue)

	const res = new Array(length)
	__pigeonholesort(res, 0, arr, 0, length, buckets, fnMap)
	return res
}

const pigeonholesortByTo = (dst, arr, fnMap, _maxValue) => {
	const { length } = arr
	if (length <= 1) { return clone(arr) }

	const maxValue = _maxValue ?? max(arr)
	const buckets = __pigeonholesortInitBuckets(maxValue)

	dst.length = length
	__pigeonholesort(dst, 0, arr, 0, length, buckets, fnMap)
	return dst
}

const pigeonholesortBy$$$ = (arr, fnMap, _maxValue) => {
	const { length } = arr
	if (length <= 1) { return clone(arr) }

	const maxValue = _maxValue ?? max(arr)
	const buckets = __pigeonholesortInitBuckets(maxValue)

	__pigeonholesort(arr, 0, arr, 0, length, buckets, fnMap)
	return arr
}

pigeonholesortBy.to = pigeonholesortByTo
pigeonholesortBy.$$$ = pigeonholesortBy$$$


const pigeonholesort = (arr, _maxValue) => {
	const { length } = arr
	if (length <= 1) { return clone(arr) }

	const maxValue = _maxValue ?? max(arr)
	const buckets = __pigeonholesortInitBuckets(maxValue)
	const res = new Array(length)
	__pigeonholesort(res, 0, arr, 0, length, buckets, identity)
	return res
}

const pigeonholesortTo = (dst, arr, _maxValue) => {
	const { length } = arr
	if (length <= 1) { return clone(arr) }

	const maxValue = _maxValue ?? max(arr)
	const buckets = __pigeonholesortInitBuckets(maxValue)

	dst.length = length
	__pigeonholesort(dst, 0, arr, 0, length, buckets, identity)
	return dst
}

const pigeonholesort$$$ = (arr, _maxValue) => {
	const { length } = arr
	if (length <= 1) { return clone(arr) }

	const maxValue = _maxValue ?? max(arr)
	const buckets = __pigeonholesortInitBuckets(maxValue)
	__pigeonholesort(arr, 0, arr, 0, length, buckets, identity)
	return arr
}

pigeonholesort.to = pigeonholesortTo
pigeonholesort.$$$ = pigeonholesort$$$


module.exports = {
	__pigeonholesort,
	pigeonholesortBy,
	pigeonholesort,
}
