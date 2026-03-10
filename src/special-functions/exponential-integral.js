
const GAMMA = 0.5772156649015328 // Euler-Mascheroni constant

const exponentialIntegralE1 = (x) => {
	if (x <= 0) { return null }

	return x < 1
		? _expIntegralE1Series(x)
		: _expIntegralE1ContinuedFraction(x)
}

const _expIntegralE1Series = (x) => {
	let sum = 0
	let term = 1
	for (let n = 1; n < 100; n++) {
		term *= -x / n
		sum += term / n
	}
	return -GAMMA - Math.log(x) - sum
}

const _expIntegralE1ContinuedFraction = (x) => {
	let f = 1e-30
	let c = f
	let d = 0

	for (let n = 1; n <= 100; n++) {
		const a = n === 1 ? 1 : -(n - 1) * (n - 1)
		const b = x + 2 * n - 1

		d = b + a * d
		if (d === 0) { d = 1e-30 }
		c = b + a / c
		if (c === 0) { c = 1e-30 }

		d = 1 / d
		const delta = c * d
		f *= delta
	}

	return Math.exp(-x) * f
}

const exponentialIntegralEi = (x) => {
	if (x === 0) { return -Infinity }

	if (x < 0) { return -exponentialIntegralE1(-x) }

	return _expIntegralEiSeries(x)
}

const _expIntegralEiSeries = (x) => {
	let sum = 0
	let term = 1
	for (let n = 1; n < 200; n++) {
		term *= x / n
		sum += term / n
	}
	return GAMMA + Math.log(Math.abs(x)) + sum
}

module.exports = {
	exponentialIntegralE1,
	exponentialIntegralEi,
}
