
const __compactMap = (dst, dstStart, src, srcStart, srcEnd, fnMap) => {
	const n = srcEnd - srcStart
	let writeIndex = dstStart
	for (let i = 0; i < n; i++) {
		const item = src[srcStart + i]
		const mapped = fnMap(item)
		if (!mapped) { continue }
		dst[writeIndex++] = mapped
	}
	return writeIndex - dstStart
}

const compactMap = (arr, fnMap) => {
	const { length } = arr
	const res = new Array(length)
	const n = __compactMap(res, 0, arr, 0, length, fnMap)
	res.length = n
	return res
}

const compactMapTo = (dst, arr, fnMap) => {
	const n = __compactMap(dst, 0, arr, 0, arr.length, fnMap)
	dst.length = n
	return dst
}

const compactMap$$$ = (arr, fnMap) => {
	const n = __compactMap(arr, 0, arr, 0, arr.length, fnMap)
	arr.length = n
	return arr
}

compactMap.to = compactMapTo
compactMap.$$$ = compactMap$$$

module.exports = {
	__compactMap,
	compactMap,
}
