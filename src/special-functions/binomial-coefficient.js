
const binomialCoefficient = (n, k) => {
	if (k === 0 || k === n) { return 1 }

	const kk = k > n - k ? n - k : k
	let result = 1
	for (let i = 0; i < kk; i++) {
		result *= (n - i) / (i + 1)
	}
	return Math.round(result)
}

const logBinomialCoefficient = (n, k) => {
	if (k === 0 || k === n) { return 0 }

	const kk = k > n - k ? n - k : k
	let result = 0
	for (let i = 0; i < kk; i++) {
		result += Math.log(n - i) - Math.log(i + 1)
	}
	return result
}

module.exports = {
	binomialCoefficient,
	logBinomialCoefficient,
}
