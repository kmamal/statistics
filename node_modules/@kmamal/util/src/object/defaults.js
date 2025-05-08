const { __copy } = require('./copy')
const { empty$$$ } = require('./empty')

const defaults = (obj, def) => ({ ...def, ...obj })

const defaultsTo = (dst, obj, def) => {
	empty$$$(dst)
	__copy(dst, def)
	__copy(dst, obj)
	return dst
}

const defaults$$$ = (obj, def) => {
	const keys = Object.keys(def)
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i]
		if (obj[key] !== undefined) { continue }
		obj[key] = def[key]
	}
	return obj
}

defaults.to = defaultsTo
defaults.$$$ = defaults$$$

module.exports = { defaults }
