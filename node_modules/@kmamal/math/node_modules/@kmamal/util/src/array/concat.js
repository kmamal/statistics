const { sumBy } = require('./sum')

const __concat = (dst, dstStart, src, srcStart, srcEnd) => {
	let writeIndex = dstStart
	let readIndex = srcStart
	while (readIndex < srcEnd) {
		const arr = src[readIndex++]
		const { length } = arr
		for (let j = 0; j < length; j++) {
			dst[writeIndex++] = arr[j]
		}
	}
	return writeIndex - dstStart
}

const concat = (arrs) => {
	const total = sumBy(arrs, (x) => x.length)
	const res = new Array(total)
	__concat(res, 0, arrs, 0, arrs.length)
	return res
}

const concatTo = (dst, arrs) => {
	const total = sumBy(arrs, (x) => x.length)
	dst.length = total
	__concat(dst, 0, arrs, 0, arrs.length)
	return dst
}

concat.to = concatTo

module.exports = {
	__concat,
	concat,
}
