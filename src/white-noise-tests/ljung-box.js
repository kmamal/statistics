const { sampleAutoCorrelationCoefficientHavingMeanAndVariance } = require('../self-similarity')
const { mean, sampleVariance } = require('../summary')
const chiSquaredDistribution = require('../distributions/chi-squared')

const test = (arr, lags) => {
	const N = arr.length
	const m = mean(arr)
	const v = sampleVariance(arr)

	let Q = 0
	for (let t = 1; t <= lags; t++) {
		const r = sampleAutoCorrelationCoefficientHavingMeanAndVariance(arr, t, m, v)
		Q += r * r / (N - t)
	}
	Q *= N * (N + 2)

	return (1 - chiSquaredDistribution.cdf(lags)(Q)) || 0
}

module.exports = { test }
