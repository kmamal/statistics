const { defaultRng } = require('./default-rng')

const __rand = (rng, n) => Math.floor(rng.uniform() * n)

const rand = (n) => __rand(defaultRng, n)

module.exports = {
	__rand,
	rand,
}
