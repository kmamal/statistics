
const _EMPTY = []
const _toIndex = (key) => typeof key === 'string' && parseInt(key, 10)

const makeProxy = ({ get, set, length }) => new Proxy(_EMPTY, {
	get: (wrapped, key) => {
		const index = _toIndex(key)
		if (Number.isFinite(index)) { return get(index) }
		if (key === 'length') { return length() }
		return wrapped[key]
	},
	set: (wrapped, key, value) => {
		const index = _toIndex(key)
		if (Number.isFinite(index)) {
			set(index, value)
		} else {
			wrapped[key] = value
		}
		return true
	},
})

module.exports = { makeProxy }
