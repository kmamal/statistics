
const toEntries = (obj) => {
	const res = Object.keys(obj)
	const { length } = res
	for (let i = 0; i < length; i++) {
		const key = res[i]
		res[i] = [ key, obj[key] ]
	}
	return res
}

const toEntriesTo = (dst, obj) => {
	const keys = Object.keys(obj)
	const { length } = keys
	dst.length = keys.length
	for (let i = 0; i < length; i++) {
		const key = keys[i]
		dst[i] = [ key, obj[key] ]
	}
	return dst
}

toEntries.to = toEntriesTo

module.exports = { toEntries }
