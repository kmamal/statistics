const { eq } = require('../operators/comparison/eq')

const __split = (dst, dstStart, src, srcStart, srcEnd, x, fnEq) => {
	let writeIndex = dstStart
	let chunk = []
	let readIndex = srcStart
	while (readIndex < srcEnd) {
		const item = src[readIndex++]
		if (fnEq(item, x)) {
			dst[writeIndex++] = chunk
			chunk = []
			continue
		}
		chunk.push(item)
	}
	dst[writeIndex++] = chunk

	return writeIndex
}


const splitWith = (arr, x, fnEq) => {
	const res = []
	__split(res, 0, arr, 0, arr.length, x, fnEq)
	return res
}

const splitWithTo = (dst, arr, x, fnEq) => {
	const n = __split(dst, 0, arr, 0, arr.length, x, fnEq)
	dst.length = n
	return dst
}

const splitWith$$$ = (arr, x, fnEq) => {
	const n = __split(arr, 0, arr, 0, arr.length, x, fnEq)
	arr.length = n
	return arr
}

splitWith.to = splitWithTo
splitWith.$$$ = splitWith$$$


const splitBy = (arr, value, fnMap) => {
	const res = []
	// HACK: The second argument to eq is always x
	__split(res, 0, arr, 0, arr.length, value, (y) => fnMap(y) === value)
	return res
}

const splitByTo = (dst, arr, value, fnMap) => {
	// HACK: The second argument to eq is always x
	const n = __split(dst, 0, arr, 0, arr.length, value, (y) => fnMap(y) === value)
	dst.length = n
	return dst
}

const splitBy$$$ = (arr, value, fnMap) => {
	// HACK: The second argument to eq is always x
	const n = __split(arr, 0, arr, 0, arr.length, value, (y) => fnMap(y) === value)
	arr.length = n
	return arr
}

splitBy.to = splitByTo
splitBy.$$$ = splitBy$$$


const split = (arr, value) => {
	const res = []
	__split(res, 0, arr, 0, arr.length, value, eq)
	return res
}

const splitTo = (dst, arr, value) => {
	const n = __split(dst, 0, arr, 0, arr.length, value, eq)
	dst.length = n
	return dst
}

const split$$$ = (arr, value) => {
	const n = __split(arr, 0, arr, 0, arr.length, value, eq)
	arr.length = n
	return arr
}

split.to = splitTo
split.$$$ = split$$$


module.exports = {
	__split,
	splitWith,
	splitBy,
	split,
}
