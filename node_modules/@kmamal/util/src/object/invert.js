
const _add = (obj, key, value) => {
	const existing = obj[key]
	if (Array.isArray(existing)) {
		existing.push(value)
	} else if (existing !== undefined) {
		obj[key] = [ existing, value ]
	} else {
		obj[key] = value
	}
}

const invert = (obj) => {
	const res = {}
	const keys = Object.keys(obj)
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i]
		const value = obj[key]
		if (Array.isArray(value)) {
			for (let j = 0; j < value.length; j++) {
				_add(res, value[j], key)
			}
		} else {
			_add(res, value, key)
		}
	}
	return res
}

module.exports = { invert }
