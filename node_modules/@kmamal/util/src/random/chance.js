const { defaultRng } = require('./default-rng')

const __chance = (rng, p) => rng.uniform() < p

const chance = (p) => __chance(defaultRng, p)

module.exports = {
	__chance,
	chance,
}
