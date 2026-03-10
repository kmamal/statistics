const { periodogram } = require('./periodogram')

const bartlett = (arr, options = {}) => {
	const N = arr.length

	const {
		k = 3,
	} = options

	const M = Math.floor(N / k)

	let start = 0
	let end = M
	const { powers: result, frequencyStep } = periodogram(arr.slice(start, end))
	const P = result.length

	for (let i = 1; i < k; i++) {
		start = end
		end += M
		const { powers } = periodogram(arr.slice(start, end))
		for (let j = 0; j < P; j++) { result[j] += powers[j] }
	}

	for (let j = 0; j < P; j++) { result[j] /= k }

	return {
		powers: result,
		frequencyStep,
	}
}

module.exports = { bartlett }
