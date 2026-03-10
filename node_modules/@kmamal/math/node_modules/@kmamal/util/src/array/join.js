
const __join = (dst, dstStart, a, aStart, aEnd, b, bStart, bEnd) => {
	let writeIndex = dstStart
	let aIndex = aStart

	if (aIndex === aEnd) { return }
	{
		const aItem = a[aIndex++]
		dst[writeIndex++] = aItem
	}

	while (aIndex < aEnd) {
		let bIndex = bStart
		while (bIndex < bEnd) {
			const bItem = b[bIndex++]
			dst[writeIndex++] = bItem
		}
		const aItem = a[aIndex++]
		dst[writeIndex++] = aItem
	}
}


const join = (arr, sep) => {
	const { length: arrLen } = arr
	const { length: sepLen } = sep
	const res = new Array(Math.max(0, arrLen + (arrLen - 1) * sepLen))
	__join(res, 0, arr, 0, arrLen, sep, 0, sepLen)
	return res
}

const joinTo = (dst, arr, sep) => {
	const { length: arrLen } = arr
	const { length: sepLen } = sep
	dst.len = Math.max(0, arrLen + (arrLen - 1) * sepLen)
	__join(dst, 0, arr, 0, arrLen, sep, 0, sepLen)
	return dst
}

join.to = joinTo


module.exports = {
	__join,
	join,
}
