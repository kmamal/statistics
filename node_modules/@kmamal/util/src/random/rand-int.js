const { defaultRng } = require('./default-rng')
const { __rand } = require('./rand')

const __randInt = (rng, a, b) => __rand(rng, b - a) + a

const randInt = (a, b) => __randInt(defaultRng, a, b)

module.exports = {
	__randInt,
	randInt,
}
