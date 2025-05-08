const { zip: zipObject } = require('../object/zip')

const allValues = async (obj) => {
	const entries = Object.entries(obj)
	const { length } = entries
	const keys = new Array(length)
	const promises = new Array(length)
	for (let i = 0; i < length; i++) {
		const entry = entries[i]
		keys[i] = entry[0]
		promises[i] = entry[1]
	}
	const values = await Promise.all(promises)
	return zipObject(keys, values)
}

module.exports = { allValues }
