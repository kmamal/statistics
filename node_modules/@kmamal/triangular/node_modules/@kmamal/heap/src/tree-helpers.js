
const kIndex = Symbol("kIndex")

const getParent = (index) => Math.floor((index - 1) / 2)

const getLeft = (index) => index * 2 + 1

const getRight = (index) => index * 2 + 2

module.exports = {
	kIndex,
	getParent,
	getLeft,
	getRight,
}
