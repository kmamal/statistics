const { prefixSums } = require('../prefix-sums')
const { identity } = require('../../function/identity')
const { copy } = require('../copy')
const { max } = require('../max')

const prefixSums$$$ = prefixSums.$$$
const copy$$$ = copy.$$$


const __countingsortInitCounts = (maxValue) => new Array(maxValue + 1).fill(0)

const __countingsortCount = (arr, start, end, counts, fnMap) => {
	for (let i = start; i < end; i++) {
		const item = arr[i]
		const value = fnMap(item)
		counts[value]++
	}
}

const __countingsortAssign = (arr, start, counts) => {
	let writeIndex = start
	const { length } = counts
	for (let i = 0; i < length; i++) {
		const count = counts[i]
		for (let j = 0; j < count; j++) {
			arr[writeIndex++] = i
		}
	}
}

const __countingsortDistribute = (dst, dstStart, src, srcStart, srcEnd, counts, fnMap) => {
	prefixSums$$$(counts)

	for (let i = srcEnd - 1; i >= srcStart; i--) {
		const item = src[i]
		const value = fnMap(item)
		const offset = --counts[value]
		dst[dstStart + offset] = item
	}
}


const countingsortBy = (arr, fnMap, _maxValue) => {
	const { length } = arr
	if (length <= 1) { return Array.from(arr) }

	const maxValue = _maxValue ?? max(arr)
	const counts = __countingsortInitCounts(maxValue)
	__countingsortCount(arr, 0, length, counts, fnMap)

	const res = new Array(length)
	__countingsortDistribute(res, 0, arr, 0, length, counts)
	return res
}

const countingsortByTo = (dst, arr, fnMap, _maxValue) => {
	const { length } = arr
	if (length <= 1) { return Array.from(arr) }

	const maxValue = _maxValue ?? max(arr)
	const counts = __countingsortInitCounts(maxValue)
	__countingsortCount(arr, 0, length, counts, fnMap)

	dst.length = length
	__countingsortDistribute(dst, 0, arr, 0, length, counts)
	return dst
}

const countingsortBy$$$ = (arr, fnMap, _maxValue) => {
	const { length } = arr
	if (length <= 1) { return arr }

	const maxValue = _maxValue ?? max(arr)
	const counts = __countingsortInitCounts(maxValue)
	__countingsortCount(arr, 0, length, counts, fnMap)

	const res = new Array(length)
	__countingsortDistribute(res, 0, arr, 0, length, counts)
	copy$$$(arr, res)
	return arr
}

countingsortBy.to = countingsortByTo
countingsortBy.$$$ = countingsortBy$$$


const countingsort = (arr, _maxValue) => {
	const { length } = arr
	if (length <= 1) { return Array.from(arr) }

	const maxValue = _maxValue ?? max(arr)
	const counts = __countingsortInitCounts(maxValue)
	__countingsortCount(arr, 0, length, counts, identity)

	const res = new Array(length)
	__countingsortAssign(res, 0, counts)
	return res
}

const countingsortTo = (dst, arr, _maxValue) => {
	const { length } = arr
	if (length <= 1) { return Array.from(arr) }

	const maxValue = _maxValue ?? max(arr)
	const counts = __countingsortInitCounts(maxValue)
	__countingsortCount(arr, 0, length, counts, identity)

	dst.length = length
	__countingsortAssign(dst, 0, counts)
	return dst
}

const countingsort$$$ = (arr, _maxValue) => {
	const { length } = arr
	if (length <= 1) { return arr }

	const maxValue = _maxValue ?? max(arr)
	const counts = __countingsortInitCounts(maxValue)
	__countingsortCount(arr, 0, length, counts, identity)
	__countingsortAssign(arr, 0, counts)
	return arr
}

countingsort.to = countingsortTo
countingsort.$$$ = countingsort$$$


module.exports = {
	__countingsortInitCounts,
	__countingsortCount,
	__countingsortAssign,
	__countingsortDistribute,
	countingsortBy,
	countingsort,
}
