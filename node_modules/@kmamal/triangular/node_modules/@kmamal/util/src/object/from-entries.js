const { empty$$$ } = require('./empty')

const __fromEntries = (dst, entries) => {
	for (const entry of entries) {
		const key = entry[0]
		const value = entry[1]
		dst[key] = value
	}
}


const fromEntries = (entries) => {
	const res = {}
	__fromEntries(res, entries)
	return res
}

const fromEntriesTo = (dst, entries) => {
	empty$$$(dst)
	__fromEntries(dst, entries)
	return dst
}

fromEntries.to = fromEntriesTo


module.exports = {
	__fromEntries,
	fromEntries,
}
