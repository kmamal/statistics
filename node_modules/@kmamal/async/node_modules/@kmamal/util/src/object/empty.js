
const empty$$$ = (obj) => {
	for (const key of Object.keys(obj)) {
		delete obj[key]
	}
	return obj
}

module.exports = { empty$$$ }
