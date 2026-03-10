const { randInt } = require('./rand-int')
const { clone } = require('../array/clone')

const __shuffle = (arr, start, end, limit, options) => {
	const stop = Math.min(end, limit) - 1
	for (let i = start; i < stop; i++) {
		const index = randInt(i, end, options)
		const tmp = arr[index]
		arr[index] = arr[i]
		arr[i] = tmp
	}
	return arr
}

const shuffle$$$ = (arr, options) => {
	const { length } = arr
	__shuffle(arr, 0, length, length, options)
	return arr
}

const shuffle = (arr, options) => {
	const { length } = arr
	const res = clone(arr)
	__shuffle(res, 0, length, length, options)
	return res
}

shuffle.$$$ = shuffle$$$

module.exports = {
	__shuffle,
	shuffle,
}
