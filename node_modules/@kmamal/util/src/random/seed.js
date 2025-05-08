const { defaultRng } = require('./default-rng')

const seed = (uniform) => defaultRng.seed(uniform)

module.exports = { seed }
