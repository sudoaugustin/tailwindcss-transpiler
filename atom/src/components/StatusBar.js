module.exports = () => {
  let Item = null;
  const mount = () => {
    Item = document.createElement("span");
    Item.className = "inline-block bg-inherit";
    update();
  };
  const update = state => {
    let classes = "";
    switch (state) {
      case "WORKING":
        classes = "sync tailwind-loading-spinner";
        break;
      case "SUCCESS":
        classes = "check";
        break;
      case "ERROR":
        classes = "bug";
        break;
      default:
        classes = "telescope";
        break;
    }

    Item.innerHTML = `<span class="icon icon-${classes}"></span>Tailwind Transpiler`;
  };
  const get = () => Item;
  const unmount = () => (Item = null);
  return { mount, update, get, unmount };
};
