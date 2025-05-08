const { mean, standardDeviation } = require('./summary')
const { top, growth, subVars } = require('./math')


const payoff = (x) => x > 1 ? x - 1 : 1 - (1 / x)

const maximumDrawdown = (data) => {
	const max = top(data)
	let mdd = 0
	for (let i = 0; i < data.length; i++) {
		mdd = Math.max(mdd, (max[i] - data[i]) / max[i])
	}
	return mdd
}

const sharpeRatio = (data) => {
	const g = growth(data)
	return mean(g) / standardDeviation(g)
}

const sharpeRatio2 = (a, b) => {
	if (a.length !== b.length) { throw new Error("bad lengths") }
	const ga = growth(a)
	const gb = growth(b)
	const d = subVars(ga, gb)
	return mean(d) / standardDeviation(d)
}

const riskReturnRatio = (data) => {
	const g = growth(data)
	return mean(g) / maximumDrawdown(data)
}

const modigliani = (a, b) => {
	const gb = growth(b)
	return sharpeRatio2(a, b) * standardDeviation(gb) + mean(gb)
}


module.exports = {
	payoff,
	maximumDrawdown,
	sharpeRatio,
	sharpeRatio2,
	riskReturnRatio,
	modigliani,
}
