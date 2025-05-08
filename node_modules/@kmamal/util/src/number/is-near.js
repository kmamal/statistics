
const isNear = (x, y, eps = 1e-5) => Math.abs(x - y) < eps

module.exports = { isNear }
