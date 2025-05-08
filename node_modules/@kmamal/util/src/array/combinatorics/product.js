
const __recurse = function * (dst, src, index, length) {
	if (index === length) {
		yield dst
		return
	}

	const nextIndex = index + 1
	const arr = src[index]
	for (let i = 0; i < arr.length; i++) {
		dst[index] = arr[i]
		yield* __recurse(dst, src, nextIndex, length)
	}
}

const _product = function * (arr) {
	const { length } = arr
	if (length === 0) { return }
	const res = new Array(length)
	yield* __recurse(res, arr, 0, length)
}

const product = function * (arr) {
	for (const res of _product(arr)) {
		yield Array.from(res)
	}
}


module.exports = {
	_product,
	product,
}
