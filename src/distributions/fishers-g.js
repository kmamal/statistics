
const { logBinomialCoefficient } = require('../special-functions/binomial-coefficient')

const cdf = (m) => (g) => {
	const limit = Math.floor(1 / g)
	let sf = 0
	for (let k = 1; k <= limit; k++) {
		const base = 1 - k * g
		if (base <= 0) { break }
		const logTerm = logBinomialCoefficient(m, k) + (m - 1) * Math.log(base)
		const sign = k % 2 === 1 ? 1 : -1
		sf += sign * Math.exp(logTerm)
		if (Math.abs(sf) > 1e15) { break }
	}
	sf = isNaN(sf) ? 0 : Math.max(0, Math.min(1, sf))
	return 1 - sf
}

module.exports = { cdf }
