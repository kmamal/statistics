const { __copy, __copyRight } = require('./copy')

const __rotate = (dst, dstStart, src, srcStart, srcEnd, n) => {
	const length = srcEnd - srcStart
	const splitIndex = (srcStart + length - n) % length
	const joinIndex = dstStart + length - (splitIndex - srcStart)
	__copy(dst, dstStart, src, splitIndex, srcEnd)
	__copy(dst, joinIndex, src, srcStart, splitIndex)
}

const __rotateInplace = (arr, start, end, n) => {
	const length = end - start
	const splitIndex = (start + length + n) % length
	const joinIndex = start + length - (splitIndex - start)

	const tmp = new Array(n)
	if (splitIndex <= (start + end) / 2) {
		__copy(tmp, 0, arr, start, splitIndex)
		__copy(arr, start, arr, splitIndex, end)
		__copy(arr, joinIndex, tmp, 0, n)
	} else {
		__copy(tmp, 0, arr, splitIndex, end)
		__copyRight(arr, joinIndex, arr, start, splitIndex)
		__copy(arr, start, tmp, 0, n)
	}
}


const rotate = (arr, n) => {
	const { length } = arr
	const res = new Array(length)
	__rotate(res, 0, arr, 0, length, n)
	return res
}

const rotateTo = (dst, arr, n) => {
	const { length } = arr
	dst.length = length
	__rotate(dst, 0, arr, 0, length, n)
	return dst
}

const rotate$$$ = (arr, n) => {
	__rotateInplace(arr, 0, arr.length, n)
	return arr
}

rotate.to = rotateTo
rotate.$$$ = rotate$$$


module.exports = {
	__rotate,
	__rotateInplace,
	rotate,
}
