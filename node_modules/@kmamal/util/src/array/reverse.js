
const __reverse = (dst, dstStart, src, srcStart, srcEnd) => {
	const n = srcEnd - srcStart
	if (n <= 0) { return }

	const srcLast = srcEnd - 1
	const dstLast = dstStart + n - 1

	const mid = Math.floor(n / 2)
	for (let i = 0; i < mid; i++) {
		const front = src[srcStart + i]
		const back = src[srcLast - i]
		dst[dstStart + i] = back
		dst[dstLast - i] = front
	}

	if (dst !== src && n % 2 === 1) {
		dst[dstStart + mid] = src[srcStart + mid]
	}
}


const reverse = (arr) => {
	const { length } = arr
	const res = new Array(length)
	__reverse(res, 0, arr, 0, length)
	return res
}

const reverseTo = (dst, arr) => {
	const { length } = arr
	dst.length = length
	__reverse(dst, 0, arr, 0, length)
	return dst
}

const reverse$$$ = (arr) => {
	__reverse(arr, 0, arr, 0, arr.length)
	return arr
}

reverse.to = reverseTo
reverse.$$$ = reverse$$$


module.exports = {
	__reverse,
	reverse,
}
