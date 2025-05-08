const { pass } = require('./pass')

const pipe = (...funcs) => (value) => pass(value, ...funcs)

pipe.await = pass.await

module.exports = { pipe }
