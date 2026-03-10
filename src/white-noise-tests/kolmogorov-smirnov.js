const { periodogram } = require('@kmamal/spectral-density-estimation/periodogram')
const kolmogorovDistribution = require('../distributions/kolmogorov')

const test = (arr) => {
	const { powers } = periodogram(arr)

	// Skip the DC component at index 0
	const ordinates = powers.slice(1)
	const m = ordinates.length

	let totalSum = 0
	for (const I of ordinates) { totalSum += I }

	let sum = 0
	let D = 0
	for (let j = 0; j < m; j++) {
		sum += ordinates[j]
		const diff = Math.abs(sum / totalSum - (j + 1) / m)
		if (diff > D) { D = diff }
	}

	const z = D * Math.sqrt(m)
	return 1 - kolmogorovDistribution.cdf(z)
}

module.exports = { test }
