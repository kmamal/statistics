const { compare, compareBy } = require('../function/compare')

const _ret = {}

const __comm = (dstA, dstAStart, dstAB, dstABStart, dstB, dstBStart, dstX, dstXStart, a, aStart, aEnd, b, bStart, bEnd, fnCmp) => {
	let dstAIndex = dstAStart
	let dstABIndex = dstABStart
	let dstBIndex = dstBStart
	let dstXIndex = dstXStart

	let aIndex = aStart
	let bIndex = bStart
	let aItem = a[aStart]
	let bItem = b[bStart]

	while (aIndex < aEnd && bIndex < bEnd) {
		const cmp = fnCmp(aItem, bItem)
		if (cmp < 0) {
			if (dstA) { dstA[dstAIndex++] = aItem }
			if (dstX) { dstX[dstXIndex++] = aItem }
			aItem = a[++aIndex]
		} else if (cmp === 0) {
			if (dstAB) { dstAB[dstABIndex++] = aItem }
			aItem = a[++aIndex]
			bItem = b[++bIndex]
		} else {
			if (dstB) { dstB[dstBIndex++] = bItem }
			if (dstX) { dstX[dstXIndex++] = bItem }
			bItem = b[++bIndex]
		}
	}

	if (aIndex < aEnd) {
		if (dstA && dstX) {
			while (aIndex < aEnd) { dstX[dstXIndex++] = dstA[dstAIndex++] = a[aIndex++] }
		} else if (dstA) {
			while (aIndex < aEnd) { dstA[dstAIndex++] = a[aIndex++] }
		} else if (dstX) {
			while (aIndex < aEnd) { dstX[dstXIndex++] = a[aIndex++] }
		}
	} else if (bIndex < bEnd) {
		if (dstB && dstX) {
			while (bIndex < bEnd) { dstX[dstXIndex++] = dstB[dstBIndex++] = b[bIndex++] }
		} else if (dstB) {
			while (bIndex < bEnd) { dstB[dstBIndex++] = b[bIndex++] }
		} else if (dstX) {
			while (bIndex < bEnd) { dstX[dstXIndex++] = b[bIndex++] }
		}
	}

	_ret.a = dstAIndex
	_ret.ab = dstABIndex
	_ret.b = dstBIndex
	_ret.x = dstXIndex
	return _ret
}

const commWith = (a, b, fnCmp) => {
	const dstA = []
	const dstAB = []
	const dstB = []
	const dstX = []
	__comm(dstA, 0, dstAB, 0, dstB, 0, dstX, 0, a, 0, a.length, b, 0, b.length, fnCmp)
	return { a: dstA, ab: dstAB, b: dstB, x: dstX }
}

const commWithTo = (dst, a, b, fnCmp) => {
	const lengths = __comm(dst.a, 0, dst.ab, 0, dst.b, 0, dst.x, 0, a, 0, a.length, b, 0, b.length, fnCmp)
	if (dst.a) { dst.a.length = lengths.a }
	if (dst.ab) { dst.ab.length = lengths.ab }
	if (dst.b) { dst.b.length = lengths.b }
	if (dst.x) { dst.x.length = lengths.x }
	return dst
}

commWith.to = commWithTo


const commBy = (a, b, fnMap) => {
	const dstA = []
	const dstAB = []
	const dstB = []
	const dstX = []
	__comm(dstA, 0, dstAB, 0, dstB, 0, dstX, 0, a, 0, a.length, b, 0, b.length, compareBy(fnMap))
	return { a: dstA, ab: dstAB, b: dstB, x: dstX }
}

const commByTo = (dst, a, b, fnMap) => {
	const lengths = __comm(dst.a, 0, dst.ab, 0, dst.b, 0, dst.x, 0, a, 0, a.length, b, 0, b.length, compareBy(fnMap))
	if (dst.a) { dst.a.length = lengths.a }
	if (dst.ab) { dst.ab.length = lengths.ab }
	if (dst.b) { dst.b.length = lengths.b }
	if (dst.x) { dst.x.length = lengths.x }
	return dst
}

commBy.to = commByTo


const comm = (a, b) => {
	const dstA = []
	const dstAB = []
	const dstB = []
	const dstX = []
	__comm(dstA, 0, dstAB, 0, dstB, 0, dstX, 0, a, 0, a.length, b, 0, b.length, compare)
	return { a: dstA, ab: dstAB, b: dstB, x: dstX }
}

const commTo = (dst, a, b) => {
	const lengths = __comm(dst.a, 0, dst.ab, 0, dst.b, 0, dst.x, 0, a, 0, a.length, b, 0, b.length, compare)
	if (dst.a) { dst.a.length = lengths.a }
	if (dst.ab) { dst.ab.length = lengths.ab }
	if (dst.b) { dst.b.length = lengths.b }
	if (dst.x) { dst.x.length = lengths.x }
	return dst
}

comm.to = commTo

module.exports = {
	__comm,
	commWith,
	commBy,
	comm,
}
