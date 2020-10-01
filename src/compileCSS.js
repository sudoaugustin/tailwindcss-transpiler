const precss = require("precss");
const postcss = require("postcss");
const CleanCSS = require("clean-css");
const tailwind = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const cleanCSS = ({ css, format }) =>
  new CleanCSS({ format, level: 2 }).minify(css).styles;

const {
  getDir,
  createDir,
  fileExists,
  getFileName,
  isSCSSFile,
  joinPath,
  fetchFile,
  writeFile,
} = require("./utils/fs");

module.exports = ({ rootPath, filePath, config }) =>
  new Promise((resolve, reject) => {
    const tailwindPath = joinPath(rootPath, config.tailwindPath);
    const newPath = config.savePath
      ? joinPath(rootPath, config.savePath)
      : getDir(filePath);
    const plugins = [
      tailwind(tailwindPath && fileExists(tailwindPath) ? tailwindPath : {}),
      config.browsersList && autoprefixer(config.browsersList),
      isSCSSFile(filePath) && precss,
    ].filter((v) => v);
    fetchFile(filePath)
      .then((data) => data.toString())
      //@ts-ignore
      .then((css) => postcss(plugins).process(css, { from: undefined }))
      .then(({ css }) =>
        cleanCSS({ css, format: !config.minifyCSS && "beautify" })
      )
      .then((css) => {
        if (!fileExists(newPath)) createDir(newPath);
        return css;
      })
      .then((css) => writeFile(joinPath(newPath, getFileName(filePath)), css))
      .then(resolve)
      .catch(reject);
  });
