const { mean, variance, sampleVariance } = require('./summary')
const { UpperRight } = require('@kmamal/triangular')


const _autoCorrelation = (data, t) => {
	let msum = 0
	for (let i = 0; i < data.length - t; i++) {
		msum += data[i] * data[i + t]
	}
	return msum
}

const autoCorrelation = (data, t) => _autoCorrelation(data, t) / data.length
const sampleAutoCorrelation = (data, t) => _autoCorrelation(data, t) / (data.length - 1)


const _autoCovariance = (data, t) => {
	const m = mean(data)
	let msum = 0
	for (let i = 0; i < data.length - t; i++) {
		msum += (data[i] - m) * (data[i + t] - m)
	}
	return msum
}

const autoCovariance = (data, t) => _autoCovariance(data, t) / data.length
const sampleAutoCovariance = (data, t) => _autoCovariance(data, t) / (data.length - 1)


const autoCorrelationCoefficient = (data, t) => autoCovariance(data, t) / variance(data)
const sampleAutoCorrelationCoefficient = (data, t) => sampleAutoCovariance(data, t) / sampleVariance(data)


const _autoCorrelationPlot = (data, tMax, ss) => {
	const { length } = data
	const m = mean(data)
	const factor = ss * length

	const result = new Array(tMax + 1)
	result[0] = 1
	for (let t = 1; t <= tMax; t++) {
		let msum = 0
		for (let i = 0; i < data.length - t; i++) {
			msum += (data[i] - m) * (data[i + t] - m)
		}
		result[t] = msum / factor
	}
	return result
}

const autoCorrelationPlot = (data, tMax) => _autoCorrelationPlot(data, tMax, variance(data))
const sampleAutoCorrelationPlot = (data, tMax) => _autoCorrelationPlot(data, tMax, sampleVariance(data))


const _partialAutoCorrelationFunction = (data, tMax, autoCorrelations) => {
	const coefficients = new UpperRight(tMax + 1)

	coefficients.set(1, 1, autoCorrelations[1])
	for (let n = 2; n <= tMax; n++) {
		const nr = autoCorrelations[n]
		let s1 = 0
		let s2 = 0
		for (let k = 1; k < n; k++) {
			const c = coefficients.get(n - 1, k)
			s1 += c * autoCorrelations[n - k]
			s2 += c * autoCorrelations[k]
		}
		const c = (nr - s1) / (1 - s2)

		coefficients.set(n, n, c)

		for (let k = 1; k < n; k++) {
			const c1 = coefficients.get(n - 1, k)
			const c2 = coefficients.get(n - 1, n - k)
			coefficients.set(n, k, c1 - c * c2)
		}
	}

	const result = new Array(tMax + 1)
	result[0] = 1
	for (let i = 1; i <= tMax; i++) {
		result[i] = coefficients.get(i, i)
	}
	return result
}

const partialAutoCorrelationFunction = (data, tMax) => _partialAutoCorrelationFunction(data, tMax, autoCorrelationPlot(data, tMax))
const samplePartialAutoCorrelationFunction = (data, tMax) => _partialAutoCorrelationFunction(data, tMax, sampleAutoCorrelationPlot(data, tMax))


module.exports = {
	autoCorrelation,
	sampleAutoCorrelation,
	autoCovariance,
	sampleAutoCovariance,
	autoCorrelationCoefficient,
	sampleAutoCorrelationCoefficient,
	autoCorrelationPlot,
	sampleAutoCorrelationPlot,
	partialAutoCorrelationFunction,
	samplePartialAutoCorrelationFunction,
}
