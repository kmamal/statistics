const { reduce } = require('./reduce')
const { add } = require('../operators/arithmetic/add')

const sumBy = (arr, fnMap) => reduce(arr, (a, x) => a + fnMap(x), 0)

const sum = (arr) => reduce(arr, add, 0)

module.exports = {
	sumBy,
	sum,
}
