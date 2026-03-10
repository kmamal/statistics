const { gamma, logGamma } = require('./gamma')

const beta = (a, b) => gamma(a) * gamma(b) / gamma(a + b)
const logBeta = (a, b) => logGamma(a) + logGamma(b) - logGamma(a + b)

module.exports = {
	beta,
	logBeta,
}
