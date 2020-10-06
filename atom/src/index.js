const { CompositeDisposable } = require("atom");
const { isTailwindFile, getRootPath, compileCSS } = require("../../src");
const { StatusBar, BottomPanel } = require("./components");

let subscriptions, statusBarTile;

const config = (name) => atom.config.get("tailwindcss-transpiler." + name);

console.log("SHIT");

const handleSuccess = () => {
  BottomPanel.hide();
  StatusBar.update("SUCCESS");
};

const handleError = (err) => {
  BottomPanel.showError(err.toString());
  StatusBar.update("ERROR");
};

const handleSave = ({ filePath }) => {
  StatusBar.update("WORKING");
  const paths = atom.project.getPaths();
  compileCSS({
    filePath,
    rootPath: getRootPath({ filePath, paths }),
    config: {
      savePath: config("savePath"),
      minifyCSS: config("minifyOutputFile"),
      tailwindPath: config("tailwindConfigPath"),
      browsersList: config("browsersList"),
    },
  })
    .then(handleSuccess)
    .catch(handleError)
    .finally(() => setTimeout(() => StatusBar.update(), 3000));
};

module.exports = {
  activate: () => {
    console.log("Tailwind CSS Transpiler Activated");
    StatusBar.mount();
    BottomPanel.mount();
    subscriptions = new CompositeDisposable();
    subscriptions.add(
      atom.workspace.observeTextEditors(
        (editor) =>
          isTailwindFile(editor.getPath()) &&
          subscriptions.add(
            editor
              .getBuffer()
              .onWillSave(({ path }) => handleSave({ filePath: path }))
          )
      )
    );
  },
  deactivate: () => {
    subscriptions.dispose();
    statusBarTile.destroy();
    StatusBar.unmount();
    BottomPanel.unmount();
  },
  consumeStatusBar: (statusBar) => {
    statusBarTile =
      StatusBar.get() &&
      statusBar.addRightTile({
        item: StatusBar.get(),
        priority: 100,
      });
  },
};
