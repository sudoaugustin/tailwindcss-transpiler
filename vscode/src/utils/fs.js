const fs = require('fs');
const path = require('path');
const util = require('util');

const getFileName = url => path.basename(url);

exports.fetchFile = util.promisify(fs.readFile);
exports.writeFile = util.promisify(fs.writeFile);

exports.fileExists = url => fs.existsSync(url);
exports.isTailwindFile = url => {
  const file = getFileName(url);
  return file.includes('.tailwind.scss') || file.includes('.tailwind.css');
};

exports.getDir = url => path.dirname(url);
exports.createDir = url => fs.mkdirSync(url, { recursive: true });

exports.getFileName = url =>
  getFileName(url).replace('.tailwind', '').replace('.scss', '.css');

exports.joinPath = (...args) => path.join(...args);
