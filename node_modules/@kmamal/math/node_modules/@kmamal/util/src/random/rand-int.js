const { rand } = require('./rand')

const randInt = (a, b, options) => rand(b - a, options) + a

module.exports = { randInt }
