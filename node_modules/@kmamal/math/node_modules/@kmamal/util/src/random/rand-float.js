const { random } = require('./random')

const randFloat = (_a, _b, options) => {
	const getRandom = options?.random ?? random

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

	return scale * (getRandom() * range + a)
}

module.exports = { randFloat }
