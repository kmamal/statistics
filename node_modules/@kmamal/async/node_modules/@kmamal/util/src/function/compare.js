const { eq } = require('../operators/comparison/eq')

const compare = (a, b) => a < b ? -1 : a > b ? 1 : 0

const compareBy = (fnMap) => (a, b) => compare(fnMap(a), fnMap(b))

const eqBy = (fnMap) => (a, b) => eq(fnMap(a), fnMap(b))

module.exports = {
	compare,
	compareBy,
	eqBy,
}
