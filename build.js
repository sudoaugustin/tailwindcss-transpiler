const fs = require("fs");
const util = require("util");
const childProcess = require("child_process");
const args = process.argv;
const readme = args.includes("-readme");
const package = args.includes("-package");
const [writeFile, readFile, exec] = [fs.writeFile, fs.readFile, childProcess.exec].map(fun =>
  util.promisify(fun)
);
const editors = ["vscode", "atom"];
const editor = editors.find(editor => args.includes(`-${editor}`));

if (package) {
  const json = JSON.stringify(require("./package.js")(editor));
  writeFile(`./${editor}/package.json`, json)
    .then(() => console.log("SUCCESS!"))
    .catch(err => console.log(err));
} else if (readme) {
  const names = { vscode: "VS Code", atom: "Atom" };
  const links = {
    vscode:
      "https://marketplace.visualstudio.com/items?itemName=sudoaugustin.tailwindcss-transpiler",
    atom: "https://atom.io/packages/tailwinidcss-transpiler",
  };
  const name = names[editor];
  const link = links[editor];
  const replace = markDown => {
    let newmarkdown = markDown.replace(/\@name/, name).replace(/\@link/, link);
    if (editor === "atom")
      newmarkdown = newmarkdown.replace(/tailwindTranspiler./g, "tailwindcss-transpiler.");
    return newmarkdown;
  };
  readFile("./readme.md")
    .then(data => data.toString())
    .then(content => replace(content))
    .then(markDown => writeFile(`./${editor}/README.md`, markDown));
} else {
  const cmd = `npm run package:${editor} && npm run readme:${editor}`;
  exec(cmd);
}
