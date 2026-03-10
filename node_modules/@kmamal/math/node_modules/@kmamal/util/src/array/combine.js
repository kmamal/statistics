
const __combine = (dst, dstStart, a, aStart, b, bStart, length, fn) => {
	const dstEnd = dstStart + length
	let writeIndex = dstStart
	let aIndex = aStart
	let bIndex = bStart
	while (writeIndex < dstEnd) {
		const aItem = a[aIndex++]
		const bItem = b[bIndex++]
		dst[writeIndex++] = fn(aItem, bItem)
	}
}

const combine = (a, b, fn) => {
	const length = Math.max(a.length, b.length)
	const res = new Array(length)
	__combine(res, 0, a, 0, b, 0, length, fn)
	return res
}

const combineTo = (dst, a, b, fn) => {
	const length = Math.max(a.length, b.length)
	dst.length = length
	__combine(dst, 0, a, 0, b, 0, length, fn)
	return dst
}

const combine$$$ = (a, b, fn) => {
	const length = Math.max(a.length, b.length)
	__combine(a, 0, a, 0, b, 0, length, fn)
	return a
}

combine.to = combineTo
combine.$$$ = combine$$$

module.exports = {
	__combine,
	combine,
}
