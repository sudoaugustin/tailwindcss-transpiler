const precss = require('precss');
const postcss = require('postcss');
const CleanCSS = require('clean-css');
const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const StatusBar = require('./StatusBar')();
const OutputWindow = require('./OutputWindow')();
const { readFile, writeFile, makeDir, fileExists } = require('./fs');
const { isTailwindFile, getFileName, getPath, joinPath } = require('./utils');

const handleSuccess = () => {
  StatusBar.update('SUCCESS');
  OutputWindow.hide();
};

const handleError = err => {
  StatusBar.update('ERROR');
  OutputWindow.render({ msg: err.toString() });
};

const clean = ({ css, format }) =>
  new CleanCSS({ format, level: 2 }).minify(css).styles;

exports.handleSave = ({ isSASS, rootPath, filePath }) => {
  console.log('Save Handler Initated');
  if (!isTailwindFile(filePath)) return;
  StatusBar.update('WORKING');
  const config = require('./config')();
  const savePath = config('savePath');
  const minifyCSS = config('minifyOutputFile');
  const tailwindPath = joinPath(rootPath, config('tailwindConfigPath'));
  const browsersList = config('browsersList');
  const newPath = savePath ? joinPath(rootPath, savePath) : getPath(filePath);
  const plugins = [
    tailwind(fileExists(tailwindPath) ? tailwindPath : {}),
    browsersList && autoprefixer(browsersList),
    isSASS && precss,
  ].filter(v => v);

  readFile(filePath)
    .then(data => data.toString())
    //@ts-ignore
    .then(css => postcss(plugins).process(css, { from: undefined }))
    .then(({ css }) => clean({ css, format: !minifyCSS && 'beautify' }))
    .then(css => {
      if (!fileExists(newPath)) makeDir(newPath, { recursive: true });
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
