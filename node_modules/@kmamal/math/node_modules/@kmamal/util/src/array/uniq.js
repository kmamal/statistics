const { __includes } = require('./includes')
const { eq } = require('../operators')
const { compare, compareBy, eqBy } = require('../function/compare')

const __uniq = (dst, dstStart, src, srcStart, srcEnd, fnEq) => {
	if (srcEnd - srcStart <= 0) { return 0 }

	let writeIndex = dstStart
	let readIndex = srcStart

	let item = src[readIndex++]
	dst[writeIndex++] = item

	while (readIndex < srcEnd) {
		item = src[readIndex++]
		const exists = __includes(dst, dstStart, writeIndex, item, fnEq)
		if (exists) { continue }
		dst[writeIndex++] = item
	}

	return writeIndex - dstStart
}

const __uniqSorted = (dst, dstStart, src, srcStart, srcEnd, fnCmp) => {
	if (srcEnd - srcStart <= 0) { return 0 }

	let writeIndex = dstStart
	let readIndex = srcStart

	let item = src[readIndex++]
	dst[writeIndex++] = item
	let prev = item

	while (readIndex < srcEnd) {
		item = src[readIndex++]
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
	const res = []
	__uniq(res, 0, arr, 0, arr.length, eqBy(fnMap))
	return res
}

const uniqByTo = (dst, arr, fnMap) => {
	const n = __uniq(dst, 0, arr, 0, arr.length, eqBy(fnMap))
	dst.length = n
	return dst
}

const uniqBy$$$ = (arr, fnMap) => {
	const n = __uniq(arr, 0, arr, 0, arr.length, eqBy(fnMap))
	arr.length = n
	return arr
}

uniqBy.to = uniqByTo
uniqBy.$$$ = uniqBy$$$


const uniq = (arr) => {
	const res = []
	__uniq(res, 0, arr, 0, arr.length, eq)
	return res
}

const uniqTo = (dst, arr) => {
	const n = __uniq(dst, 0, arr, 0, arr.length, eq)
	dst.length = n
	return dst
}

const uniq$$$ = (arr) => {
	const n = __uniq(arr, 0, arr, 0, arr.length, eq)
	arr.length = n
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
