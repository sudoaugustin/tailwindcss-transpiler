const vscode = require('vscode');
const OutputWindow = () => {
  const Window = vscode.window.createOutputChannel('Tailwind Transpiler');

  const render = ({ msg }) => {
    Window.clear();
    Window.show(true);
    Window.appendLine(msg);
  };
  const hide = () => Window.hide();

  return { render, hide };
};

module.exports = OutputWindow;
