
const __flatMap = (dst, dstStart, src, srcStart, srcEnd, fn) => {
	const n = srcEnd - srcStart
	let writeIndex = dstStart
	for (let i = 0; i < n; i++) {
		const item = src[srcStart + i]
		const mapped = fn(item)
		const { length } = mapped
		for (let j = 0; j < length; j++) {
			dst[writeIndex + j] = mapped[j]
		}
		writeIndex += length
	}
	return writeIndex - dstStart
}


const flatMap = (arr, fn) => {
	const res = []
	__flatMap(res, 0, arr, 0, arr.length, fn)
	return res
}

const flatMapTo = (dst, arr, fn) => {
	const n = __flatMap(dst, 0, arr, 0, arr.length, fn)
	dst.length = n
	return dst
}

const flatMap$$$ = (_arr, fn) => {
	const res = _arr
	const arr = Array.from(_arr)
	const n = __flatMap(res, 0, arr, 0, arr.length, fn)
	res.length = n
	return res
}

flatMap.to = flatMapTo
flatMap.$$$ = flatMap$$$


module.exports = {
	__flatMap,
	flatMap,
}
