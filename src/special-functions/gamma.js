
const G = 7
const C = [
	0.99999999999980993,
	676.5203681218851,
	-1259.1392167224028,
	771.32342877765313,
	-176.61502916214059,
	12.507343278686905,
	-0.13857109526572012,
	9.9843695780195716e-6,
	1.5056327351493116e-7,
]

const SQRT_TWO_PI = Math.sqrt(2 * Math.PI)
const HALF_LOG_TWO_PI = 0.5 * Math.log(2 * Math.PI)

const gammaLanczos = (z) => {
	if (z < 0.5) {
		return Math.PI / (Math.sin(Math.PI * z) * gammaLanczos(1 - z))
	}

	z -= 1

	let x = C[0]
	for (let i = 1; i < G + 2; i++) {
		x += C[i] / (z + i)
	}

	const t = z + G + 0.5
	return SQRT_TWO_PI * t ** (z + 0.5) * Math.exp(-t) * x
}

const logGammaLanczos = (z) => {
	if (z < 0.5) {
		return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * z)) - logGammaLanczos(1 - z)
	}

	z -= 1

	let x = C[0]
	for (let i = 1; i < G + 2; i++) {
		x += C[i] / (z + i)
	}

	const t = z + G + 0.5
	return HALF_LOG_TWO_PI + (z + 0.5) * Math.log(t) - t + Math.log(x)
}

module.exports = {
	gamma: gammaLanczos,
	logGamma: logGammaLanczos,
}
