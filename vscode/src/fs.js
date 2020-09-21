const fs = require('fs');
const util = require('util');

exports.makeDir = fs.mkdirSync;
exports.readFile = util.promisify(fs.readFile);
exports.writeFile = util.promisify(fs.writeFile);
exports.fileExists = path => fs.existsSync(path);
