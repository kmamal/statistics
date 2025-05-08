
const __cycle = (dst, dstStart, src, srcStart, srcEnd, n) => {
	const length = srcEnd - srcStart
	if (length <= 0) { return 0 }

	const remainder = n % length
	const fullLoops = (n - remainder) / length

	for (let i = 0; i < fullLoops; i++) {
		for (let j = 0; j < length; j++) {
			dst[dstStart + i * length + j] = src[srcStart + j]
		}
	}

	if (remainder > 0) {
		for (let j = 0; j < remainder; j++) {
			dst[dstStart + fullLoops * length + j] = src[srcStart + j]
		}
	}

	return n
}

const cycle = (arr, n) => {
	const { length } = arr
	if (length === 0 || n <= 0) { return [] }

	const res = new Array(n)
	__cycle(res, 0, arr, 0, length, n)
	return res
}

const cycleTo = (dst, arr, n) => {
	const { length } = arr
	if (length === 0 || n <= 0) {
		dst.length = 0
		return dst
	}

	dst.length = n
	__cycle(dst, 0, arr, 0, length, n)
	return dst
}

const cycle$$$ = (arr, n) => {
	const { length } = arr
	if (length === 0) { return arr }
	if (n <= 0) {
		arr.length = 0
		return arr
	}

	arr.length = n
	__cycle(arr, length, arr, 0, length, n - length)
	return arr
}

cycle.to = cycleTo
cycle.$$$ = cycle$$$

module.exports = {
	__cycle,
	cycle,
}
