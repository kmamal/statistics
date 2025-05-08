const { eq } = require('../operators/comparison/eq')

const matchesWith = (obj, pattern, fnEqProp) => {
	for (const entry of Object.entries(pattern)) {
		const key = entry[0]
		const value = entry[1]
		if (!fnEqProp(obj[key], value, key)) { return false }
	}
	return true
}

const matches = (obj, pattern) => matchesWith(obj, pattern, eq)

module.exports = {
	matchesWith,
	matches,
}
