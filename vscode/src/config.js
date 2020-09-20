const vscode = require('vscode');
module.exports = () => {
  const config = vscode.workspace.getConfiguration('tailwindTranspiler');
  return name => config.get(name);
};
