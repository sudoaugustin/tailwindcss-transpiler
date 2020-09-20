# Tailwind Transpiler

//add Image

Tailwind Transpiler transpile your tailwind CSS/SCSS file to pure CSS file.

## Installation

**[Install via the Visual Studio Code Marketplace →](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)**

## Features

### Transpile tailwind files

Transpile tailwind CSS/SCSS files on `Save`.
<img src="https://github.com/sudoaugustin/tailwindcss-transpiler/blob/master/.github/app-preview.png">

### Autoprefix

Add vendor prefixes to your CSS.
//add Image

### SCSS

Use the SCSS features with `.tailwind.scss`

## Requirements

-Tailwind Transpile works only on files with an extension `.tailwind.css` or `.tailwind.scss`

## Settings

### `tailwindTranspile.minifyOutputFile`

Controls whether the exported CSS should be compressed.**Default: `false`**

```json
{
  "tailwindTranspiler.minifyOutputFile": true
}
```

### `tailwindTranspiler.savePath`

This setting sets the custom path to store transpiled CSS._Set the path relative from workspace root._ **Default: `null`**

```json
{
  "tailwindTranspiler.savePath": "public/css"
}
```

### `tailwindTranspiler.tailwindConfigPath`

This setting sets the location of tailwind configuration file._Set the path relative from workspace root._ **Default: `tailwind.config.js`**

```json
{
  "tailwindTranspiler.tailwindConfigPath": "config/tailwind.js"
}
```

### `tailwindTranspiler.browsersList`

This setting controls the target browsers.See [Browserslist](https://github.com/browserslist/browserslist) docs for available queries. **Default:`[ "> 1%", "last 2 versions" ]`**

```json
{
  "tailwindTranspiler.browsersList": ["last 1 version", "> 1%", "ie 10"]
}
```

---

If you found any bug or if you have any suggestion, feel free to report or suggest me.You can contact me on [Twitter](https://twitter.com/sudoAugustin)
