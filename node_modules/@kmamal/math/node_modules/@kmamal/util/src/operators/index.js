const arithmetic = require('./arithmetic')
const bitwise = require('./bitwise')
const comparison = require('./comparison')
const logical = require('./logical')

module.exports = {
	arithmetic,
	bitwise,
	comparison,
	logical,
	...arithmetic,
	...bitwise,
	...comparison,
	...logical,
}
