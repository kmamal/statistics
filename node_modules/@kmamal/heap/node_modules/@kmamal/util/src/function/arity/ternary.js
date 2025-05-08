
const ternary = (fn) => (a, b, c) => fn(a, b, c)

module.exports = { ternary }
