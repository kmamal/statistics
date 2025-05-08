const { empty$$$ } = require('./empty')

const __mapEntries = (dst, src, fnMap) => {
	const entries = Object.entries(src)
	for (let i = 0; i < entries.length; i++) {
		const mapped = fnMap(entries[i])
		const key = mapped[0]
		const value = mapped[1]
		dst[key] = value
	}
}


const mapEntries = (obj, fnMap) => {
	const res = {}
	__mapEntries(res, obj, fnMap)
	return res
}

const mapEntriesTo = (dst, obj, fnMap) => {
	empty$$$(dst)
	__mapEntries(dst, obj, fnMap)
	return dst
}

const mapEntries$$$ = (_obj, fnMap) => {
	const res = _obj
	const obj = { ...obj }
	empty$$$(res)
	__mapEntries(res, obj, fnMap)
	return res
}

mapEntries.to = mapEntriesTo
mapEntries.$$$ = mapEntries$$$


module.exports = {
	__mapEntries,
	mapEntries,
}
