const { defaultRng } = require('./default-rng')

const __randFloat = (rng, _a, _b) => {
	let a = _a
	let b = _b
	let range = b - a
	let scale = 1

	if (range === Infinity) {
		a /= 2
		b /= 2
		range = b - a
		scale = 2
	}

	return scale * (rng.uniform() * range + a)
}

const randFloat = (a, b) => __randFloat(defaultRng, a, b)

module.exports = {
	__randFloat,
	randFloat,
}
