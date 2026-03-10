const { cycle } = require('./cycle')

const cycleTo = cycle.to
const cycle$$$ = cycle.$$$

const repeat = (arr, n) => cycle(arr, n * arr.length)

const repeatTo = (dst, arr, n) => cycleTo(dst, arr, n * arr.length)

const repeat$$$ = (arr, n) => cycle$$$(arr, n * arr.length)

repeat.to = repeatTo
repeat.$$$ = repeat$$$

module.exports = { repeat }
