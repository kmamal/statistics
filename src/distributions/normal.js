
const C = Math.sqrt(2 * Math.PI)
const SQRT_2 = Math.sqrt(2)


const pdf = (m, s) => {
	const c1 = 2 * s * s
	const c2 = s * C

	return (x) => Math.exp(-((x - m) ** 2) / c1) / c2
}

const cdf = (m, s) => {
	const c1 = s * SQRT_2
	return (x) => 0.5 * (1 + erf((x - m) / c1))
}


// A&S formula 7.1.26

const A1 = 0.254829592
const A2 = -0.284496736
const A3 = 1.421413741
const A4 = -1.453152027
const A5 = 1.061405429
const P = 0.3275911

const erf = (_x) => {
	const sign = _x >= 0 ? 1 : -1
	const x = Math.abs(_x)

	const t = 1 / (1 + P * x)
	const y = 1 - (((((A5 * t + A4) * t) + A3) * t + A2) * t + A1) * t * Math.exp(-x * x)
	return sign * y
}

module.exports = {
	pdf,
	cdf,
	erf,
}
