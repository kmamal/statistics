const { eq } = require('../operators/comparison/eq')

const compare = (a, b) => a < b ? -1 : a > b ? 1 : 0
const compareStrictLess = (a, b) => a <= b ? -1 : 1
const compareStrictGreater = (a, b) => a < b ? -1 : 1

const compareBy = (fnMap) => (a, b) => compare(fnMap(a), fnMap(b))
const compareByStrictLess = (fnMap) => (a, b) => compareStrictLess(fnMap(a), fnMap(b))
const compareByStrictGreater = (fnMap) => (a, b) => compareStrictGreater(fnMap(a), fnMap(b))

const strictLess = (fnCmp) => (a, b) => fnCmp(a, b) || -1
const strictGreater = (fnCmp) => (a, b) => fnCmp(a, b) || 1

const eqBy = (fnMap) => (a, b) => eq(fnMap(a), fnMap(b))

module.exports = {
	compare,
	compareStrictLess,
	compareStrictGreater,
	compareBy,
	compareByStrictLess,
	compareByStrictGreater,
	strictLess,
	strictGreater,
	eqBy,
}
