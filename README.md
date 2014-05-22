[![npm](https://badge.fury.io/js/slush-node-esnext.png)](http://badge.fury.io/js/slush-node-esnext) ![](https://david-dm.org/briandipalma/slush-node-esnext.png)

# slush-node-esnext

> Slush generator for creating node es next (ES6, ES7) projects, uses traceur.

## Getting Started

### Installation

Install `slush-node-esnext` globally:

```bash
$ npm i -g slush-node-esnext
```

Remember to install `slush` globally as well, if you haven't already:

```bash
$ npm i -g slush
```

### Usage

Create a new folder for your node esnext package. Then cd into it.

```bash
$ mkdir node-esnext-package && cd node-esnext-package
```

Initiate the generator:

```bash
$ slush node-esnext
```

### Tasks

#### bin

```bash
$ slush node-esnext:bin
```

Will add a `bin` key to your `package.json` and a bin cli script which allows your package to run as a global command in your shell.

### Commands

Within your package the generator provides the following commands.

* `npm run build` - Compiles ES6+ modules inside `src` directory to ES5 CommonJS modules.
* `npm run start` - Execute your package. Only works if your package runs from the command line.
* `npm run watch` - Watches `src` directory and rebuilds on changes.

### Conventions

The generator expects a few conventions. They are easy to change if they are not suitable.

* source code for your npm package is in the `src` directory.
* compiled ES6+ code is outputed to the `out` directory.
* the package `main` module is located at `src\index.js`.

## Getting To Know Slush

Slush is a tool that uses Gulp for project scaffolding.

Slush does not contain anything "out of the box", except the ability to locate installed slush generators and to run them with liftoff.

To find out more about Slush, check out the [documentation](https://github.com/slushjs/slush).

## License 

MIT
