const { empty$$$ } = require('./empty')

const __fromEntries = (dst, entries) => {
	for (let i = 0; i < entries.length; i++) {
		const [ key, value ] = entries[i]
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
