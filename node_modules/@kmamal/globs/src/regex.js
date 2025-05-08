const Path = require('path')

const _specialChars = new Set('\\^$*+?.()|[]{}')

const sep = Path.sep.replaceAll('\\', '\\\\')

const fromGlob = (glob) => {
	const result = new Array(glob.length)
	let readIndex = 0
	let writeIndex = 0

	let char
	while (readIndex < glob.length) {
		char = glob[readIndex++]
		switch (char) {
			case '/': {
				result[writeIndex++] = sep

				const next1 = glob[readIndex]
				if (next1 !== '*') { break }
				const next2 = glob[readIndex + 1]
				if (next2 !== '*') { break }
				const next3 = glob[readIndex + 2]
				if (next3 && next3 !== '/') { break }

				result[writeIndex++] = `(.+${sep})*`
				readIndex += 3
			} break
			case '*': {
				result[writeIndex++] = `[^${sep}]*`
			} break
			case '?': {
				result[writeIndex++] = '.'
			} break
			case '{': {
				const options = []
				const option = []
				let optionIndex = 0
				loop2: while (readIndex < glob.length) {
					const char2 = glob[readIndex++]
					switch (char2) {
						case '}': {
							options.push(option.join(''))
							result[writeIndex++] = `(${options.join('|')})`
						} break loop2
						case ',': {
							options.push(option.join(''))
							option.length = 0
							optionIndex = 0
						} break
						default: {
							if (_specialChars.has(char2)) {
								option[optionIndex++] = '\\'
							}
							option[optionIndex++] = char2
						} break
					}
				}
			} break
			default: {
				if (_specialChars.has(char)) {
					result[writeIndex++] = '\\'
				}
				result[writeIndex++] = char
			}
		}
	}
	result.length = writeIndex

	return new RegExp(`^${result.join('')}$`, 'u')
}

module.exports = { fromGlob }
