const { scan } = require('./scan')
const { add } = require('../operators/arithmetic/add')

const scanTo = scan.to
const scan$$$ = scan.$$$


const prefixSumsBy = (arr, fnMap) => scan(arr, (a, x) => a + fnMap(x), 0)

const prefixSumsByTo = (dst, arr, fnMap) => scanTo(dst, arr, (a, x) => a + fnMap(x), 0)

const prefixSumsBy$$$ = (arr, fnMap) => scan$$$(arr, (a, x) => a + fnMap(x), 0)

prefixSumsBy.to = prefixSumsByTo
prefixSumsBy.$$$ = prefixSumsBy$$$


const prefixSums = (arr) => scan(arr, add, 0)

const prefixSumsTo = (dst, arr) => scanTo(dst, arr, add, 0)

const prefixSums$$$ = (arr) => scan$$$(arr, add, 0)

prefixSums.to = prefixSumsTo
prefixSums.$$$ = prefixSums$$$


module.exports = {
	prefixSumsBy,
	prefixSums,
}
