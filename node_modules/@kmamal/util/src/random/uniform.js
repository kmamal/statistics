const { defaultRng } = require('./default-rng')

const __uniform = (rng) => rng.uniform()

const uniform = () => __uniform(defaultRng)

module.exports = {
	__uniform,
	uniform,
}
