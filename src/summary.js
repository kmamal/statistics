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


const _sumOfSquaredDiffs = (data, dataMean) => {
	const { length } = data
	let sumOfSquaredDiffs = 0
	for (let i = 0; i < length; i++) {
		const diff = data[i] - dataMean
		sumOfSquaredDiffs += diff * diff
	}
	return sumOfSquaredDiffs
}

const varianceHavingMean = (data, _mean) => _sumOfSquaredDiffs(data, _mean) / data.length
const sampleVarianceHavingMean = (data, _mean) => _sumOfSquaredDiffs(data, _mean) / (data.length - 1)

const variance = (data) => _sumOfSquaredDiffs(data, mean(data)) / data.length
const sampleVariance = (data) => _sumOfSquaredDiffs(data, mean(data)) / (data.length - 1)


const standardDeviationFromVariance = (_variance) => Math.sqrt(_variance)
const sampleStandardDeviationFromSampleVariance = (_sampleVariance) => Math.sqrt(_sampleVariance)

const standardDeviationHavingMean = (data, _mean) => Math.sqrt(varianceHavingMean(data, _mean))
const sampleStandardDeviationHavingMean = (data, _mean) => Math.sqrt(sampleVarianceHavingMean(data, _mean))

const standardDeviation = (data) => Math.sqrt(variance(data))
const sampleStandardDeviation = (data) => Math.sqrt(sampleVariance(data))


const coefficientOfVariationFromStandardDeviationAndMean = (_standardDeviation, _mean) => _standardDeviation / _mean
const sampleCoefficientOfVariationFromSampleStandardDeviationAndMean = (_sampleStandardDeviation, _mean) => _sampleStandardDeviation / _mean

const coefficientOfVariationHavingStandardDeviation = (data, _standardDeviation) => _standardDeviation / mean(data)
const sampleCoefficientOfVariationHavingSampleStandardDeviation = (data, _sampleStandardDeviation) => _sampleStandardDeviation / mean(data)

const coefficientOfVariationHavingMean = (data, _mean) => standardDeviationHavingMean(data, _mean) / _mean
const sampleCoefficientOfVariationHavingMean = (data, _mean) => sampleStandardDeviationHavingMean(data, _mean) / _mean

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
	varianceHavingMean,
	variance,
	sampleVarianceHavingMean,
	sampleVariance,
	standardDeviationFromVariance,
	standardDeviationHavingMean,
	standardDeviation,
	sampleStandardDeviationFromSampleVariance,
	sampleStandardDeviationHavingMean,
	sampleStandardDeviation,
	coefficientOfVariationFromStandardDeviationAndMean,
	coefficientOfVariationHavingStandardDeviation,
	coefficientOfVariationHavingMean,
	coefficientOfVariation,
	sampleCoefficientOfVariationFromSampleStandardDeviationAndMean,
	sampleCoefficientOfVariationHavingSampleStandardDeviation,
	sampleCoefficientOfVariationHavingMean,
	sampleCoefficientOfVariation,
	skewness,
	kurtosis,
}
