const { randInt } = require('./rand-int')

const __choose = (arr, start, end, options) => {
	const index = randInt(start, end, options)
	return arr[index]
}

const choose = (arr, options) => __choose(arr, 0, arr.length, options)

module.exports = { choose }
