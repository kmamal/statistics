const { empty$$$ } = require('./empty')

const __mapKeys = (dst, src, fnMap) => {
	const keys = Object.keys(src)
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i]
		dst[fnMap(key)] = src[key]
	}
}


const mapKeys = (obj, fnMap) => {
	const res = {}
	__mapKeys(res, obj, fnMap)
	return res
}

const mapKeysTo = (dst, obj, fnMap) => {
	empty$$$(dst)
	__mapKeys(dst, obj, fnMap)
	return dst
}

const mapKeys$$$ = (_obj, fnMap) => {
	const res = _obj
	const obj = { ...obj }
	empty$$$(res)
	__mapKeys(res, obj, fnMap)
	return res
}

mapKeys.to = mapKeysTo
mapKeys.$$$ = mapKeys$$$


module.exports = {
	__mapKeys,
	mapKeys,
}
