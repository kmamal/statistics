const { fillWith } = require('./fill-with')

const fillWith$$$ = fillWith.$$$

const create = (n, fn) => fillWith$$$(new Array(n), fn)

module.exports = { create }
