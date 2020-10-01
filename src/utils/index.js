const path = require("path");

module.exports = {
  isTailwindFile: (url) => {
    const file = path.basename(url);
    return file.includes(".tailwind.scss") || file.includes(".tailwind.css");
  },
  getRootPath: ({ paths, filePath }) =>
    paths.find((path) => filePath.includes(path)),
};
