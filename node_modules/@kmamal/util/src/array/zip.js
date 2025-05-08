const { reduce } = require('./reduce')
const { identity } = require('../function/identity')

const _getMaxLength = (max, x) => Math.max(max, x.length)


const __zip = (dst, dstStart, src, srcStart, srcEnd, innerStart, innerEnd, fnMap) => {
	const length = srcEnd - srcStart
	let writeIndex = dstStart
	for (let j = innerStart; j < innerEnd; j += 1) {
		const tuple = new Array(length)
		for (let i = 0; i < length; i++) {
			tuple[i] = src[i][j]
		}
		dst[writeIndex++] = fnMap(tuple)
	}
	return writeIndex - dstStart
}


const zipWith = (arr, fnMap) => {
	const width = reduce(arr, _getMaxLength, 0)
	const res = new Array(width)
	__zip(res, 0, arr, 0, arr.length, 0, width, fnMap)
	return res
}

const zipWithTo = (dst, arr, fnMap) => {
	const width = reduce(arr, _getMaxLength, 0)
	dst.length = width
	__zip(dst, 0, arr, 0, arr.length, 0, width, fnMap)
	return dst
}

const zipWith$$$ = (_arr, fnMap) => {
	const res = _arr
	const arr = Array.from(_arr)
	const width = reduce(arr, _getMaxLength, 0)
	res.length = width
	__zip(res, 0, arr, 0, arr.length, 0, width, fnMap)
	return res
}

zipWith.to = zipWithTo
zipWith.$$$ = zipWith$$$


const zip = (arr) => {
	const width = reduce(arr, _getMaxLength, 0)
	const res = new Array(width)
	__zip(res, 0, arr, 0, arr.length, 0, width, identity)
	return res
}

const zipTo = (dst, arr) => {
	const width = reduce(arr, _getMaxLength, 0)
	dst.length = width
	__zip(dst, 0, arr, 0, arr.length, 0, width, identity)
	return dst
}

const zip$$$ = (_arr) => {
	const res = _arr
	const arr = Array.from(_arr)
	const width = reduce(arr, _getMaxLength, 0)
	res.length = width
	__zip(res, 0, arr, 0, arr.length, 0, width, identity)
	return res
}

zip.to = zipTo
zip.$$$ = zip$$$


module.exports = {
	__zip,
	zipWith,
	zip,
}
