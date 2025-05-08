const { __copy } = require('./copy')

const __interposeLeft = (dst, dstStart, src, srcStart, srcEnd, value) => {
	const n = srcEnd - srcStart
	if (n <= 0) { return 0 }

	dst[dstStart] = src[srcStart]
	for (let i = 1; i < n; i++) {
		dst[dstStart + i * 2 - 1] = value
		dst[dstStart + i * 2] = src[srcStart + i]
	}

	return 2 * n - 1
}

const __interposeRight = (dst, dstStart, src, srcStart, srcEnd, value) => {
	const n = srcEnd - srcStart
	if (n <= 0) { return 0 }

	const m = 2 * n - 1
	dst[dstStart + m - 1] = src[srcEnd - 1]
	for (let i = n - 2; i >= 0; i--) {
		dst[dstStart + i * 2 + 1] = value
		dst[dstStart + i * 2] = src[srcStart + i]
	}

	return m
}

const __interpose = (dst, dstStart, src, srcStart, srcEnd, value) => {
	dst === src
		? __interposeRight(dst, dstStart, src, srcStart, srcEnd, value)
		: __interposeLeft(dst, dstStart, src, srcStart, srcEnd, value)
}

const __interposeAllLeft = (dst, dstStart, a, aStart, aEnd, b, bStart, bEnd) => {
	const n = aEnd - aStart
	if (n <= 0) { return 0 }

	const m = bEnd - bStart
	if (m <= 0) {
		__copy(dst, dstStart, a, aStart, aEnd)
		return n
	}

	dst[dstStart] = a[aStart]
	for (let i = 1; i < n; i++) {
		for (let j = 0; j < m; j++) {
			dst[dstStart + (i - 1) * (m + 1) + j + 1] = b[bStart + j]
		}
		dst[dstStart + i * (m + 1)] = a[aStart + i]
	}

	return n + (n - 1) * m
}

const __interposeAllRight = (dst, dstStart, a, aStart, aEnd, b, bStart, bEnd) => {
	const n = aEnd - aStart
	if (n <= 0) { return 0 }

	const m = bEnd - bStart
	if (m <= 0) {
		__copy(dst, dstStart, a, aStart, aEnd)
		return n
	}

	const total = n + (n - 1) * m
	dst[dstStart + total - 1] = a[aEnd - 1]
	for (let i = n - 2; i >= 0; i--) {
		for (let j = m - 1; j >= 0; j--) {
			dst[dstStart + i * (m + 1) + j + 1] = b[bStart + j]
		}
		dst[dstStart + i * (m + 1)] = a[aStart + i]
	}

	return total
}

const __interposeAll = (dst, dstStart, src, srcStart, srcEnd, b, bStart, bEnd) => {
	dst === src
		? __interposeAllRight(dst, dstStart, src, srcStart, srcEnd, b, bStart, bEnd)
		: __interposeAllLeft(dst, dstStart, src, srcStart, srcEnd, b, bStart, bEnd)
}


const interpose = (arr, value) => {
	const { length } = arr
	if (length === 0) { return [] }

	const res = new Array(length * 2 - 1)
	__interposeLeft(res, 0, arr, 0, length, value)
	return res
}

const interposeTo = (dst, arr, value) => {
	const { length } = arr
	if (length === 0) {
		dst.length = 0
		return dst
	}

	dst.length = length * 2 - 1
	__interposeLeft(dst, 0, arr, 0, length, value)
	return dst
}

const interpose$$$ = (arr, value) => {
	const { length } = arr
	if (length === 0) { return arr }

	arr.length = length * 2 - 1
	__interposeRight(arr, 0, arr, 0, length, value)
	return arr
}

interpose.to = interposeTo
interpose.$$$ = interpose$$$


const interposeAll = (arr, sep) => {
	const { length: arrLen } = arr
	if (arrLen === 0) { return [] }

	const { length: sepLen } = sep
	if (sepLen === 0) { return Array.from(arr) }

	const res = new Array(arrLen + (arrLen - 1) * sepLen)
	__interposeAllLeft(res, 0, arr, 0, arrLen, sep, 0, sepLen)
	return res
}

const interposeAllTo = (dst, arr, sep) => {
	const { length: arrLen } = arr
	if (arrLen === 0) {
		dst.length = 0
		return dst
	}

	const { length: sepLen } = sep
	if (sepLen === 0) {
		dst.length = arrLen
		__copy(dst, 0, arr, 0, arrLen)
		return dst
	}

	dst.length = arrLen + (arrLen - 1) * sepLen
	__interposeAll(dst, 0, arr, 0, arrLen, sep, 0, sepLen)
	return dst
}

const interposeAll$$$ = (arr, sep) => {
	const { length: arrLen } = arr
	if (arrLen === 0) { return arr }

	const { length: sepLen } = sep
	if (sepLen === 0) { return arr }

	arr.length = arrLen + (arrLen - 1) * sepLen
	__interposeAllRight(arr, 0, arr, 0, arrLen, sep, 0, sepLen)
	return arr
}

interposeAll.to = interposeAllTo
interposeAll.$$$ = interposeAll$$$


module.exports = {
	__interposeLeft,
	__interposeRight,
	__interpose,
	__interposeAllLeft,
	__interposeAllRight,
	__interposeAll,
	interpose,
	interposeAll,
}
