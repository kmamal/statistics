
const germanTank = (data) => {
	let max = 0
	for (const x of data) { max = Math.max(max, x) }
	return max + max / data.length - 1
}

module.exports = { germanTank }
