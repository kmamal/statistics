const Fs = require('fs')
const Path = require('path')

module.exports = (target, dirname) => {
	for (const name of Fs.readdirSync(dirname)) {
		if (false
			|| !name.endsWith('.js')
			|| name.startsWith('_')
			|| name.endsWith('.test.js')
			|| name === 'index.js'
		) { continue }

		Object.assign(target, require(Path.join(dirname, name)))
	}
}
