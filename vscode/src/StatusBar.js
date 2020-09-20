const vscode = require('vscode');
const StatusBar = () => {
  const Item = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    200
  );

  const update = state => {
    const prefix = 'Tailwind Transpiler:';
    switch (state) {
      case 'WORKING':
        setProps({
          text: `${prefix} $(loading)`,
          color: 'inherit',
        });
        break;
      case 'SUCCESS':
        setProps({
          text: `${prefix} $(check)`,
          color: '#4FD1C5',
        });
        setTimeout(() => update(), 3000);
        break;
      case 'ERROR':
        setProps({
          text: `${prefix} $(error)`,
          color: '#ff0033',
        });
        setTimeout(() => update(), 3000);
        break;
      default:
        setProps({
          text: `${prefix} $(telescope)`,
          color: 'inherit',
        });
        break;
    }
  };

  const unmount = () => Item.dispose();
  const mount = () => {
    Item.show();
    update();
  };
  const setProps = props => {
    Object.entries(props).forEach(([name, value]) => (Item[name] = value));
  };
  return { mount, update, unmount };
};

module.exports = StatusBar;
