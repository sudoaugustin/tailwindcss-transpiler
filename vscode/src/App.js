const fs = require('fs');
const util = require('util');
const postcss = require('postcss');
const tailwind = require('tailwindcss');
const compress = require('uglifycss').processString;
const StatusBar = require('./StatusBar')();
const OutputWindow = require('./OutputWindow')();
const { isTailwindFile, getFileName, getPath, joinPath } = require('./utils');

const [readFile, writeFile, mkdir] = [
  util.promisify(fs.readFile),
  util.promisify(fs.writeFile),
  util.promisify(fs.mkdir),
];

const handleSuccess = () => {
  StatusBar.update('SUCCESS');
  OutputWindow.hide();
};

const handleError = err => {
  StatusBar.update('ERROR');
  OutputWindow.render({ msg: err.toString() });
};

exports.handleSave = ({ isSASS, rootPath, filePath }) => {
  if (!isTailwindFile(filePath)) return;
  StatusBar.update('WORKING');
  const config = require('./config')();
  const minify = config('minifyOutputFile');
  const savePath = config('savePath');
  const tailwindPath = config('tailwindConfigPath');
  const browsersList = config('browsersList');
  const plugins = [
    tailwindPath ? tailwind(joinPath(rootPath, tailwindPath)) : tailwind,
    require('autoprefixer')(browsersList),
    ...(isSASS ? [require('precss')] : []),
    ...(isSASS && !minify ? [require('postcss-prettify')] : []),
  ];
  const newPath = savePath ? joinPath(rootPath, savePath) : getPath(filePath);
  readFile(filePath)
    .then(data => data.toString())
    //@ts-ignore
    .then(content => postcss(plugins).process(content, { from: undefined }))
    .then(({ css }) => (minify ? compress(css) : css))
    .then(css => {
      if (!fs.existsSync(newPath)) mkdir(newPath, { recursive: true });
      return css;
    })
    .then(css => writeFile(joinPath(newPath, getFileName(filePath)), css))
    .then(handleSuccess)
    .catch(handleError);
};

exports.handleInit = () => {
  console.log('Tailwind Transpiler is activated');
  StatusBar.mount();
};
