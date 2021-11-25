const fs = require("fs");
const path = require("path");
const util = require("util");

const getFileName = (url) => path.basename(url);

exports.fetchFile = util.promisify(fs.readFile);
exports.writeFile = util.promisify(fs.writeFile);
exports.fileExists = (url) => url && fs.existsSync(url);
exports.getDir = (url) => path.dirname(url);
exports.createDir = (url) => fs.mkdirSync(url, { recursive: true });
exports.getFileName = (url) =>
  getFileName(url).replace(".tailwind", "").replace(".scss", ".css");
exports.joinPath = (...args) => path.join(...args.map((arg) => arg || " "));
exports.isSCSSFile = (url) => {
  const extname = path.extname(url);
  return extname === ".scss" || extname === ".sass";
};
