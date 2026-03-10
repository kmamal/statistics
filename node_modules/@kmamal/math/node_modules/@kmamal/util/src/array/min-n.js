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


const __minN = (dst, dstStart, src, srcStart, srcEnd, n, fnCmp) => {
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

	const fnCmpEntries = (a, b) => fnCmp(b.item, a.item)
	const dstEnd = dstStart + limit

	__heapify(dst, dstStart, dstEnd, fnCmpEntries)

	let topEntry = dst[dstStart]
	while (readIndex !== srcEnd) {
		const item = src[readIndex]
		if (fnCmp(item, topEntry.item) < 0) {
			topEntry.item = item
			topEntry.index = readIndex
			__bubbleDown(dst, dstStart, dstEnd, dstStart, fnCmpEntries)
			topEntry = dst[dstStart]
		}
		readIndex++
	}

	return writeIndex
}


const minNIndexWith$$$ = (arr, n, fnCmp) => {
	arr.length = __minN(arr, 0, arr, 0, arr.length, n, fnCmp)
	return map$$$(arr, getIndex)
}

const minNIndexWithTo = (dst, arr, _n, fnCmp) => {
	const { length } = arr
	const n = Math.min(length, _n)
	dst.length = n
	__minN(dst, 0, arr, 0, length, n, fnCmp)
	return map$$$(dst, getIndex)
}

const minNIndexWith = (arr, _n, fnCmp) => {
	const { length } = arr
	const n = Math.min(length, _n)
	const res = new Array(n)
	__minN(res, 0, arr, 0, length, n, fnCmp)
	return map$$$(res, getIndex)
}

minNIndexWith.$$$ = minNIndexWith$$$
minNIndexWith.to = minNIndexWithTo


const minNIndexBy$$$ = (arr, n, fnMap) => {
	arr.length = __minN(arr, 0, arr, 0, arr.length, n, compareBy(fnMap))
	return map$$$(arr, getIndex)
}

const minNIndexByTo = (dst, arr, _n, fnMap) => {
	const { length } = arr
	const n = Math.min(length, _n)
	dst.length = n
	__minN(dst, 0, arr, 0, length, n, compareBy(fnMap))
	return map$$$(dst, getIndex)
}

const minNIndexBy = (arr, _n, fnMap) => {
	const { length } = arr
	const n = Math.min(length, _n)
	const res = new Array(n)
	__minN(res, 0, arr, 0, length, n, compareBy(fnMap))
	return map$$$(res, getIndex)
}

minNIndexBy.$$$ = minNIndexBy$$$
minNIndexBy.to = minNIndexByTo


const minNIndex$$$ = (arr, n) => {
	arr.length = __minN(arr, 0, arr, 0, arr.length, n, compare)
	return map$$$(arr, getIndex)
}

const minNIndexTo = (dst, arr, _n) => {
	const { length } = arr
	const n = Math.min(length, _n)
	dst.length = n
	__minN(dst, 0, arr, 0, length, n, compare)
	return map$$$(dst, getIndex)
}

const minNIndex = (arr, _n) => {
	const { length } = arr
	const n = Math.min(length, _n)
	const res = new Array(n)
	__minN(res, 0, arr, 0, length, n, compare)
	return map$$$(res, getIndex)
}

minNIndex.$$$ = minNIndex$$$
minNIndex.to = minNIndexTo


const minNWith$$$ = (arr, n, fnCmp) => {
	arr.length = __minN(arr, 0, arr, 0, arr.length, n, fnCmp)
	return map$$$(arr, getItem)
}

const minNWithTo = (dst, arr, _n, fnCmp) => {
	const { length } = arr
	const n = Math.min(length, _n)
	dst.length = n
	__minN(dst, 0, arr, 0, length, n, fnCmp)
	return map$$$(dst, getItem)
}

const minNWith = (arr, _n, fnCmp) => {
	const { length } = arr
	const n = Math.min(length, _n)
	const res = new Array(n)
	__minN(res, 0, arr, 0, length, n, fnCmp)
	return map$$$(res, getItem)
}

minNWith.$$$ = minNWith$$$
minNWith.to = minNWithTo


const minNBy$$$ = (arr, n, fnMap) => {
	arr.length = __minN(arr, 0, arr, 0, arr.length, n, compareBy(fnMap))
	return map$$$(arr, getItem)
}

const minNByTo = (dst, arr, _n, fnMap) => {
	const { length } = arr
	const n = Math.min(length, _n)
	dst.length = n
	__minN(dst, 0, arr, 0, length, n, compareBy(fnMap))
	return map$$$(dst, getItem)
}

const minNBy = (arr, _n, fnMap) => {
	const { length } = arr
	const n = Math.min(length, _n)
	const res = new Array(n)
	__minN(res, 0, arr, 0, length, n, compareBy(fnMap))
	return map$$$(res, getItem)
}

minNBy.$$$ = minNBy$$$
minNBy.to = minNByTo


const minN$$$ = (arr, n) => {
	arr.length = __minN(arr, 0, arr, 0, arr.length, n, compare)
	return map$$$(arr, getItem)
}

const minNTo = (dst, arr, _n) => {
	const { length } = arr
	const n = Math.min(length, _n)
	dst.length = n
	__minN(dst, 0, arr, 0, length, n, compare)
	return map$$$(dst, getItem)
}

const minN = (arr, _n) => {
	const { length } = arr
	const n = Math.min(length, _n)
	const res = new Array(n)
	__minN(res, 0, arr, 0, length, n, compare)
	return map$$$(res, getItem)
}

minN.$$$ = minN$$$
minN.to = minNTo


module.exports = {
	__minN,
	minNIndexWith,
	minNIndexBy,
	minNIndex,
	minNWith,
	minNBy,
	minN,
}
