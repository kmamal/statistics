const { memoize } = require('@kmamal/util/function/memoize')

const PATTERN = /^(?<sre>-?\d+)(?<sim>[+-]\d+)i$/u

const _tmp1 = {}
const _tmp2 = {}
const _tmpNorm = {}

const defineFor = memoize((Domain) => {
	const {
		__info: { isPrimitive },
		clone: _clone,
		copy: _copy,
		fromNumber: _fromNumber,
		fromString: _fromString,
		isFinite: _isFinite,
		isNaN: _isNaN,
		isMember: _isMember,
		sign: _sign,
		neg: _neg,
		add: _add,
		sub: _sub,
		mul: _mul,
		div: _div,
		square: _square,
		sqrt: _sqrt,
		eq: _eq,
		neq: _neq,
		gte: _gte,
	} = Domain

	const _signTo = _sign.to
	const _negTo = _neg.to
	const _neg$$$ = _neg.$$$
	const _addTo = _add.to
	const _add$$$ = _add.$$$
	const _subTo = _sub.to
	const _sub$$$ = _sub.$$$
	const _mulTo = _mul.to
	const _mul$$$ = _mul.$$$
	const _divTo = _div.to
	const _div$$$ = _div.$$$
	const _squareTo = _square.to
	const _square$$$ = _square.$$$
	const _sqrt$$$ = _sqrt.$$$

	const _ZERO = _fromNumber(0)
	const _TWO = _fromNumber(2)

	const isMember = (x) => x
		&& typeof x === 'object'
		&& _isMember(x.re)
		&& _isMember(x.im)

	const isFinite = (x) => _isFinite(x.re) && _isFinite(x.im)
	const isNaN = (x) => _isNaN(x.re) || _isNaN(x.im)

	const re = isPrimitive
		? (x) => x.re
		: (x) => _clone(x.re)
	const reTo = !isPrimitive ? (_dst, x) => _copy(_dst, x.re) : null
	re.to = reTo

	const im = isPrimitive
		? (x) => x.im
		: (x) => _clone(x.im)
	const imTo = !isPrimitive ? (_dst, x) => _copy(_dst, x.im) : null
	im.to = imTo

	const clone = (x) => ({
		re: x.re,
		im: x.im,
	})
	const copy = (dst, src) => {
		dst.re = src.re
		dst.im = src.im
		return dst
	}

	const abs = isPrimitive
		? (x) => ({
			re: norm(x),
			im: _ZERO,
		})
		: (x) => ({
			re: norm(x),
			im: _clone(_ZERO),
		})
	const absTo = (dst, x) => {
		normTo(dst.re, x)
		dst.im = _ZERO
		return dst
	}
	const abs$$$ = isPrimitive
		? (x) => {
			x.re = norm(x)
			x.im = _ZERO
			return x
		}
		: (x) => {
			normTo(x.re, x)
			x.im = _ZERO
			return x
		}
	abs.to = absTo
	abs.$$$ = abs$$$

	const neg = isPrimitive
		? (x) => ({
			re: -x.re,
			im: -x.im,
		})
		: (x) => ({
			re: _neg(x.re),
			im: _neg(x.im),
		})
	const negTo = isPrimitive
		? (dst, x) => {
			dst.re = -x.re
			dst.im = -x.im
			return dst
		}
		: (dst, x) => {
			_negTo(dst.re, x.re)
			_negTo(dst.im, x.im)
			return dst
		}
	const neg$$$ = isPrimitive
		? (x) => {
			x.re = -x.re
			x.im = -x.im
			return x
		}
		: (x) => {
			_neg$$$(x.re)
			_neg$$$(x.im)
			return x
		}
	neg.to = negTo
	neg.$$$ = neg$$$

	const conjugate = isPrimitive
		? (x) => ({
			re: x.re,
			im: -x.im,
		})
		: (x) => ({
			re: x.re,
			im: _neg(x.im),
		})
	const conjugateTo = isPrimitive
		? (dst, x) => {
			dst.re = x.re
			dst.im = -x.im
			return dst
		}
		: (dst, x) => {
			dst.re = x.re
			_negTo(dst.im, x.im)
			return dst
		}
	const conjugate$$$ = isPrimitive
		? (x) => {
			x.im = -x.im
			return x
		}
		: (x) => {
			_neg$$$(x.im)
			return x
		}
	conjugate.to = conjugateTo
	conjugate.$$$ = conjugate$$$

	const add = (a, b) => isPrimitive
		? {
			re: a.re + b.re,
			im: a.im + b.im,
		}
		: {
			re: _add(a.re, b.re),
			im: _add(a.im, b.im),
		}
	const addTo = isPrimitive
		? (dst, a, b) => {
			dst.re = a.re + b.re
			dst.im = a.im + b.im
			return dst
		}
		: (dst, a, b) => {
			_addTo(dst.re, a.re, b.re)
			_addTo(dst.im, a.im, b.im)
			return dst
		}
	const add$$$ = isPrimitive
		? (a, b) => {
			a.re += b.re
			a.im += b.im
			return a
		}
		: (a, b) => {
			_add$$$(a.re, b.re)
			_add$$$(a.im, b.im)
			return a
		}
	add.to = addTo
	add.$$$ = add$$$

	const sub = isPrimitive
		? (a, b) => ({
			re: a.re - b.re,
			im: a.im - b.im,
		})
		: (a, b) => ({
			re: _sub(a.re, b.re),
			im: _sub(a.im, b.im),
		})
	const subTo = isPrimitive
		? (dst, a, b) => {
			dst.re = a.re - b.re
			dst.im = a.im - b.im
			return dst
		}
		: (dst, a, b) => {
			_subTo(dst.re, a.re, b.re)
			_subTo(dst.im, a.im, b.im)
			return dst
		}
	const sub$$$ = isPrimitive
		? (a, b) => {
			a.re -= b.re
			a.im -= b.im
			return a
		}
		: (a, b) => {
			_sub$$$(a.re, b.re)
			_sub$$$(a.im, b.im)
			return a
		}
	sub.to = subTo
	sub.$$$ = sub$$$

	const mul = isPrimitive
		? (a, b) => {
			const { re: aRe, im: aIm } = a
			const { re: bRe, im: bIm } = b
			return {
				re: aRe * bRe - aIm * bIm,
				im: aIm * bRe + aRe * bIm,
			}
		}
		: (a, b) => {
			const { re: aRe, im: aIm } = a
			const { re: bRe, im: bIm } = b
			return {
				re: _sub$$$(_mul(aRe, bRe), _mulTo(_tmp1, aIm, bIm)),
				im: _add$$$(_mul(aIm, bRe), _mulTo(_tmp2, aRe, bIm)),
			}
		}
	const mulTo = isPrimitive
		? (dst, a, b) => {
			const { re: aRe, im: aIm } = a
			const { re: bRe, im: bIm } = b
			dst.re = aRe * bRe - aIm * bIm
			dst.im = aIm * bRe + aRe * bIm
			return dst
		}
		: (dst, a, b) => {
			const { re: aRe, im: aIm } = a
			const { re: bRe, im: bIm } = b
			_mulTo(_tmp1, aIm, bIm)
			_mulTo(_tmp2, aRe, bIm)
			_sub$$$(_mulTo(dst.re, aRe, bRe), _tmp1)
			_add$$$(_mulTo(dst.im, aIm, bRe), _tmp2)
			return dst
		}
	const mul$$$ = isPrimitive
		? (a, b) => {
			const { re: aRe, im: aIm } = a
			const { re: bRe, im: bIm } = b
			a.re = aRe * bRe - aIm * bIm
			a.im = aIm * bRe + aRe * bIm
			return a
		}
		: (a, b) => {
			const { re: aRe, im: aIm } = a
			const { re: bRe, im: bIm } = b
			_mulTo(_tmp1, aIm, bIm)
			_mulTo(_tmp2, aRe, bIm)
			_sub$$$(_mul$$$(aRe, bRe), _tmp1)
			_add$$$(_mul$$$(aIm, bRe), _tmp2)
			return a
		}
	mul.to = mulTo
	mul.$$$ = mul$$$

	const div = isPrimitive
		? (a, b) => {
			const { re: aRe, im: aIm } = a
			const { re: bRe, im: bIm } = b
			const s = normSquared(b)
			return {
				re: (aRe * bRe + aIm * bIm) / s,
				im: (aIm * bRe - aRe * bIm) / s,
			}
		}
		: (a, b) => {
			const { re: aRe, im: aIm } = a
			const { re: bRe, im: bIm } = b
			normSquaredTo(_tmpNorm, b)
			return {
				re: _div$$$(_add$$$(_mul(aRe, bRe), _mulTo(_tmp1, aIm, bIm)), _tmpNorm),
				im: _div$$$(_sub$$$(_mul(aIm, bRe), _mulTo(_tmp2, aRe, bIm)), _tmpNorm),
			}
		}
	const divTo = isPrimitive
		? (dst, a, b) => {
			const { re: aRe, im: aIm } = a
			const { re: bRe, im: bIm } = b
			const s = normSquared(b)
			dst.re = (aRe * bRe + aIm * bIm) / s
			dst.im = (aIm * bRe - aRe * bIm) / s
			return dst
		}
		: (dst, a, b) => {
			const { re: aRe, im: aIm } = a
			const { re: bRe, im: bIm } = b
			normSquaredTo(_tmpNorm, b)
			_mulTo(_tmp1, aIm, bIm)
			_mulTo(_tmp2, aRe, bIm)
			_div$$$(_add$$$(_mulTo(dst.re, aRe, bRe), _tmp1), _tmpNorm)
			_div$$$(_sub$$$(_mulTo(dst.im, aIm, bRe), _tmp2), _tmpNorm)
			return dst
		}
	const div$$$ = isPrimitive
		? (a, b) => {
			const { re: aRe, im: aIm } = a
			const { re: bRe, im: bIm } = b
			const s = normSquared(b)
			a.re = (aRe * bRe + aIm * bIm) / s
			a.im = (aIm * bRe - aRe * bIm) / s
			return a
		}
		: (a, b) => {
			const { re: aRe, im: aIm } = a
			const { re: bRe, im: bIm } = b
			normSquaredTo(_tmpNorm, b)
			_mulTo(_tmp1, aIm, bIm)
			_mulTo(_tmp2, aRe, bIm)
			_div$$$(_add$$$(_mul$$$(aRe, bRe), _tmp1), _tmpNorm)
			_div$$$(_sub$$$(_mul$$$(aIm, bRe), _tmp2), _tmpNorm)
			return a
		}
	div.to = divTo
	div.$$$ = div$$$

	const inverse = isPrimitive
		? (x) => {
			const s = normSquared(x)
			return {
				re: x.re / s,
				im: -x.im / s,
			}
		}
		: (x) => {
			normSquaredTo(_tmpNorm, x)
			return {
				re: _div(x.re, _tmpNorm),
				im: _neg$$$(_div(x.im, _tmpNorm)),
			}
		}
	const inverseTo = isPrimitive
		? (dst, x) => {
			const s = normSquared(x)
			dst.re = x.re / s
			dst.im = -x.im / s
			return dst
		}
		: (dst, x) => {
			normSquaredTo(_tmpNorm, x)
			_divTo(dst.re, x.re, _tmpNorm)
			_neg$$$(_divTo(dst.im, x.im, _tmpNorm))
			return dst
		}
	const inverse$$$ = isPrimitive
		? (x) => {
			const s = normSquared(x)
			x.re /= s
			x.im /= -s
			return x
		}
		: (x) => {
			normSquaredTo(_tmpNorm, x)
			_div$$$(x.re, _tmpNorm)
			_neg$$$(_div$$$(x.im, _tmpNorm))
			return x
		}
	inverse.to = inverseTo
	inverse.$$$ = inverse$$$

	const square = isPrimitive
		? (x) => ({
			re: x.re ** 2 - x.im ** 2,
			im: x.re * x.im * _TWO,
		})
		: (x) => ({
			re: _sub$$$(_square(x.re), _squareTo(_tmp1, x.im)),
			im: _mul$$$(_mul(x.re, x.im), _TWO),
		})
	const squareTo = isPrimitive
		? (dst, x) => {
			const { re: _re, im: _im } = x
			dst.re = _re ** 2 - _im ** 2
			dst.im = _re * _im * _TWO
			return dst
		}
		: (dst, x) => {
			const { re: _re, im: _im } = x
			_squareTo(_tmp1, _im)
			_mul$$$(_mulTo(dst.im, _re, _im), _TWO)
			_sub$$$(_squareTo(dst.re, _re), _tmp1)
			return dst
		}
	const square$$$ = isPrimitive
		? (x) => {
			const { re: _re, im: _im } = x
			x.re = _re ** 2 - _im ** 2
			x.im = _re * _im * _TWO
			return x
		}
		: (x) => {
			const { re: _re, im: _im } = x
			_squareTo(_tmp1, _im)
			_mul$$$(_mul$$$(_im, _re), _TWO)
			_sub$$$(_square$$$(_re), _tmp1)
			return x
		}
	square.to = squareTo
	square.$$$ = square$$$

	const sqrt = isPrimitive
		? (x) => {
			const { re: _re, im: _im } = x
			const _n = norm(x)
			return {
				re: _sqrt((_n + _re) / _TWO),
				im: _sign(_im) * _sqrt((_n - _re) / _TWO),
			}
		}
		: (x) => {
			normTo(_tmpNorm, x)
			return {
				re: _sqrt$$$(_div$$$(_add(_tmpNorm, x.re), _TWO)),
				im: _mul$$$(_sqrt$$$(_div$$$(_sub(_tmpNorm, x.re), _TWO)), _signTo(_tmp1, x.im)),
			}
		}
	const sqrtTo = isPrimitive
		? (dst, x) => {
			const { re: _re, im: _im } = x
			const _n = norm(x)
			dst.re = _sqrt((_n + _re) / _TWO)
			dst.im = _sign(_im) * _sqrt((_n - _re) / _TWO)
			return dst
		}
		: (dst, x) => {
			const { re: _re, im: _im } = x
			normTo(_tmpNorm, x)
			_mul$$$(_sqrt$$$(_div$$$(_subTo(dst.im, _tmpNorm, _re), _TWO)), _signTo(_tmp1, _im))
			_sqrt$$$(_div$$$(_addTo(dst.re, _tmpNorm, _re), _TWO))
			return dst
		}
	const sqrt$$$ = isPrimitive
		? (x) => {
			const { re: _re, im: _im } = x
			const _n = norm(x)
			x.re = _sqrt((_n + _re) / _TWO)
			x.im = _sign(_im) * _sqrt((_n - _re) / _TWO)
			return x
		}
		: (x) => {
			const { re: _re, im: _im } = x
			normTo(_tmpNorm, x)
			_mul$$$(_sqrt$$$(_div$$$(_subTo(_im, _tmpNorm, _re), _TWO)), _signTo(_tmp1, _im))
			_sqrt$$$(_div$$$(_add$$$(_re, _tmpNorm), _TWO))
			return x
		}
	sqrt.to = sqrtTo
	sqrt.$$$ = sqrt$$$

	const scale = isPrimitive
		? (x, _s) => ({
			re: x.re * _s,
			im: x.im * _s,
		})
		: (x, _s) => ({
			re: _mul(x.re, _s),
			im: _mul(x.im, _s),
		})
	const scaleTo = isPrimitive
		? (dst, x, _s) => {
			dst.re = x.re * _s
			dst.im = x.im * _s
			return dst
		}
		: (dst, x, _s) => {
			_mulTo(dst.re, x.re, _s)
			_mulTo(dst.im, x.im, _s)
			return dst
		}
	const scale$$$ = isPrimitive
		? (x, _s) => {
			x.re *= _s
			x.im *= _s
			return x
		}
		: (x, _s) => {
			_mul$$$(x.re, _s)
			_mul$$$(x.im, _s)
			return x
		}
	scale.to = scaleTo
	scale.$$$ = scale$$$

	const normSquared = isPrimitive
		? (x) => x.re ** 2 + x.im ** 2
		: (x) => _add$$$(_square(x.re), _squareTo(_tmp1, x.im))
	const normSquaredTo = !isPrimitive
		? (_dst, x) => _add$$$(_squareTo(_dst, x.re), _squareTo(_tmp1, x.im))
		: null

	const norm = isPrimitive
		? (x) => _sqrt(normSquared(x))
		: (x) => _sqrt$$$(normSquared(x))
	const normTo = !isPrimitive
		? (_dst, x) => _sqrt$$$(normSquaredTo(_dst, x))
		: null

	const eq = isPrimitive
		? (a, b) => a.re === b.re && a.im === b.im
		: (a, b) => _eq(a.re, b.re) && _eq(a.im, b.im)

	const neq = isPrimitive
		? (a, b) => a.re !== b.re || a.im !== b.im
		: (a, b) => _neq(a.re, b.re) || _neq(a.im, b.im)

	const fromParts = isPrimitive
		? (_re, _im) => ({
			re: _re,
			im: _im,
		})
		: (_re, _im) => ({
			re: _clone(_re),
			im: _clone(_im),
		})
	const fromPartsTo = isPrimitive
		? (dst, _re, _im) => {
			dst.re = _re
			dst.im = _im
			return dst
		}
		: (dst, _re, _im) => {
			dst.re = _clone(_re)
			dst.im = _clone(_im)
			return dst
		}
	fromParts.to = fromPartsTo

	const fromReal = isPrimitive
		? (s) => ({
			re: s,
			im: _ZERO,
		})
		: (s) => ({
			re: _clone(s),
			im: _clone(_ZERO),
		})

	const fromRealTo = isPrimitive
		? (dst, s) => {
			dst.re = s
			dst.im = _ZERO
			return dst
		}
		: (dst, s) => {
			dst.re = clone(s)
			dst.im = _clone(_ZERO)
			return dst
		}
	fromReal.to = fromRealTo

	const fromString = (s) => {
		const match = s.match(PATTERN)
		if (!match) { return { im: NaN, re: NaN } }
		const { sre, sim } = match.groups

		return {
			re: _fromString(sre),
			im: _fromString(sim),
		}
	}
	const fromStringTo = (dst, s) => {
		const match = s.match(PATTERN)
		if (!match) {
			dst.re = NaN
			dst.im = NaN
			return dst
		 }
		const { sre, sim } = match.groups

		dst.re = _fromString(sre)
		dst.im = _fromString(sim)
		return dst
	}
	fromString.to = fromStringTo

	const toString = (x) => `${x.re}${_gte(x.im, _ZERO) ? '+' : ''}${x.im}i`

	return {
		...{ isFinite, isNaN, isMember },
		...{ re, im, clone, copy },
		...{ abs, neg, conjugate, add, sub, mul, div, inverse, square, sqrt },
		...{ scale, norm, normSquared },
		...{ eq, neq },
		...{ fromParts, fromReal, fromString, toString },
	}
})

module.exports = { defineFor }
