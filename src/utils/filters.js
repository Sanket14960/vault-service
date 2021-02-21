const { existsSync } = require('fs');

const fileExists = path => existsSync(path)
const notNull = obj => obj !== null && obj !== undefined

module.exports = { notNull, fileExists };
