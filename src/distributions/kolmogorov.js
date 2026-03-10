
const cdf = (x) => {
	if (x <= 0) { return 0 }
	let sum = 0
	for (let k = 1; k <= 100; k++) {
		const term = (k % 2 === 1 ? 1 : -1) * Math.exp(-2 * k * k * x * x)
		sum += term
		if (Math.abs(term) < 1e-10) { break }
	}
	return Math.max(0, Math.min(1, 1 - 2 * sum))
}

module.exports = { cdf }
