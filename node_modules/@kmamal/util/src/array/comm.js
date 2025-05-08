const { compare, compareBy } = require('../function/compare')

const _lengths = { a: 0, ab: 0, b: 0, x: 0 }

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
		const n = aEnd - aIndex
		if (dstA && dstX) {
			for (let i = 0; i < n; i++) { dstX[dstXIndex + i] = dstA[dstAIndex + i] = a[aIndex + i] }
			dstXIndex += n
			dstAIndex += n
		} else if (dstA) {
			for (let i = 0; i < n; i++) { dstA[dstAIndex + i] = a[aIndex + i] }
			dstAIndex += n
		} else if (dstX) {
			for (let i = 0; i < n; i++) { dstX[dstXIndex + i] = a[aIndex + i] }
			dstXIndex += n
		}
	} else if (bIndex < bEnd) {
		const n = bEnd - bIndex
		if (dstB && dstX) {
			for (let i = 0; i < n; i++) { dstX[dstXIndex + i] = dstB[dstBIndex + i] = b[bIndex + i] }
			dstXIndex += n
			dstBIndex += n
		} else if (dstB) {
			for (let i = 0; i < n; i++) { dstB[dstBIndex + i] = b[bIndex + i] }
			dstBIndex += n
		} else if (dstX) {
			for (let i = 0; i < n; i++) { dstX[dstXIndex + i] = b[bIndex + i] }
			dstXIndex += n
		}
	}

	_lengths.a = dstAIndex
	_lengths.ab = dstABIndex
	_lengths.b = dstBIndex
	_lengths.x = dstXIndex
	return _lengths
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
	__comm(dst.a, 0, dst.ab, 0, dst.b, 0, dst.x, 0, a, 0, a.length, b, 0, b.length, fnCmp)
	if (dst.a) { dst.a.length = _lengths.a }
	if (dst.ab) { dst.ab.length = _lengths.ab }
	if (dst.b) { dst.b.length = _lengths.b }
	if (dst.x) { dst.x.length = _lengths.x }
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
	__comm(dst.a, 0, dst.ab, 0, dst.b, 0, dst.x, 0, a, 0, a.length, b, 0, b.length, compareBy(fnMap))
	if (dst.a) { dst.a.length = _lengths.a }
	if (dst.ab) { dst.ab.length = _lengths.ab }
	if (dst.b) { dst.b.length = _lengths.b }
	if (dst.x) { dst.x.length = _lengths.x }
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
	__comm(dst.a, 0, dst.ab, 0, dst.b, 0, dst.x, 0, a, 0, a.length, b, 0, b.length, compare)
	if (dst.a) { dst.a.length = _lengths.a }
	if (dst.ab) { dst.ab.length = _lengths.ab }
	if (dst.b) { dst.b.length = _lengths.b }
	if (dst.x) { dst.x.length = _lengths.x }
	return dst
}

comm.to = commTo

module.exports = {
	__comm,
	commWith,
	commBy,
	comm,
}
