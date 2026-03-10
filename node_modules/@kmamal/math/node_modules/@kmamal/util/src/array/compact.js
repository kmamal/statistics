const { filter } = require('./filter')

const filterTo = filter.to
const filter$$$ = filter.$$$

const compact = (arr) => filter(arr, Boolean)

const compactTo = (dst, arr) => filterTo(dst, arr, Boolean)

const compact$$$ = (arr) => filter$$$(arr, Boolean)

compact.to = compactTo
compact.$$$ = compact$$$

module.exports = { compact }
