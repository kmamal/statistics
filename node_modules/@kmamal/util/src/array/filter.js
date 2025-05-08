
const __filter = (dst, dstStart, src, srcStart, srcEnd, fnPred) => {
	const n = srcEnd - srcStart
	let writeIndex = dstStart
	for (let i = 0; i < n; i++) {
		const item = src[srcStart + i]
		const keep = fnPred(item)
		if (!keep) { continue }
		dst[writeIndex++] = item
	}
	return writeIndex - dstStart
}


const filter = (arr, fnPred) => {
	const { length } = arr
	const res = new Array(length)
	const n = __filter(res, 0, arr, 0, length, fnPred)
	res.length = n
	return res
}

const filterTo = (dst, arr, fnPred) => {
	const n = __filter(dst, 0, arr, 0, arr.length, fnPred)
	dst.length = n
	return dst
}

const filter$$$ = (arr, fnPred) => {
	const n = __filter(arr, 0, arr, 0, arr.length, fnPred)
	arr.length = n
	return arr
}

filter.to = filterTo
filter.$$$ = filter$$$


module.exports = {
	__filter,
	filter,
}
