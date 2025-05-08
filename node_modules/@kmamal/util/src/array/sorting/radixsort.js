const {
	__countingsortDistribute,
} = require('./countingsort')
const { __copy } = require('../copy')
const { identity } = require('../../function/identity')

const _getByte = [
	(x) => x & 0xFF,
	(x) => (x & 0xFF00) >>> 8,
	(x) => (x & 0xFF0000) >>> 16,
	(x) => (x & 0xFF000000) >>> 24,
]

const _counts = [
	new Array(256),
	new Array(256),
	new Array(256),
	new Array(256),
]

const __radixsort = (arr, start, end, buffer, numBytes, fnMap) => {
	const length = end - start

	for (let i = 0; i < numBytes; i++) {
		_counts[i].fill(0)
	}

	for (let i = start; i < end; i++) {
		const item = arr[i]
		const value = fnMap(item)
		for (let j = 0; j < numBytes; j++) {
			const byteValue = _getByte[j](value)
			_counts[j][byteValue]++
		}
	}

	let src = arr
	let srcStart = start
	let dst = buffer
	let dstStart = 0

	let index = 0
	for (;;) {
		const getByte = _getByte[index]
		const fnMapByte = (x) => getByte(fnMap(x))

		const counts = _counts[index]
		const canSkip = counts[0] === length

		if (!canSkip) {
			__countingsortDistribute(dst, dstStart, src, srcStart, srcStart + length, counts, fnMapByte)
		}

		if (++index === numBytes) { return canSkip ? src : dst }

		if (!canSkip) {
			const tmp = src
			const tmpStart = srcStart
			src = dst
			srcStart = dstStart
			dst = tmp
			dstStart = tmpStart
		}
	}
}


const radixsortBy = (arr, fnMap) => {
	const { length } = arr
	if (length <= 1) { return Array.from(arr) }

	const res = Array.from(arr)
	const buffer = new Array(length)
	return __radixsort(res, 0, length, buffer, 4, fnMap)
}

const radixsortByTo = (dst, arr, fnMap) => {
	const { length } = arr
	if (length <= 1) { return Array.from(arr) }

	dst.length = length
	const buffer = Array.from(arr)
	const out = __radixsort(buffer, 0, length, dst, 4, fnMap)
	if (out === buffer) { __copy(dst, 0, buffer, 0, length) }
	return dst
}

const radixsortBy$$$ = (arr, fnMap) => {
	const { length } = arr
	if (length <= 1) { return arr }

	const buffer = new Array(length)
	const out = __radixsort(arr, 0, length, buffer, 4, fnMap)
	if (out === buffer) { __copy(arr, 0, buffer, 0, length) }
	return arr
}

radixsortBy.to = radixsortByTo
radixsortBy.$$$ = radixsortBy$$$


const radixsort = (arr) => {
	const { length } = arr
	if (length <= 1) { return Array.from(arr) }

	const res = Array.from(arr)
	const buffer = new Array(length)
	return __radixsort(res, 0, length, buffer, 4, identity)
}

const radixsortTo = (dst, arr) => {
	const { length } = arr
	if (length <= 1) { return arr }

	dst.length = length
	const buffer = Array.from(arr)
	const out = __radixsort(buffer, 0, length, dst, 4, identity)
	if (out === buffer) { __copy(dst, 0, buffer, 0, length) }
	return dst
}

const radixsort$$$ = (arr) => {
	const { length } = arr
	if (length <= 1) { return arr }

	const buffer = new Array(length)
	const out = __radixsort(arr, 0, length, buffer, 4, identity)
	if (out === buffer) { __copy(arr, 0, buffer, 0, length) }
	return arr
}

radixsort.$$$ = radixsort$$$


module.exports = {
	__radixsort,
	radixsortBy,
	radixsort,
}
