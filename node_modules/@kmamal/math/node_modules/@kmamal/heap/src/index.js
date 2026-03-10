
module.exports = {
	SYM: {
		index: require('./tree-helpers').kIndex,
	},
	...require('./add'),
	...require('./bubble-down'),
	...require('./bubble-up'),
	...require('./heapify'),
	...require('./pop'),
	...require('./remove'),
}
