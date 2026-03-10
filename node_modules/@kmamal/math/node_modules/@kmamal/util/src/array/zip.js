const { reduce } = require('./reduce')
const { identity } = require('../function/identity')

const __zip = (dst, dstStart, src, srcStart, srcEnd, innerStart, innerEnd, fnMap) => {
	const length = srcEnd - srcStart
	let writeIndex = dstStart
	let innerIndex = innerStart
	while (innerIndex < innerEnd) {
		const tuple = new Array(length)
		for (let i = 0; i < length; i++) {
			tuple[i] = src[i][innerIndex]
		}
		dst[writeIndex++] = fnMap(tuple)
		innerIndex += 1
	}
	return writeIndex - dstStart
}


const zipWith = (arr, fnMap) => {
	const width = reduce(arr, (max, x) => Math.max(max, x.length), 0)
	const res = new Array(width)
	__zip(res, 0, arr, 0, arr.length, 0, width, fnMap)
	return res
}

const zipWithTo = (dst, arr, fnMap) => {
	const width = reduce(arr, (max, x) => Math.max(max, x.length), 0)
	dst.length = width
	__zip(dst, 0, arr, 0, arr.length, 0, width, fnMap)
	return dst
}

zipWith.to = zipWithTo


const zip = (arr) => {
	const width = reduce(arr, (max, x) => Math.max(max, x.length), 0)
	const res = new Array(width)
	__zip(res, 0, arr, 0, arr.length, 0, width, identity)
	return res
}

const zipTo = (dst, arr) => {
	const width = reduce(arr, (max, x) => Math.max(max, x.length), 0)
	dst.length = width
	__zip(dst, 0, arr, 0, arr.length, 0, width, identity)
	return dst
}

zip.to = zipTo


module.exports = {
	__zip,
	zipWith,
	zip,
}
