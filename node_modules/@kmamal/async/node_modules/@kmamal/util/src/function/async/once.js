const { before } = require('./before')

const once = (fn) => before(fn, 2)

module.exports = { once }
