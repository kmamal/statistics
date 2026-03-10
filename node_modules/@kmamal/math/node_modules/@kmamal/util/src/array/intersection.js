const { __filter } = require('./filter')
const { __includes } = require('./includes')
const { __comm } = require('./comm')
const { eq } = require('../operators/comparison/eq')
const { compare, compareBy, eqBy } = require('../function/compare')

const __intersection = (dst, dstStart, a, aStart, aEnd, b, bStart, bEnd, fnEq) => {
	const fnPred = (x) => __includes(b, bStart, bEnd, null, (y) => fnEq(y, x))
	return __filter(dst, dstStart, a, aStart, aEnd, fnPred)
}

const __intersectionSorted = (dst, dstStart, a, aStart, aEnd, b, bStart, bEnd, fnCmp) => {
	const lengths = __comm(null, -1, dst, dstStart, null, -1, null, -1, a, aStart, aEnd, b, bStart, bEnd, fnCmp)
	return lengths.ab - dstStart
}


const intersectionWith = (a, b, fnEq) => {
	const res = []
	__intersection(res, 0, a, 0, a.length, b, 0, b.length, fnEq)
	return res
}

const intersectionWithTo = (dst, a, b, fnEq) => {
	const n = __intersection(dst, 0, a, 0, a.length, b, 0, b.length, fnEq)
	dst.length = n
	return dst
}

const intersectionWith$$$ = (a, b, fnEq) => {
	const n = __intersection(a, 0, a, 0, a.length, b, 0, b.length, fnEq)
	a.length = n
	return a
}

intersectionWith.to = intersectionWithTo
intersectionWith.$$$ = intersectionWith$$$


const intersectionBy = (a, b, fnMap) => {
	const res = []
	__intersection(res, 0, a, 0, a.length, b, 0, b.length, eqBy(fnMap))
	return res
}

const intersectionByTo = (dst, a, b, fnMap) => {
	const n = __intersection(dst, 0, a, 0, a.length, b, 0, b.length, eqBy(fnMap))
	dst.length = n
	return dst
}

const intersectionBy$$$ = (a, b, fnMap) => {
	const n = __intersection(a, 0, a, 0, a.length, b, 0, b.length, eqBy(fnMap))
	a.length = n
	return a
}

intersectionBy.to = intersectionByTo
intersectionBy.$$$ = intersectionBy$$$


const intersection = (a, b) => {
	const res = []
	__intersection(res, 0, a, 0, a.length, b, 0, b.length, eq)
	return res
}

const intersectionTo = (dst, a, b) => {
	const n = __intersection(dst, 0, a, 0, a.length, b, 0, b.length, eq)
	dst.length = n
	return dst
}

const intersection$$$ = (a, b) => {
	const n = __intersection(a, 0, a, 0, a.length, b, 0, b.length, eq)
	a.length = n
	return a
}

intersection.to = intersectionTo
intersection.$$$ = intersection$$$


const intersectionWithSorted = (a, b, fnCmp) => {
	const res = []
	__intersectionSorted(res, 0, a, 0, a.length, b, 0, b.length, fnCmp)
	return res
}

const intersectionWithSortedTo = (dst, a, b, fnCmp) => {
	const n = __intersectionSorted(dst, 0, a, 0, a.length, b, 0, b.length, fnCmp)
	dst.length = n
	return dst
}

const intersectionWithSorted$$$ = (a, b, fnCmp) => {
	const n = __intersectionSorted(a, 0, a, 0, a.length, b, 0, b.length, fnCmp)
	a.length = n
	return a
}

intersectionWithSorted.to = intersectionWithSortedTo
intersectionWithSorted.$$$ = intersectionWithSorted$$$


const intersectionBySorted = (a, b, fnMap) => {
	const res = []
	__intersectionSorted(res, 0, a, 0, a.length, b, 0, b.length, compareBy(fnMap))
	return res
}

const intersectionBySortedTo = (dst, a, b, fnMap) => {
	const n = __intersectionSorted(dst, 0, a, 0, a.length, b, 0, b.length, compareBy(fnMap))
	dst.length = n
	return dst
}

const intersectionBySorted$$$ = (a, b, fnMap) => {
	const n = __intersectionSorted(a, 0, a, 0, a.length, b, 0, b.length, compareBy(fnMap))
	a.length = n
	return a
}

intersectionBySorted.to = intersectionBySortedTo
intersectionBySorted.$$$ = intersectionBySorted$$$


const intersectionSorted = (a, b) => {
	const res = []
	__intersectionSorted(res, 0, a, 0, a.length, b, 0, b.length, compare)
	return res
}

const intersectionSortedTo = (dst, a, b) => {
	const n = __intersectionSorted(dst, 0, a, 0, a.length, b, 0, b.length, compare)
	dst.length = n
	return dst
}

const intersectionSorted$$$ = (a, b) => {
	const n = __intersectionSorted(a, 0, a, 0, a.length, b, 0, b.length, compare)
	a.length = n
	return a
}

intersectionSorted.to = intersectionSortedTo
intersectionSorted.$$$ = intersectionSorted$$$


module.exports = {
	__intersection,
	intersectionWith,
	intersectionBy,
	intersection,
	intersectionWithSorted,
	intersectionBySorted,
	intersectionSorted,
}
