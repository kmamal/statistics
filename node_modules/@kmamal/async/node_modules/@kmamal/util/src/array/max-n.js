const { compare, compareBy } = require('../function/compare')
const { __heapify, __bubbleDown } = require('@kmamal/heap')

const { map } = require('./map')
const map$$$ = map.$$$


const _cache = [
	{ item: null, index: -1 },
	{ item: null, index: -1 },
	{ item: null, index: -1 },
]

const getIndex = (x) => x.index
const getItem = (x) => x.item


const __maxN = (dst, dstStart, src, srcStart, srcEnd, n, fnCmp) => {
	const length = srcEnd - srcStart
	if (length <= 0) { return 0 }

	const limit = Math.min(length, n)

	{
		const numMissingEntries = limit - _cache.length
		for (let i = 0; i < numMissingEntries; i++) {
			_cache.push({ item: null, index: -1 })
		}
	}

	let readIndex = srcStart
	let writeIndex = dstStart
	for (let i = 0; i < limit; i++) {
		const entry = _cache[i]
		entry.index = readIndex
		entry.item = src[readIndex++]
		dst[writeIndex++] = entry
	}

	if (limit === length) { return writeIndex }

	const fnCmpEntries = (a, b) => fnCmp(a.item, b.item)
	const dstEnd = dstStart + limit

	__heapify(dst, dstStart, dstEnd, fnCmpEntries)

	let topEntry = dst[dstStart]
	while (readIndex !== srcEnd) {
		const item = src[readIndex]
		if (fnCmp(item, topEntry.item) > 0) {
			topEntry.item = item
			topEntry.index = readIndex
			__bubbleDown(dst, dstStart, dstEnd, dstStart, fnCmpEntries)
			topEntry = dst[dstStart]
		}
		readIndex++
	}

	return writeIndex
}


const maxNIndexWith$$$ = (arr, n, fnCmp) => {
	arr.length = __maxN(arr, 0, arr, 0, arr.length, n, fnCmp)
	return map$$$(arr, getIndex)
}

const maxNIndexWithTo = (dst, arr, _n, fnCmp) => {
	const { length } = arr
	const n = Math.min(length, _n)
	dst.length = n
	__maxN(dst, 0, arr, 0, length, n, fnCmp)
	return map$$$(dst, getIndex)
}

const maxNIndexWith = (arr, _n, fnCmp) => {
	const { length } = arr
	const n = Math.min(length, _n)
	const res = new Array(n)
	__maxN(res, 0, arr, 0, length, n, fnCmp)
	return map$$$(res, getIndex)
}

maxNIndexWith.$$$ = maxNIndexWith$$$
maxNIndexWith.to = maxNIndexWithTo


const maxNIndexBy$$$ = (arr, n, fnMap) => {
	arr.length = __maxN(arr, 0, arr, 0, arr.length, n, compareBy(fnMap))
	return map$$$(arr, getIndex)
}

const maxNIndexByTo = (dst, arr, _n, fnMap) => {
	const { length } = arr
	const n = Math.min(length, _n)
	dst.length = n
	__maxN(dst, 0, arr, 0, length, n, compareBy(fnMap))
	return map$$$(dst, getIndex)
}

const maxNIndexBy = (arr, _n, fnMap) => {
	const { length } = arr
	const n = Math.min(length, _n)
	const res = new Array(n)
	__maxN(res, 0, arr, 0, length, n, compareBy(fnMap))
	return map$$$(res, getIndex)
}

maxNIndexBy.$$$ = maxNIndexBy$$$
maxNIndexBy.to = maxNIndexByTo


const maxNIndex$$$ = (arr, n) => {
	arr.length = __maxN(arr, 0, arr, 0, arr.length, n, compare)
	return map$$$(arr, getIndex)
}

const maxNIndexTo = (dst, arr, _n) => {
	const { length } = arr
	const n = Math.min(length, _n)
	dst.length = n
	__maxN(dst, 0, arr, 0, length, n, compare)
	return map$$$(dst, getIndex)
}

const maxNIndex = (arr, _n) => {
	const { length } = arr
	const n = Math.min(length, _n)
	const res = new Array(n)
	__maxN(res, 0, arr, 0, length, n, compare)
	return map$$$(res, getIndex)
}

maxNIndex.$$$ = maxNIndex$$$
maxNIndex.to = maxNIndexTo


const maxNWith$$$ = (arr, n, fnCmp) => {
	arr.length = __maxN(arr, 0, arr, 0, arr.length, n, fnCmp)
	return map$$$(arr, getItem)
}

const maxNWithTo = (dst, arr, _n, fnCmp) => {
	const { length } = arr
	const n = Math.min(length, _n)
	dst.length = n
	__maxN(dst, 0, arr, 0, length, n, fnCmp)
	return map$$$(dst, getItem)
}

const maxNWith = (arr, _n, fnCmp) => {
	const { length } = arr
	const n = Math.min(length, _n)
	const res = new Array(n)
	__maxN(res, 0, arr, 0, length, n, fnCmp)
	return map$$$(res, getItem)
}

maxNWith.$$$ = maxNWith$$$
maxNWith.to = maxNWithTo


const maxNBy$$$ = (arr, n, fnMap) => {
	arr.length = __maxN(arr, 0, arr, 0, arr.length, n, compareBy(fnMap))
	return map$$$(arr, getItem)
}

const maxNByTo = (dst, arr, _n, fnMap) => {
	const { length } = arr
	const n = Math.min(length, _n)
	dst.length = n
	__maxN(dst, 0, arr, 0, length, n, compareBy(fnMap))
	return map$$$(dst, getItem)
}

const maxNBy = (arr, _n, fnMap) => {
	const { length } = arr
	const n = Math.min(length, _n)
	const res = new Array(n)
	__maxN(res, 0, arr, 0, length, n, compareBy(fnMap))
	return map$$$(res, getItem)
}

maxNBy.$$$ = maxNBy$$$
maxNBy.to = maxNByTo


const maxN$$$ = (arr, n) => {
	arr.length = __maxN(arr, 0, arr, 0, arr.length, n, compare)
	return map$$$(arr, getItem)
}

const maxNTo = (dst, arr, _n) => {
	const { length } = arr
	const n = Math.min(length, _n)
	dst.length = n
	__maxN(dst, 0, arr, 0, length, n, compare)
	return map$$$(dst, getItem)
}

const maxN = (arr, _n) => {
	const { length } = arr
	const n = Math.min(length, _n)
	const res = new Array(n)
	__maxN(res, 0, arr, 0, length, n, compare)
	return map$$$(res, getItem)
}

maxN.$$$ = maxN$$$
maxN.to = maxNTo


module.exports = {
	__maxN,
	maxNIndexWith,
	maxNIndexBy,
	maxNIndex,
	maxNWith,
	maxNBy,
	maxN,
}
