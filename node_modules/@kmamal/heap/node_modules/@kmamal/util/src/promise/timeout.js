const { sleep } = require('./sleep')

const timeout = (time, info) => sleep(time).then(() => {
	throw Object.assign(new Error("timeout"), info)
})

module.exports = { timeout }
