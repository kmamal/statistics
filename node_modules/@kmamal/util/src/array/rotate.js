const { __copy, __copyRight } = require('./copy')

const _tmp = []


const __rotate = (dst, dstStart, src, srcStart, srcEnd, _n) => {
	const length = srcEnd - srcStart
	if (length <= 0) { return }

	const n = (length + (_n % length)) % length
	if (n === 0) {
		__copy(dst, dstStart, src, srcStart, srcEnd)
		return
	}

	const splitIndex = srcStart + length - n
	const joinIndex = dstStart + n
	__copy(dst, dstStart, src, splitIndex, srcEnd)
	__copy(dst, joinIndex, src, srcStart, splitIndex)
}

const __rotateInplace = (arr, start, end, _n, tmp) => {
	const length = end - start
	if (length <= 1) { return }

	const n = (length + (_n % length)) % length
	if (n === 0) { return }

	const splitIndex = start + length - n
	const joinIndex = start + n

	if (splitIndex <= joinIndex) {
		__copy(tmp, 0, arr, start, splitIndex)
		__copy(arr, start, arr, splitIndex, end)
		__copy(arr, joinIndex, tmp, 0, splitIndex - start)
	} else {
		__copy(tmp, 0, arr, splitIndex, end)
		__copyRight(arr, joinIndex, arr, start, splitIndex)
		__copy(arr, start, tmp, 0, end - splitIndex)
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
	const { length } = arr
	if (length <= 1) { return arr }

	const absn = Math.abs(n % length)
	_tmp.length = Math.min(absn, length - absn)
	__rotateInplace(arr, 0, length, n, _tmp)
	return arr
}

rotate.to = rotateTo
rotate.$$$ = rotate$$$


module.exports = {
	__rotate,
	__rotateInplace,
	rotate,
}
