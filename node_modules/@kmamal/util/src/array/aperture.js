
const __aperture = (dst, dstStart, src, srcStart, srcEnd, _width) => {
	const n = srcEnd - srcStart
	if (n <= 0) { return }
	const width = Math.min(n, _width)

	const m = n - width + 1
	for (let j = 0; j < m; j++) {
		const arr = new Array(width)
		for (let i = 0; i < width; i++) {
			arr[i] = src[srcStart + j + i]
		}
		dst[dstStart + j] = arr
	}
}

const aperture = (arr, _width) => {
	const { length } = arr
	if (length === 0) { return [] }

	const width = Math.min(length, _width)
	const res = new Array(length - width + 1)
	__aperture(res, 0, arr, 0, length, width)
	return res
}

const apertureTo = (dst, arr, _width) => {
	const { length } = arr
	if (length === 0) {
		dst.length = 0
		return dst
	}

	const width = Math.min(length, _width)
	dst.length = length - width + 1
	__aperture(dst, 0, arr, 0, length, width)
	return dst
}

const aperture$$$ = (arr, _width) => {
	const { length } = arr
	if (length === 0) { return arr }

	const width = Math.min(length, _width)
	__aperture(arr, 0, arr, 0, length, width)
	arr.length = length - width + 1
	return arr
}

aperture.to = apertureTo
aperture.$$$ = aperture$$$

module.exports = {
	__aperture,
	aperture,
}
