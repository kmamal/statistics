const Num = require('@kmamal/numbers/js')
const { fftReal } = require('@kmamal/fft/fft').defineFor(Num)
const { magnitudeSquared } = require('@kmamal/fft/magnitude').defineFor(Num)

const magnitudeSquared$$$ = magnitudeSquared.$$$

const { map } = require('@kmamal/util/array/map')

const map$$$ = map.$$$

const periodogram = (_arr) => {
	const originalN = _arr.length
	const powerOfTwoN = 2 ** Math.ceil(Math.log2(originalN))
	const arr = powerOfTwoN !== originalN
		? [ ..._arr, ...new Array(powerOfTwoN - originalN).fill(0) ]
		: _arr

	const fft = fftReal(arr)
	fft.length = Math.floor(powerOfTwoN / 2)
	magnitudeSquared$$$(fft)
	map$$$(fft, (x) => x / originalN)

	return {
		powers: fft,
		frequencyStep: 1 / powerOfTwoN,
	}
}

module.exports = { periodogram }
