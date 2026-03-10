const { periodogram } = require('@kmamal/spectral-density-estimation/periodogram')
const fishersGDistribution = require('../distributions/fishers-g')

const test = (arr) => {
	const { powers } = periodogram(arr)

	// Skip the DC component at index 0
	const ordinates = powers.slice(1)

	let max = 0
	let sum = 0
	for (const x of ordinates) {
		if (x > max) { max = x }
		sum += x
	}
	const g = max / sum

	return 1 - fishersGDistribution.cdf(ordinates.length)(g)
}

module.exports = { test }
