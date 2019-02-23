/**
 * ape framework module for releasing tasks.
 * @module ape-releasing
 */

'use strict'


const releasePackage = require('./release_package')

exports.releasePackage = releasePackage

module.exports = {
  releasePackage
}
