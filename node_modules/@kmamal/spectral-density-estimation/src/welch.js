const { periodogram } = require('./periodogram')

const welch = (arr, options = {}) => {
	const N = arr.length

	const {
		k = 3,
		overlap = 0.5,
	} = options

	const M = Math.floor(N / (k - (k - 1) * overlap))
	const D = Math.ceil(M * overlap)
	const S = M - D

	const hanningWindow = new Array(M)
	const f = (M - 1) / Math.PI
	for (let m = 0; m < M; m++) {
		hanningWindow[m] = Math.sin(m / f) ** 2
	}

	let start = 0
	let end = M

	let slice = arr.slice(start, end)
	for (let m = 0; m < M; m++) { slice[m] *= hanningWindow[m] }
	const { powers: result, frequencyStep } = periodogram(slice)
	const P = result.length

	for (let i = 1; i < k; i++) {
		start += S
		end += S
		slice = arr.slice(start, end)
		for (let m = 0; m < M; m++) { slice[m] *= hanningWindow[m] }
		const { powers } = periodogram(slice)
		for (let p = 0; p < P; p++) { result[p] += powers[p] }
	}

	for (let p = 0; p < P; p++) { result[p] /= k }

	return {
		powers: result,
		frequencyStep,
	}
}

module.exports = { welch }
