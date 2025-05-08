
const s = 0xda1ce2a9
const TWO_POW_12 = 2 ** 12
const TWO_POW_32 = 2 ** 32
const TWO_POW_52 = 2 ** 52

class MiddleSquareWeyl {
	constructor (seed) {
		this.seed(seed ?? 0)
	}

	seed (uniform) {
		const seed = Math.floor(uniform * (2 ** 20))
		this._x = seed & 0x000fffff
		this._w = 0
	}

	next () {
		let { _x: x, _w: w } = this
		x *= x
		w = (w + s) | 0
		x += w
		x &= 0x3ffffC00
		x >>= 10
		this._x = x
		this._w = w
		return x
	}

	uniform () {
		const a = this.next()
		const b = this.next()
		const c = this.next()
		return (0
			+ (a * TWO_POW_32)
			+ (b * TWO_POW_12)
			+ (c & 0x0fff)
		) / TWO_POW_52
	}

	static WORD = 20
}

module.exports = { MiddleSquareWeyl }
