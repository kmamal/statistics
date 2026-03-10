
const __recurse = function * (dst, src, index, length) {
	if (index === length) {
		yield dst.slice()
		return
	}

	const nextIndex = index + 1
	for (const x of src[index]) {
		dst[index] = x
		yield* __recurse(dst, src, nextIndex, length)
	}
}

const product = function * (arr) {
	const { length } = arr
	if (length === 0) { return }
	const res = new Array(length)
	yield* __recurse(res, arr, 0, length)
}


module.exports = { product }
