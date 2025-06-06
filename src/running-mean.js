
class RunningMean {
	constructor () {
		this._count = 0
		this._sum = 0
		this._mean = null
	}

	count () { return this._count }
	sum () { return this._sum }
	mean () { return (this._mean ??= this._sum / this._count) }

	add (x) {
		this._count++
		this._sum += x
		this._mean = null
	}

	remove (x) {
		this._count--
		this._sum -= x
		this._mean = null
	}
}

module.exports = { RunningMean }
