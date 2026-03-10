
const __cycle = (dst, dstStart, src, srcStart, srcEnd, n) => {
	const length = srcEnd - srcStart
	if (length <= 0) { return }

	const remainder = n % length
	const fullLoops = (n - remainder) / length

	let writeIndex = dstStart
	let readIndex

	for (let i = 0; i < fullLoops; i++) {
		readIndex = srcStart
		while (readIndex < srcEnd) {
			dst[writeIndex++] = src[readIndex++]
		}
	}

	readIndex = srcStart
	while (readIndex < srcStart + remainder) {
		dst[writeIndex++] = src[readIndex++]
	}
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
