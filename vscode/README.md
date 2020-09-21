# Tailwind Transpiler

Tailwind Transpiler transpile/compile your tailwind CSS/SCSS files to pure CSS files.

## Installation

**[Install via the Visual Studio Code Marketplace →](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)**

## Features

### Transpile tailwind files

Transpile tailwind CSS/SCSS files on `Save`.

<img src="./media/features/transpileOnSave.png">

### Autoprefix

Add vendor prefixes to your CSS.
//add Image

### SCSS supported

Get the features provided by SCSS and Tailwind with `.tailwind.scss`

<img src="./media/features/scssSupported.png">

### Optimize CSS

//add Image

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

The path to store transpiled CSS.**Default: `null`**
<br/>_Set the path relative from workspace root._

```json
{
  "tailwindTranspiler.savePath": "public/css"
}
```

### `tailwindTranspiler.tailwindConfigPath`

The path for tailwind configuration file. **Default: `tailwind.config.js`**
<br/>_Set the path relative from workspace root._

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

If you found any bug :grimacing: or if you have any suggestion, feel free to report or suggest me.You can contact me on [Twitter](https://twitter.com/sudoAugustin) :heart:.

<br/>
<p style="text-align:center;">
<span>A project by Augustin Joseph :sunglasses:<span/>
</p>
