const { logBeta } = require('../special-functions/beta')

const pdf = (a, b) => {
	const logBetaAb = logBeta(a, b)
	const a1 = a - 1
	const b1 = b - 1

	const zeroValue = a > 1 ? 0 : a === 1 ? b : Infinity
	const oneValue = b > 1 ? 0 : b === 1 ? a : Infinity

	return (x) => {
		if (x <= 0) { return zeroValue }
		if (x >= 1) { return oneValue }
		return Math.exp(a1 * Math.log(x) + b1 * Math.log(1 - x) - logBetaAb)
	}
}

const cdf = (a, b) => {
	const logBetaAb = logBeta(a, b)

	return (x) => {
		if (x <= 0) { return 0 }
		if (x >= 1) { return 1 }

		let sum = 0
		for (let k = 0; k < a; k++) {
			sum += Math.exp(logBeta(a - k, b) - logBetaAb + Math.log(x) * (a - k - 1))
		}
		return sum
	}
}

module.exports = {
	pdf,
	cdf,
}
