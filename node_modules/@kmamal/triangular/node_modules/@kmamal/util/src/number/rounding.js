
const floorTo = (x, unit) => Math.floor(x / unit) * unit
const ceilTo = (x, unit) => Math.ceil(x / unit) * unit
const roundTo = (x, unit) => Math.round(x / unit) * unit

module.exports = {
	floorTo,
	ceilTo,
	roundTo,
}
