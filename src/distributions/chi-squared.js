const gammaDistribution = require('./gamma')

const pdf = (k) => gammaDistribution.pdf(k / 2, 2)
const cdf = (k) => gammaDistribution.cdf(k / 2, 2)

module.exports = {
	pdf,
	cdf,
}
