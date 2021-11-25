require("atom");
module.exports = () => {
  let Panel = null;
  let child = null;
  const mount = () => {
    const root = document.createElement("div");
    const icon = document.createElement("span");
    child = document.createElement("div");
    root.className = "flex-col";
    icon.className = "self-right icon icon-x text-base p-2 pr-0 cursor-pointer";
    icon.onclick = () => hide();
    child.className = "text-base leading-6 -mt-2 px-8 pb-4";
    root.appendChild(icon);
    root.appendChild(child);
    Panel = atom.workspace.addBottomPanel({ item: root, visible: false });
  };
  const showError = (msg) => {
    child.innerText = msg;
    !Panel.isVisible() && Panel.show();
  };
  const hide = () => {
    child.innerText = "";
    Panel.isVisible() && Panel.hide();
  };
  const unmount = () => {
    Panel.destroy();
    Panel = null;
  };
  return { mount, unmount, hide, showError };
};
