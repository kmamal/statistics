const { randInt } = require('./rand-int')
const { __shuffle } = require('./shuffle')

const __chooseN = (dst, dstStart, src, srcStart, srcEnd, _n, options) => {
	const length = srcEnd - srcStart
	const n = Math.min(length, _n)
	if (n <= 0) { return 0 }

	let writeIndex = dstStart
	const selected = new Set()

	const first = randInt(srcStart, srcEnd, options)
	dst[writeIndex++] = src[first]
	selected.add(first)

	let size = 1
	while (size < n) {
		let index
		do {
			index = randInt(srcStart, srcEnd, options)
			selected.add(index)
		} while (size === selected.size)
		size += 1
		dst[writeIndex++] = src[index]
	}

	return n
}

const chooseN$$$ = (arr, n, options) => {
	const { length } = arr
	__shuffle(arr, 0, length, n, options)
	arr.length = Math.min(length, n)
	return arr
}

const chooseN = (arr, n, options) => {
	const res = new Array(n)
	const m = __chooseN(res, 0, arr, 0, arr.length, n, options)
	res.length = m
	return res
}

chooseN.$$$ = chooseN$$$

module.exports = {
	__chooseN,
	chooseN,
}
