const { swap } = require('../swap')

const swap$$$ = swap.$$$


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
		swap$$$(arr, index, last)
		yield* __recurse(arr, start, last)
	}
}

const permutations$$$ = function * (arr) {
	yield* __recurse(arr, 0, arr.length)
}

const _permutations = function * (arr) {
	const other = Array.from(arr)
	const iterator = __recurse(other, 0, other.length)
	while (!iterator.next().done) {
		yield other
	}
}

const permutations = function * (arr) {
	for (const res of _permutations(arr)) {
		yield Array.from(res)
	}
}

permutations.$$$ = permutations$$$

module.exports = {
	_permutations,
	permutations,
}
