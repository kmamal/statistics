const normalDistribution = require('../distributions/normal')

const test = (arr) => {
	const N = arr.length

	let turningPoints = 0
	for (let i = 1; i < N - 1; i++) {
		if (false
			|| (arr[i] > arr[i - 1] && arr[i] > arr[i + 1])
			|| (arr[i] < arr[i - 1] && arr[i] < arr[i + 1])
		) { turningPoints++ }
	}

	const m = (2 * (N - 2)) / 3
	const s = Math.sqrt((16 * N - 29) / 90)

	// Two-sided p-value
	const cdf = normalDistribution.cdf(m, s)
	const pOneSided = cdf(turningPoints)
	return 2 * Math.min(pOneSided, 1 - pOneSided)
}

module.exports = { test }
