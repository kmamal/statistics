const { select } = require('@kmamal/util/array/select')


const median = (data) => select(data, Math.floor(data.length / 2))


const mean = (data) => {
	let sum = 0
	for (const x of data) { sum += x }
	return sum / data.length
}

const geometricMean = (data) => {
	let prod = 1
	for (const x of data) { prod *= x }
	return prod ** (1 / data.length)
}

const harmonicMean = (data) => {
	let sum = 0
	for (const x of data) { sum += 1 / x }
	return data.length / sum
}


const interQuartileRange = (values) => {
	const N = values.length
	const cloned = Array.from(values)
	const q1 = select.$$$(cloned, Math.floor(N * 1 / 4))
	const q2 = select.$$$(cloned, Math.floor(N * 3 / 4))
	return q2 - q1
}


const _variance = (data) => {
	const { length } = data
	const m = mean(data)
	let ssum = 0
	for (let i = 0; i < length; i++) {
		const d = data[i] - m
		ssum += d * d
	}
	return ssum
}

const variance = (data) => _variance(data) / data.length
const sampleVariance = (data) => _variance(data) / (data.length - 1)


const standardDeviation = (data) => Math.sqrt(variance(data))
const sampleStandardDeviation = (data) => Math.sqrt(sampleVariance(data))


const coefficientOfVariation = (data) => standardDeviation(data) / mean(data)
const sampleCoefficientOfVariation = (data) => sampleStandardDeviation(data) / mean(data)


const skewness = (data) => {
	let sum = 0
	const m = mean(data)
	for (const x of data) {
		const d = x - m
		sum += d * d * d
	}
	return (sum / data.length) / (variance(data) ** (3 / 2))
}


const kurtosis = (data) => {
	let sum = 0
	const m = mean(data)
	const v = variance(data)
	for (const x of data) {
		const d = x - m
		const d2 = d * d
		sum += d2 * d2
	}
	return (sum / data.length) / (v * v)
}


module.exports = {
	median,
	mean,
	geometricMean,
	harmonicMean,
	interQuartileRange,
	variance,
	sampleVariance,
	standardDeviation,
	sampleStandardDeviation,
	coefficientOfVariation,
	sampleCoefficientOfVariation,
	skewness,
	kurtosis,
}
