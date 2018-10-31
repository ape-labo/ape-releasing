/**
 * ape framework module for releasing tasks.
 * @module ape-releasing
 */

'use strict'

const _d = (module) => module && module.default || module

const releasePackage = _d(require('./release_package'))

module.exports = {
  releasePackage
}
