const VSCodeConfig = config =>
  Object.entries(config).reduce(
    (config, [name, value]) => ({
      ...config,
      [`tailwindTranspiler.${name}`]: value,
    }),
    {}
  );
module.exports = editor => {
  const config = {
    browsersList: {
      type: ['array', 'null'],
      default: ['> 1%', 'last 2 versions'],
      description:
        'Add vendor prefixes to unsupported CSS properties (e. g. transform -> -ms-transform). Specify what browsers to target with an array of strings (uses [Browserslist](https://github.com/ai/browserslist)). Pass `null` to turn off.',
    },
    minifyOutputFile: {
      type: 'boolean',
      default: false,
      description: 'Check to minify the output file.',
    },
    savePath: {
      description:
        'Set the save location of exported CSS.\n Set the path relative from Workspace Root.\n  (NOTE: Folder will be created if does not exist).',
      type: ['string', 'null'],
      pattern: '^[\\~|/|\\\\]',
      default: null,
    },
    tailwindConfigPath: {
      description:
        'Set the location of tailwind config file.\n Set the path relative from Workspace Root.',
      type: ['string', 'null'],
      pattern: '^[\\~|/|\\\\]',
      default: 'tailwind.config.js',
    },
  };
  const editors = {
    atom: {
      version: '0.0.7',
      consumedServices: {
        'status-bar': { versions: { '^1.0.0': 'consumeStatusBar' } },
      },
      configSchema: config,
    },
    vscode: {
      version: '0.0.8',
      activationEvents: ['workspaceContains:**/*.tailwind.{scss,css}'],
      categories: ['Other'],
      contributes: {
        configuration: {
          title: 'Tailwind CSS Transpiler Setting',
          properties: VSCodeConfig(config),
        },
      },
      galleryBanner: { color: '#f9fafb' },
      icon: 'media/icon.png',
    },
  };
  const scripts = {
    vscode: {
      lint: 'eslint .',
      pretest: 'npm run lint',
      test: 'node ./test/runTest.js',
      clean: 'rimraf dist',
      package: 'vsce package',
      'vscode:prepublish': 'npm run prepublish',
    },
  };
  const engines = {
    atom: '>=1.0.0 <2.0.0',
    vscode: '^1.49.0',
  };
  const devDependencies = {
    vscode: {
      '@types/glob': '^7.1.3',
      '@types/mocha': '^8.0.0',
      '@types/node': '^14.0.27',
      '@types/vscode': '^1.49.0',
      eslint: '^7.9.0',
      glob: '^7.1.6',
      mocha: '^8.1.3',
      typescript: '^4.0.2',
      'vscode-test': '^1.4.0',
    },
  };

  return {
    name: 'tailwindcss-transpiler',
    displayName: 'Tailwind CSS Transpiler',
    description:
      'Compiles your tailwindcss files into pure CSS files. Moreover, you can also use it with SASS',
    author: 'Augustin Joseph',
    license: 'MIT',
    main: './dist/index.js',
    keywords: ['css', 'sass', 'scss', 'tailwind', 'compiler', 'tailwindcs', 'transpiler'],
    repository: `https://github.com/sudoaugustin/tailwindcss-transpiler-${editor}`,
    bugs: {
      url: `https://github.com/sudoaugustin/tailwindcss-transpiler-${editor}/issues`,
      email: 'sudoaugustin@gmail.com',
      twitter: 'https://twitter.com/sudoAugustin',
    },
    homepage: `https://github.com/sudoaugustin/tailwindcss-transpiler-${editor}#readme`,
    engines: { [editor]: engines[editor] },
    publisher: 'sudoaugustin',
    ...editors[editor],
    scripts: {
      dev: 'ncc build src/index.js -o dist -w',
      build: 'ncc build src/index.js -o dist -m',
      prepublish: 'npm run build && npm run build:vscode --prefix ../',
      ...scripts[editor],
    },
    devDependencies: devDependencies[editor],
  };
};
