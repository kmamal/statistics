const { __filter } = require('./filter')
const { __includes } = require('./includes')
const { __comm } = require('./comm')
const { eq } = require('../operators/comparison/eq')
const { compare, compareBy, eqBy } = require('../function/compare')

const __difference = (dst, dstStart, a, aStart, aEnd, b, bStart, bEnd, fnEq) => {
	const fnPred = (x) => !__includes(b, bStart, bEnd, null, (y) => fnEq(y, x))
	return __filter(dst, dstStart, a, aStart, aEnd, fnPred)
}

const __differenceSorted = (dst, dstStart, a, aStart, aEnd, b, bStart, bEnd, fnCmp) => {
	const lengths = __comm(dst, dstStart, null, -1, null, -1, null, -1, a, aStart, aEnd, b, bStart, bEnd, fnCmp)
	return lengths.a - dstStart
}


const differenceWith = (a, b, fnEq) => {
	const res = []
	__difference(res, 0, a, 0, a.length, b, 0, b.length, fnEq)
	return res
}

const differenceWithTo = (dst, a, b, fnEq) => {
	const n = __difference(dst, 0, a, 0, a.length, b, 0, b.length, fnEq)
	dst.length = n
	return dst
}

const differenceWith$$$ = (a, b, fnEq) => {
	const n = __difference(a, 0, a, 0, a.length, b, 0, b.length, fnEq)
	a.length = n
	return a
}

differenceWith.to = differenceWithTo
differenceWith.$$$ = differenceWith$$$


const differenceBy = (a, b, fnMap) => {
	const res = []
	__difference(res, 0, a, 0, a.length, b, 0, b.length, eqBy(fnMap))
	return res
}

const differenceByTo = (dst, a, b, fnMap) => {
	const n = __difference(dst, 0, a, 0, a.length, b, 0, b.length, eqBy(fnMap))
	dst.length = n
	return dst
}

const differenceBy$$$ = (a, b, fnMap) => {
	const n = __difference(a, 0, a, 0, a.length, b, 0, b.length, eqBy(fnMap))
	a.length = n
	return a
}

differenceBy.to = differenceByTo
differenceBy.$$$ = differenceBy$$$


const difference = (a, b) => {
	const res = []
	__difference(res, 0, a, 0, a.length, b, 0, b.length, eq)
	return res
}

const differenceTo = (dst, a, b) => {
	const n = __difference(dst, 0, a, 0, a.length, b, 0, b.length, eq)
	dst.length = n
	return dst
}

const difference$$$ = (a, b) => {
	const n = __difference(a, 0, a, 0, a.length, b, 0, b.length, eq)
	a.length = n
	return a
}

difference.to = differenceTo
difference.$$$ = difference$$$


const differenceWithSorted = (a, b, fnCmp) => {
	const res = []
	__differenceSorted(res, 0, a, 0, a.length, b, 0, b.length, fnCmp)
	return res
}

const differenceWithSortedTo = (dst, a, b, fnCmp) => {
	const n = __differenceSorted(dst, 0, a, 0, a.length, b, 0, b.length, fnCmp)
	dst.length = n
	return dst
}

const differenceWithSorted$$$ = (a, b, fnCmp) => {
	const n = __differenceSorted(a, 0, a, 0, a.length, b, 0, b.length, fnCmp)
	a.length = n
	return a
}

differenceWithSorted.to = differenceWithSortedTo
differenceWithSorted.$$$ = differenceWithSorted$$$


const differenceBySorted = (a, b, fnMap) => {
	const res = []
	__differenceSorted(res, 0, a, 0, a.length, b, 0, b.length, compareBy(fnMap))
	return res
}

const differenceBySortedTo = (dst, a, b, fnMap) => {
	const n = __differenceSorted(dst, 0, a, 0, a.length, b, 0, b.length, compareBy(fnMap))
	dst.length = n
	return dst
}

const differenceBySorted$$$ = (a, b, fnMap) => {
	const n = __differenceSorted(a, 0, a, 0, a.length, b, 0, b.length, compareBy(fnMap))
	a.length = n
	return a
}

differenceBySorted.to = differenceBySortedTo
differenceBySorted.$$$ = differenceBySorted$$$


const differenceSorted = (a, b) => {
	const res = []
	__differenceSorted(res, 0, a, 0, a.length, b, 0, b.length, compare)
	return res
}

const differenceSortedTo = (dst, a, b) => {
	const n = __differenceSorted(dst, 0, a, 0, a.length, b, 0, b.length, compare)
	dst.length = n
	return dst
}

const differenceSorted$$$ = (a, b) => {
	const n = __differenceSorted(a, 0, a, 0, a.length, b, 0, b.length, compare)
	a.length = n
	return a
}

differenceSorted.to = differenceSortedTo
differenceSorted.$$$ = differenceSorted$$$


module.exports = {
	__difference,
	differenceWith,
	differenceBy,
	difference,
	differenceWithSorted,
	differenceBySorted,
	differenceSorted,
}
