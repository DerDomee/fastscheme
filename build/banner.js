'use strict'

const pkg = require('./../package.json')
const year = new Date().getFullYear()

function getBanner() {
  return `/*!
  * Fastscheme v${pkg.version} (${pkg.homepage})
  * Copyright 2019-${year} ${pkg.author}
  * Licensed under MIT (https://github.com/DerDomee/fastscheme/blob/master/LICENSE)
  */`
}

module.exports = getBanner
