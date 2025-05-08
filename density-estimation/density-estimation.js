const { standardDeviation, interQuartileRange } = require('../summary')

const optimalKernelWidth = (values) => {
	const N = values.length
	const iqr = interQuartileRange(values)
	const s = standardDeviation(values)
	const a = Math.min(s, iqr / 1.34)
	return 0.9 * a * N ** (-1 / 5)
}

const optimalKernelParams = (values) => ({
	width: optimalKernelWidth(values),
})

const evaluate = (values, x, kernel, width) => {
	const W = values.length * width
	let sum = 0
	for (const x1 of values) {
		sum += kernel(x1 - x) / W
	}
	return sum
}

const makeBayesianKernel = (s) =>
	(d) => Math.exp(-d * d / 2) / (s * Math.sqrt(2 * Math.PI))

const makeTriangularKernel = (w) =>
	(d) => Math.max(0, 1 - Math.abs(d / w))

module.exports = {
	optimalKernelWidth,
	optimalKernelParams,
	makeBayesianKernel,
	makeTriangularKernel,
	evaluate,
}
