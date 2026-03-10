
const floorTo = (x, unit) => {
	const signX = Math.sign(x)
	const absX = Math.abs(x)
	const absUnit = Math.abs(unit)
	return signX * Math.floor(absX / absUnit) * absUnit
}

const ceilTo = (x, unit) => {
	const signX = Math.sign(x)
	const absX = Math.abs(x)
	const absUnit = Math.abs(unit)
	return signX * Math.ceil(absX / absUnit) * absUnit
}

const roundTo = (x, unit) => {
	const signX = Math.sign(x)
	const absX = Math.abs(x)
	const absUnit = Math.abs(unit)
	return signX * Math.round(absX / absUnit) * absUnit
}

const roundUp = (x) => Math.sign(x) * Math.ceil(Math.abs(x))
const roundDown = (x) => Math.sign(x) * Math.floor(Math.abs(x))

module.exports = {
	floorTo,
	ceilTo,
	roundTo,
	roundUp,
	roundDown,
}
