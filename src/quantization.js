const { sort } = require('@kmamal/util/array/sort')
const { interQuartileRange } = require('./summary')

const sort$$$ = sort.$$$


const optimalBinWidth = (values) => {
	const N = values.length
	const iqr = interQuartileRange(values)
	return 2 * iqr / N ** (1 / 3)
}

const optimalBinParams = (values) => {
	let min = Infinity
	let max = -Infinity
	for (const x of values) {
		min = Math.min(min, x)
		max = Math.max(max, x)
	}
	const halfRange = max / 2 - min / 2

	const binWidth = optimalBinWidth(values)
	const halfK = Math.ceil(halfRange / binWidth)
	const k = 2 * halfK

	const padding = halfK * binWidth - halfRange
	min = Math.max(-Number.MAX_VALUE, min - padding)
	max = min + k * binWidth
	if (max === Infinity) {
		max = Number.MAX_VALUE
		min = max - k * binWidth
	}

	return { min, max, k }
}

const spacedMinMax = (min, max, N) => {
	const spacing = max / N - min / N
	return {
		min: Math.max(-Number.MAX_VALUE, min - spacing),
		max: Math.min(Number.MAX_VALUE, max + spacing),
	}
}

const getBinIndex = (x, min, max, k) => {
	const halfRange = max / 2 - min / 2
	const ratio = ((x - min) / halfRange) / 2
	return Math.floor(k * ratio)
}

const quantizeUniform = (values) => {
	const { min, max, k } = optimalBinParams(values)

	const bins = new Array(k).fill(0)
	for (const x of values) {
		const index = getBinIndex(x, min, max, k)
		bins[index]++
	}
	return bins
}

const quantizeEquiprobable = (values, k) => {
	const N = values.length
	sort$$$(values)
	const { min, max } = spacedMinMax(values[0], values.at(-1), N)

	const borders = new Array(k + 1)
	borders[0] = min
	borders[k] = max

	const step = N / (k + 1)
	for (let i = 1; i < k; i++) {
		const pos = i * step
		const ai = Math.floor(pos)
		const bi = ai + 1
		const a = values[ai]
		const b = values[bi]
		const r = pos - ai
		borders[i] = a * (1 - r) + b * r
	}
	return borders
}


module.exports = {
	optimalBinWidth,
	optimalBinParams,
	spacedMinMax,
	getBinIndex,
	quantizeUniform,
	quantizeEquiprobable,
}
