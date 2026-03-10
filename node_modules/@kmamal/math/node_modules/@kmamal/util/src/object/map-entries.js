const { empty$$$ } = require('./empty')

const __mapEntries = (dst, src, fnMap) => {
	for (const entry of Object.entries(src)) {
		const mapped = fnMap(entry)
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

mapEntries.to = mapEntriesTo


module.exports = {
	__mapEntries,
	mapEntries,
}
