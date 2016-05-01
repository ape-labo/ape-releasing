/**
 * ape framework module for releasing tasks.
 * @module ape-releasing
 */

'use strict'

let d = (module) => module.default || module

module.exports = {
  get releasePackage () { return d(require('./release_package')) }
}
