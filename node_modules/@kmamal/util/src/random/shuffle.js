const { defaultRng } = require('./default-rng')
const { __randInt } = require('./rand-int')
const { swap } = require('../array/swap')

const swap$$$ = swap.$$$

const __shuffle = (rng, arr, start, end, limit) => {
	const stop = Math.min(end, limit) - 1
	for (let i = start; i < stop; i++) {
		const index = __randInt(rng, i, end)
		swap$$$(arr, index, i)
	}
	return arr
}

const shuffle$$$ = (arr) => {
	const { length } = arr
	__shuffle(defaultRng, arr, 0, length, length)
	return arr
}

const shuffle = (arr) => {
	const { length } = arr
	const res = Array.from(arr)
	__shuffle(defaultRng, res, 0, length, length)
	return res
}

shuffle.$$$ = shuffle$$$

module.exports = {
	__shuffle,
	shuffle,
}
