const { mean, standardDeviation, sampleStandardDeviation } = require('./summary')


const _covariance = (a, b) => {
	if (a.length !== b.length) { throw new Error("bad lengths") }

	const ma = mean(a)
	const mb = mean(b)
	let msum = 0
	for (let i = 0; i < a.length; i++) {
		msum += (a[i] - ma) * (b[i] - mb)
	}
	return msum
}

const covariance = (a, b) => _covariance(a, b) / a.length
const sampleCovariance = (a, b) => _covariance(a, b) / (a.length - 1)


const correlationCoefficient = (a, b) => covariance(a, b) / (standardDeviation(a) * standardDeviation(b))
const sampleCorrelationCoefficient = (a, b) => sampleCovariance(a, b) / (sampleStandardDeviation(a) * sampleStandardDeviation(b))


const _crossCorrelation = (a, b, t) => {
	if (a.length !== b.length) { throw new Error("bad lengths") }

	let msum = 0
	for (let i = 0; i < a.length - t; i++) {
		msum += a[i] * b[i + t]
	}
	return msum
}

const crossCorrelation = (a, b, t) => _crossCorrelation(a, b, t) / a.length
const sampleCrossCorrelation = (a, b, t) => _crossCorrelation(a, b, t) / (a.length - 1)


const _crossCovariance = (a, b, t) => {
	if (a.length !== b.length) { throw new Error("bad lengths") }

	const ma = mean(a)
	const mb = mean(b)
	let msum = 0
	for (let i = 0; i < a.length - t; i++) {
		msum += (a[i] - ma) * (b[i + t] - mb)
	}
	return msum
}

const crossCovariance = (a, b, t) => _crossCovariance(a, b, t) / a.length
const sampleCrossCovariance = (a, b, t) => _crossCovariance(a, b, t) / (a.length - 1)


const crossCorrelationCoefficient = (a, b, t) => crossCovariance(a, b, t) / (standardDeviation(a) * standardDeviation(b))
const sampleCrossCorrelationCoefficient = (a, b, t) => sampleCrossCovariance(a, b, t) / (sampleStandardDeviation(a) * sampleStandardDeviation(b))


const meanSquaredError = (a, b) => {
	if (a.length !== b.length) { throw new Error("bad lengths") }

	let ssum = 0
	const { length } = a
	for (let i = 0; i < length; i++) {
		const d = a[i] - b[i]
		ssum += d * d
	}
	return ssum / length
}


module.exports = {
	covariance,
	sampleCovariance,
	correlationCoefficient,
	sampleCorrelationCoefficient,
	crossCorrelation,
	sampleCrossCorrelation,
	crossCovariance,
	sampleCrossCovariance,
	crossCorrelationCoefficient,
	sampleCrossCorrelationCoefficient,
	meanSquaredError,
}
