const { logGamma } = require('../special-functions/gamma')
const { lowerIncompleteGamma } = require('../special-functions/incomplete-gamma')

const pdf = (a, theta) => {
	const rate = 1 / theta
	const logGammaA = logGamma(a)
	const logThetaA = a * Math.log(theta)

	const c1 = a - 1
	const c2 = -logThetaA - logGammaA

	const zeroValue = a > 1 ? 0 : a === 1 ? rate : Infinity

	return (x) => {
		if (x < 0) { return 0 }
		if (x === 0) { return zeroValue }

		return Math.exp(c1 * Math.log(x) - rate * x + c2)
	}
}

const cdf = (a, theta) => {
	const rate = 1 / theta
	const logGammaA = logGamma(a)

	return (x) => {
		if (x <= 0) { return 0 }

		return Math.exp(Math.log(lowerIncompleteGamma(a, rate * x)) - logGammaA)
	}
}

module.exports = {
	pdf,
	cdf,
}
