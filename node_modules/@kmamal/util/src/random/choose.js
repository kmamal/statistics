const { defaultRng } = require('./default-rng')
const { __randInt } = require('./rand-int')

const __choose = (rng, arr, start, end) => {
	const index = __randInt(rng, start, end)
	return arr[index]
}

const choose = (arr) => __choose(defaultRng, arr, 0, arr.length)

module.exports = {
	__choose,
	choose,
}
