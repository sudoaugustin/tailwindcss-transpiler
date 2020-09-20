const fsPath = require('path');

const getFileName = path => fsPath.basename(path);

exports.isTailwindFile = path => {
  const file = getFileName(path);
  return file.includes('.tailwind.scss') || file.includes('.tailwind.css');
};

exports.getPath = path => fsPath.dirname(path);

exports.getFileName = path =>
  getFileName(path).replace('.tailwind', '').replace('.scss', '.css');

exports.joinPath = (...paths) => fsPath.join(...paths);
