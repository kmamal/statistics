
class RunningLeastSquares {
	constructor () {
		this._count = 0
		this._sumY = 0
		this._sumTY = 0
		this._slope = null
		this._intercept = null
	}

	count () { return this._count }
	slope () { return (this._slope ??= this._computeSlope()) }
	intercept () { return (this._intercept ??= this._computeIntercept()) }

	_computeSlope () {
		const n = this._count
		if (n < 2) { return 0 }
		const sumT = n * (n - 1) / 2
		const sumTT = n * (n - 1) * (2 * n - 1) / 6
		const denom = n * sumTT - sumT * sumT
		return denom !== 0 ? (n * this._sumTY - sumT * this._sumY) / denom : 0
	}

	_computeIntercept () {
		const n = this._count
		if (n === 0) { return 0 }
		const sumT = n * (n - 1) / 2
		return (this._sumY - this.slope() * sumT) / n
	}

	add (x) {
		this._sumTY += this._count * x
		this._sumY += x
		this._count++
		this._intercept = null
		this._slope = null
	}

	remove (x) {
		this._sumTY = this._sumTY - this._sumY + x
		this._sumY -= x
		this._count--
		this._intercept = null
		this._slope = null
	}
}

module.exports = { RunningLeastSquares }
