'use strict'

const path = require('path')
const external = []
const plugins = []
const globals = {

}
const rollupConfig = {
  input: path.resolve(__dirname, `../src/js/fastscheme.js`),
  output: {
    file: path.resolve(__dirname, `../dist/js/fastscheme.js`),
    format: 'esm',
    globals
  },
  external,
  plugins
}

module.exports = rollupConfig
