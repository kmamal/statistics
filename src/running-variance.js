const { RunningMean } = require('./running-mean')

class RunningVariance {
	constructor () {
		this._mean = new RunningMean()
		this._sumSquaredDiffs = 0
		this._variance = null
		this._sampleVariance = null
	}

	count () { return this._mean.count() }
	mean () { return this._mean.mean() }
	variance () { return (this._variance ??= this._sumSquaredDiffs / this._mean.count()) }
	sampleVariance () { return (this._sampleVariance ??= this._sumSquaredDiffs / (this._mean.count() - 1)) }

	add (x) {
		const oldMean = this._mean.mean()
		this._mean.add(x)
		const newMean = this._mean.mean()
		this._sumSquaredDiffs += (x - oldMean) * (x - newMean)
		this._variance = null
		this._sampleVariance = null
	}

	remove (x) {
		const oldMean = this._mean.mean()
		this._mean.remove(x)
		const newMean = this._mean.mean()
		this._sumSquaredDiffs -= (x - oldMean) * (x - newMean)
		this._variance = null
		this._sampleVariance = null
	}
}

module.exports = { RunningVariance }
