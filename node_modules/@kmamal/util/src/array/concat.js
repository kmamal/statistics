const { sumBy } = require('./sum')

const getLength = (x) => x.length

const __concat = (dst, dstStart, src, srcStart, srcEnd) => {
	let writeIndex = dstStart
	const n = srcEnd - srcStart
	for (let i = 0; i < n; i++) {
		const arr = src[srcStart + i]
		const { length } = arr
		for (let j = 0; j < length; j++) {
			dst[writeIndex + j] = arr[j]
		}
		writeIndex += length
	}
	return writeIndex - dstStart
}

const concatTo = (dst, arrs) => {
	const total = sumBy(arrs, getLength)
	dst.length = total
	__concat(dst, 0, arrs, 0, arrs.length)
	return dst
}

const concat$$$ = (_arrs) => {
	const res = _arrs
	const arrs = Array.from(_arrs)
	const total = sumBy(arrs, getLength)
	res.length = total
	__concat(res, 0, arrs, 0, arrs.length)
	return res
}

module.exports = {
	__concat,
	concatTo,
	concat$$$,
}
