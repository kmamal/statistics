const { gamma } = require('./gamma')
const { exponentialIntegralE1 } = require('./exponential-integral')

const _lowerIncompleteGammaSeries = (s, x) => {
	let sum = 1 / s
	let term = sum
	for (let k = 1; k < 100; k++) {
		term *= x / (s + k)
		sum += term
	}
	return sum * Math.exp(-x + s * Math.log(x))
}

const _upperIncompleteGammaContinuedFraction = (s, x) => {
	let f = 1e-30
	let c = f
	let d = 0

	for (let n = 1; n <= 100; n++) {
		const a = n === 1 ? 1 : -(n - 1) * (n - 1 - s)
		const b = x + 2 * n - 1 - s

		d = b + a * d
		if (d === 0) { d = 1e-30 }
		c = b + a / c
		if (c === 0) { c = 1e-30 }

		d = 1 / d
		const delta = c * d
		f *= delta
	}

	return f * Math.exp(-x + s * Math.log(x))
}

const lowerIncompleteGamma = (s, x) => {
	if (x < 0 || s < 0) { return null }
	if (x === 0) { return 0 }
	if (Math.abs(s) < 1e-15) { return -exponentialIntegralE1(-x) }
	if (s === 1) { return 1 - Math.exp(-x) }

	return x < s + 1
		? _lowerIncompleteGammaSeries(s, x)
		: gamma(s) - _upperIncompleteGammaContinuedFraction(s, x)
}

const upperIncompleteGamma = (s, x) => {
	if (x < 0 || s < 0) { return null }
	if (x === 0) { return gamma(s) }

	if (Math.abs(s) < 1e-15) { return exponentialIntegralE1(x) }

	return x < s + 1
		? gamma(s) - _lowerIncompleteGammaSeries(s, x)
		: _upperIncompleteGammaContinuedFraction(s, x)
}

module.exports = {
	lowerIncompleteGamma,
	upperIncompleteGamma,
}
