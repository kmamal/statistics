const { __difference } = require('./difference')
const { __comm } = require('./comm')
const { eq } = require('../operators/comparison/eq')
const { compare, compareBy, eqBy } = require('../function/compare')

const __xor = (dst, dstStart, a, aStart, aEnd, b, bStart, bEnd, fnEq) => {
	const n = __difference(dst, dstStart, a, aStart, aEnd, b, bStart, bEnd, fnEq)
	const m = __difference(dst, dstStart + n, b, bStart, bEnd, a, aStart, aEnd, fnEq)
	return n + m
}

const __xorSorted = (dst, dstStart, a, aStart, aEnd, b, bStart, bEnd, fnCmp) => {
	const lengths = __comm([], 0, null, -1, [], 0, dst, 0, a, aStart, aEnd, b, bStart, bEnd, fnCmp)
	return lengths.x - dstStart
}


const xorWith = (a, b, fnEq) => {
	const res = []
	__xor(res, 0, a, 0, a.length, b, 0, b.length, fnEq)
	return res
}

const xorWithTo = (dst, a, b, fnEq) => {
	const n = __xor(dst, 0, a, 0, a.length, b, 0, b.length, fnEq)
	dst.length = n
	return dst
}

xorWith.to = xorWithTo


const xorBy = (a, b, fnMap) => {
	const res = []
	__xor(res, 0, a, 0, a.length, b, 0, b.length, eqBy(fnMap))
	return res
}

const xorByTo = (dst, a, b, fnMap) => {
	const n = __xor(dst, 0, a, 0, a.length, b, 0, b.length, eqBy(fnMap))
	dst.length = n
	return dst
}

xorBy.to = xorByTo


const xor = (a, b) => {
	const res = []
	__xor(res, 0, a, 0, a.length, b, 0, b.length, eq)
	return res
}

const xorTo = (dst, a, b) => {
	const n = __xor(dst, 0, a, 0, a.length, b, 0, b.length, eq)
	dst.length = n
	return dst
}

xor.to = xorTo


const xorWithSorted = (a, b, fnCmp) => {
	const res = []
	__xorSorted(res, 0, a, 0, a.length, b, 0, b.length, fnCmp)
	return res
}

const xorWithSortedTo = (dst, a, b, fnCmp) => {
	const n = __xorSorted(dst, 0, a, 0, a.length, b, 0, b.length, fnCmp)
	dst.length = n
	return dst
}

xorWithSorted.to = xorWithSortedTo


const xorBySorted = (a, b, fnMap) => {
	const res = []
	__xorSorted(res, 0, a, 0, a.length, b, 0, b.length, compareBy(fnMap))
	return res
}

const xorBySortedTo = (dst, a, b, fnMap) => {
	const n = __xorSorted(dst, 0, a, 0, a.length, b, 0, b.length, compareBy(fnMap))
	dst.length = n
	return dst
}

xorBySorted.to = xorBySortedTo


const xorSorted = (a, b) => {
	const res = []
	__xorSorted(res, 0, a, 0, a.length, b, 0, b.length, compare)
	return res
}

const xorSortedTo = (dst, a, b) => {
	const n = __xorSorted(dst, 0, a, 0, a.length, b, 0, b.length, compare)
	dst.length = n
	return dst
}

xorSorted.to = xorSortedTo


module.exports = {
	__xor,
	__xorSorted,
	xorWith,
	xorBy,
	xor,
	xorWithSorted,
	xorBySorted,
	xorSorted,
}
