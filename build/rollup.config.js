'use strict'

const path = require('path')
const babel = require('rollup-plugin-babel')
const plugins = [
  babel({
    exclude: 'node_modules/**',
    externalHelpersWhitelist: [
      'createClass',
      'createSuper',
      'defineProperties',
      'defineProperty',
      'getPrototypeOf',
      'inheritsLoose',
      'objectSpread2'
    ]
  })
]
const rollupConfig = {
  input: path.resolve(__dirname, `../src/js/fastscheme.js`),
  output: {
    file: path.resolve(__dirname, `../dist/js/fastscheme.js`),
    format: 'umd',
    name: 'fastscheme'
  }
}

module.exports = rollupConfig
