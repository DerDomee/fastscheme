'use strict'

const path = require('path')
const babel = require('rollup-plugin-babel')
const banner = require('./banner.js')

const NOOVERRIDES = process.env.NOOVERRIDES === 'true'

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
  input: path.resolve(__dirname, `../src/js/fastscheme${NOOVERRIDES ? '-nooverrides' : ''}.js`),
  output: {
    banner,
    file: path.resolve(__dirname, `../dist/js/fastscheme${NOOVERRIDES ? '-nooverrides' : ''}.js`),
    format: 'umd',
    name: 'fastscheme'
  }
}

module.exports = rollupConfig
