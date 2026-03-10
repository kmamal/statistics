
const __recurse = function * (dst, dstIndex, src, n, k, index) {
	const remaining = k - dstIndex
	if (remaining === 0) {
		yield dst.slice()
		return
	}

	const available = n - index
	if (available < remaining) { return }

	const nextDstIndex = dstIndex + 1

	let i = index
	while (i < n) {
		dst[dstIndex] = src[i++]
		yield* __recurse(dst, nextDstIndex, src, n, k, i)
	}
}

const combinations = function * (arr, k) {
	const res = new Array(k)
	yield* __recurse(res, 0, arr, arr.length, k, 0)
}

module.exports = { combinations }
