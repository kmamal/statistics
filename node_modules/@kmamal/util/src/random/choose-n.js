const { defaultRng } = require('./default-rng')
const { __rand } = require('./rand')
const { __randInt } = require('./rand-int')
const { __shuffle } = require('./shuffle')

const __chooseN = (rng, dst, dstStart, src, srcStart, srcEnd, _n) => {
	const length = srcEnd - srcStart
	const n = Math.min(length, _n)
	if (n <= 0) { return 0 }

	let writeIndex = dstStart

	if (3 * n > length) {
		let readIndex = srcStart
		for (let i = 0; i < n; i++) {
			dst[writeIndex++] = src[readIndex++]
		}

		for (let i = n; i < length; i++) {
			const r = __rand(rng, i + 1)
			if (r < n) {
				dst[dstStart + r] = src[srcStart + i]
			}
		}

		return n
	}

	const selected = new Set()

	const first = __randInt(rng, srcStart, srcEnd)
	dst[writeIndex++] = src[first]
	selected.add(first)

	let size = 1
	while (size < n) {
		let index
		do {
			index = __randInt(rng, srcStart, srcEnd)
			selected.add(index)
		} while (size === selected.size)
		size += 1
		dst[writeIndex++] = src[index]
	}

	return n
}

const chooseN = (arr, _n) => {
	const { length } = arr
	const n = Math.min(length, _n)
	const res = new Array(n)
	__chooseN(defaultRng, res, 0, arr, 0, length, n)
	return res
}

const chooseNTo = (dst, arr, _n) => {
	const { length } = arr
	const n = Math.min(length, _n)
	dst.length = n
	__chooseN(defaultRng, dst, 0, arr, 0, arr.length, n)
	return dst
}

const chooseN$$$ = (arr, _n) => {
	const { length } = arr
	const n = Math.min(length, _n)
	__shuffle(defaultRng, arr, 0, length, n)
	arr.length = n
	return arr
}

chooseN.$$$ = chooseN$$$
chooseN.to = chooseNTo

module.exports = {
	__chooseN,
	chooseN,
}
