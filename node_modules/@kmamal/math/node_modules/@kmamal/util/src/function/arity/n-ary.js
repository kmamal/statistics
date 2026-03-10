const { nullary } = require('./nullary')
const { unary } = require('./unary')
const { binary } = require('./binary')
const { ternary } = require('./ternary')

const nAry = (fn, n) => {
	switch (n) {
		case 0: return nullary(fn)
		case 1: return unary(fn)
		case 2: return binary(fn)
		case 3: return ternary(fn)
		default: return (...args) => fn(...args.slice(0, n))
	}
}

module.exports = { nAry }
