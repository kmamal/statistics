const { __copy } = require('./copy')
const { __exponentialSearchRight } = require('./searching/exponential')
const { compare, compareBy } = require('../function/compare')

const __merge = (dst, dstStart, a, aStart, aEnd, b, bStart, bEnd, fnCmp) => {
	let writeIndex = dstStart

	let aIndex = aStart
	let bIndex = bStart
	let aItem = a[aIndex]
	let bItem = b[bIndex]

	while (aIndex < aEnd && bIndex < bEnd) {
		const cmp = fnCmp(aItem, bItem)
		if (cmp <= 0) {
			dst[writeIndex++] = aItem
			aItem = a[++aIndex]
		} else {
			dst[writeIndex++] = bItem
			bItem = b[++bIndex]
		}
	}

	if (aIndex < aEnd) {
		while (aIndex < aEnd) { dst[writeIndex++] = a[aIndex++] }
	} else if (bIndex < bEnd) {
		while (bIndex < bEnd) { dst[writeIndex++] = b[bIndex++] }
	}
}

// TODO
const __mergeGalloping = (dst, dstStart, a, aStart, aEnd, b, bStart, bEnd, fnCmp) => {
	let writeIndex = dstStart

	let aIndex = aStart
	let bIndex = bStart
	let aItem = a[aIndex]
	let bItem = b[bIndex]

	let minGalloping = 7
	let count = 0

	let cmp = fnCmp(aItem, bItem)
	while (aIndex < aEnd && bIndex < bEnd) {
		if (cmp <= 0) {
			dst[writeIndex++] = aItem
			++aIndex

			count = count > 0 ? -1 : count - 1
			if (-count > minGalloping) {
				const nextIndex = __exponentialSearchRight(a, aIndex, aEnd, bItem, fnCmp)
				const numJumped = nextIndex - aIndex
				if (numJumped === 0) {
					minGalloping++
				} else {
					minGalloping--
					__copy(dst, writeIndex, a, aIndex, nextIndex)
					writeIndex += numJumped
					aIndex = nextIndex
					aItem = a[aIndex]
					cmp = 1
					continue
				}
			}

			aItem = a[aIndex]
		} else {
			dst[writeIndex++] = bItem
			++bIndex

			count = count < 0 ? 1 : count + 1
			if (count > minGalloping) {
				const nextIndex = __exponentialSearchRight(b, bIndex, bEnd, aItem, fnCmp)
				const numJumped = nextIndex - bIndex
				if (numJumped === 0) {
					minGalloping++
				} else {
					minGalloping--
					__copy(dst, writeIndex, b, bIndex, nextIndex)
					writeIndex += numJumped
					bIndex = nextIndex
					bItem = b[bIndex]
					cmp = -1
					continue
				}
			}

			bItem = b[bIndex]
		}

		cmp = fnCmp(aItem, bItem)
	}

	if (aIndex < aEnd) {
		while (aIndex < aEnd) { dst[writeIndex++] = a[aIndex++] }
	} else if (bIndex < bEnd) {
		while (bIndex < bEnd) { dst[writeIndex++] = b[bIndex++] }
	}
}

const __mergeRight = (dst, dstStart, a, aStart, aEnd, b, bStart, bEnd, fnCmp) => {
	const aLength = aEnd - aStart
	const bLength = bEnd - bStart
	let writeIndex = dstStart + aLength + bLength - 1

	let aIndex = aEnd - 1
	let bIndex = bEnd - 1
	let aItem = a[aIndex]
	let bItem = b[bIndex]

	while (aIndex >= aStart && bIndex >= bStart) {
		const cmp = fnCmp(aItem, bItem)
		if (cmp > 0) {
			dst[writeIndex--] = aItem
			aItem = a[--aIndex]
		} else {
			dst[writeIndex--] = bItem
			bItem = b[--bIndex]
		}
	}

	if (aStart - 1 < aIndex) {
		while (aStart - 1 < aIndex) { dst[writeIndex--] = a[aIndex--] }
	} else if (bStart - 1 < bIndex) {
		while (bStart - 1 < bIndex) { dst[writeIndex--] = b[bIndex--] }
	}
}

const __mergeInplace = (arr, start, sep, end, buffer, fnCmp) => {
	const aLength = sep - start
	const bLength = end - sep
	if (aLength <= bLength) {
		__copy(buffer, 0, arr, start, sep)
		__merge(arr, start, buffer, 0, aLength, arr, sep, end, fnCmp)
	} else {
		__copy(buffer, 0, arr, sep, end)
		__mergeRight(arr, start, arr, start, sep, buffer, 0, bLength, fnCmp)
	}
}


const mergeWith = (a, b, fnCmp) => {
	const aLength = a.length
	const bLength = b.length
	const res = new Array(aLength + bLength)
	__merge(res, 0, a, 0, aLength, b, 0, bLength, fnCmp)
	return res
}

const mergeWithTo = (dst, a, b, fnCmp) => {
	const aLength = a.length
	const bLength = b.length
	dst.length = aLength + bLength
	__merge(dst, 0, a, 0, aLength, b, 0, bLength, fnCmp)
	return dst
}

mergeWith.to = mergeWithTo


const mergeBy = (a, b, fnMap) => {
	const aLength = a.length
	const bLength = b.length
	const res = new Array(aLength + bLength)
	__merge(res, 0, a, 0, aLength, b, 0, bLength, compareBy(fnMap))
	return res
}

const mergeByTo = (dst, a, b, fnMap) => {
	const aLength = a.length
	const bLength = b.length
	dst.length = aLength + bLength
	__merge(dst, 0, a, 0, aLength, b, 0, bLength, compareBy(fnMap))
	return dst
}

mergeBy.to = mergeByTo


const merge = (a, b) => {
	const aLength = a.length
	const bLength = b.length
	const res = new Array(aLength + bLength)
	__merge(res, 0, a, 0, aLength, b, 0, bLength, compare)
	return res
}

const mergeTo = (dst, a, b) => {
	const aLength = a.length
	const bLength = b.length
	dst.length = aLength + bLength
	__merge(dst, 0, a, 0, aLength, b, 0, bLength, compare)
	return dst
}

merge.to = mergeTo


module.exports = {
	__merge,
	__mergeRight,
	__mergeInplace,
	mergeWith,
	mergeBy,
	merge,
}
