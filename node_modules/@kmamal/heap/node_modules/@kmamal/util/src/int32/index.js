
const countLeadingZeroes = Math.clz32

const countLeadingOnes = (int) => countLeadingZeroes(~int)

const countTrailingZeroes = (_int) => {
	let int = _int
	int |= int << 16
	int |= int << 8
	int |= int << 4
	int |= int << 2
	int |= int << 1
	return 32 - countLeadingZeroes(~int)
}

const countTrailingOnes = (int) => countTrailingZeroes(~int)

module.exports = {
	countLeadingZeroes,
	countLeadingOnes,
	countTrailingZeroes,
	countTrailingOnes,
}
