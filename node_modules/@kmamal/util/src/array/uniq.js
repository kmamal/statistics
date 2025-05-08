const { __includes } = require('./includes')
const { __copy } = require('./copy')
const { compare, compareBy } = require('../function/compare')

const __uniq = (dst, dstStart, src, srcStart, srcEnd, fnEq) => {
	const n = srcEnd - srcStart
	if (n <= 0) { return 0 }

	let writeIndex = dstStart

	let item = src[srcStart]
	dst[writeIndex++] = item

	for (let i = 1; i < n; i++) {
		item = src[srcStart + i]
		const exists = __includes(dst, dstStart, writeIndex, item, fnEq)
		if (exists) { continue }
		dst[writeIndex++] = item
	}

	return writeIndex - dstStart
}

const __uniqBy = (dst, dstStart, src, srcStart, srcEnd, fnMap) => {
	const n = srcEnd - srcStart
	if (n <= 0) { return 0 }

	let writeIndex = dstStart
	const first = src[srcStart]
	dst[writeIndex++] = first

	const set = new Set([ fnMap(first) ])
	let size = 1
	for (let i = 0; i < n; i++) {
		const item = src[srcStart + i]
		const mapped = fnMap(item)
		set.add(mapped)
		if (set.size === size) { continue }
		size = set.size
		dst[writeIndex++] = item
	}

	return writeIndex - dstStart
}

const __uniqSorted = (dst, dstStart, src, srcStart, srcEnd, fnCmp) => {
	const n = srcEnd - srcStart
	if (n <= 0) { return 0 }

	let writeIndex = dstStart

	let item = src[dstStart]
	dst[writeIndex++] = item
	let prev = item

	for (let i = 1; i < n; i++) {
		item = src[srcStart + i]
		if (fnCmp(item, prev) === 0) { continue }
		dst[writeIndex++] = item
		prev = item
	}

	return writeIndex - dstStart
}


const uniqWith = (arr, fnEq) => {
	const res = []
	__uniq(res, 0, arr, 0, arr.length, fnEq)
	return res
}

const uniqWithTo = (dst, arr, fnEq) => {
	const n = __uniq(dst, 0, arr, 0, arr.length, fnEq)
	dst.length = n
	return dst
}

const uniqWith$$$ = (arr, fnEq) => {
	const n = __uniq(arr, 0, arr, 0, arr.length, fnEq)
	arr.length = n
	return arr
}

uniqWith.to = uniqWithTo
uniqWith.$$$ = uniqWith$$$


const uniqBy = (arr, fnMap) => {
	const { length } = arr
	const res = new Array(length)
	const n = __uniqBy(res, 0, arr, 0, length, fnMap)
	res.length = n
	return res
}

const uniqByTo = (dst, arr, fnMap) => {
	const n = __uniqBy(dst, 0, arr, 0, arr.length, fnMap)
	dst.length = n
	return dst
}

const uniqBy$$$ = (arr, fnMap) => {
	const n = __uniqBy(arr, 0, arr, 0, arr.length, fnMap)
	arr.length = n
	return arr
}

uniqBy.to = uniqByTo
uniqBy.$$$ = uniqBy$$$


const uniq = (arr) => Array.from(new Set(arr))

const uniqTo = (dst, arr) => {
	const res = Array.from(new Set(arr))
	const { length } = res
	dst.length = length
	__copy(dst, 0, res, 0, length)
	return dst
}

const uniq$$$ = (arr) => {
	const res = Array.from(new Set(arr))
	const { length } = res
	arr.length = length
	__copy(arr, 0, res, 0, length)
	return arr
}

uniq.to = uniqTo
uniq.$$$ = uniq$$$


const uniqWithSorted = (arr, fnCmp) => {
	const res = []
	__uniqSorted(res, 0, arr, 0, arr.length, fnCmp)
	return res
}

const uniqWithSortedTo = (dst, arr, fnCmp) => {
	const n = __uniqSorted(dst, 0, arr, 0, arr.length, fnCmp)
	dst.length = n
	return dst
}

const uniqWithSorted$$$ = (arr, fnCmp) => {
	const n = __uniqSorted(arr, 0, arr, 0, arr.length, fnCmp)
	arr.length = n
	return arr
}

uniqWithSorted.to = uniqWithSortedTo
uniqWithSorted.$$$ = uniqWithSorted$$$


const uniqBySorted = (arr, fnMap) => {
	const res = []
	__uniqSorted(res, 0, arr, 0, arr.length, compareBy(fnMap))
	return res
}

const uniqBySortedTo = (dst, arr, fnMap) => {
	const n = __uniqSorted(dst, 0, arr, 0, arr.length, compareBy(fnMap))
	dst.length = n
	return dst
}

const uniqBySorted$$$ = (arr, fnMap) => {
	const n = __uniqSorted(arr, 0, arr, 0, arr.length, compareBy(fnMap))
	arr.length = n
	return arr
}

uniqBySorted.to = uniqBySortedTo
uniqBySorted.$$$ = uniqBySorted$$$


const uniqSorted = (arr) => {
	const res = []
	__uniqSorted(res, 0, arr, 0, arr.length, compare)
	return res
}

const uniqSortedTo = (dst, arr) => {
	const n = __uniqSorted(dst, 0, arr, 0, arr.length, compare)
	dst.length = n
	return dst
}

const uniqSorted$$$ = (arr) => {
	const n = __uniqSorted(arr, 0, arr, 0, arr.length, compare)
	arr.length = n
	return arr
}

uniqSorted.to = uniqSortedTo
uniqSorted.$$$ = uniqSorted$$$


module.exports = {
	__uniq,
	uniqWith,
	uniqBy,
	uniq,
	uniqWithSorted,
	uniqBySorted,
	uniqSorted,
}
