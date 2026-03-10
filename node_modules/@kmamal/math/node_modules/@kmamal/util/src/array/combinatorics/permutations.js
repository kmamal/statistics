const { clone } = require('../clone')
const { swap } = require('../swap')

const __recurse = function * (arr, start, end) {
	const length = end - start
	if (length <= 1) {
		yield arr
		return
	}

	const last = end - 1
	yield* __recurse(arr, start, last)

	const isEven = (length % 2) === 0
	for (let i = start; i < last; i++) {
		const index = isEven ? i : start
		swap.$$$(arr, index, last)
		yield* __recurse(arr, start, last)
	}
}

const permutations$$$ = function * (arr) {
	yield* __recurse(arr, 0, arr.length)
}

const permutations = function * (arr) {
	const other = clone(arr)
	const iterator = __recurse(other, 0, other.length)
	while (!iterator.next().done) {
		yield clone(other)
	}
}

permutations.$$$ = permutations$$$

module.exports = { permutations }
