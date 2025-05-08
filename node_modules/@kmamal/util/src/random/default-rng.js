const { MiddleSquareWeyl } = require('./seeded/middle-square-weyl')

const defaultRng = new MiddleSquareWeyl(Math.random())

module.exports = { defaultRng }
