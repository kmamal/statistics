const { random } = require('./random')

const rand = (n, options) => {
	const getRandom = options?.random ?? random
	return Math.floor(getRandom() * n)
}

module.exports = { rand }
