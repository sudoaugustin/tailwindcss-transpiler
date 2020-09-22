const vscode = require('vscode');
const { handleInit, handleSave } = require('./src/handlers/onSaveHandler');

function activate(context) {
  handleInit();
  let disposableCompileOnSave = vscode.workspace.onDidSaveTextDocument(
    ({ languageId, fileName }) =>
      handleSave({
        filePath: fileName,
        rootPath: vscode.workspace.rootPath,
        isSASS: languageId === 'scss' || languageId === 'sass',
      })
  );
  context.subscriptions.push(disposableCompileOnSave);
}
exports.activate = activate;

function deactivate() {}

module.exports = { activate, deactivate };
