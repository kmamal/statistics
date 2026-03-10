
const addDefault = (map, fn) => {
	map.get = (key) => {
		if (!map.has(key)) {
			const value = fn(key)
			map.set(key, value)
			return value
		}
		return Map.prototype.get.call(map, key)
	}
}

module.exports = { addDefault }
