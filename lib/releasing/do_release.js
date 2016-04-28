'use strict'

const co = require('co')
const execcli = require('execcli')
const taggit = require('taggit')
const versionup = require('versionup')
const colorprint = require('colorprint')
const async = require('async')

/** @lends doRelease */
function doRelease (pkg) {
  let logger = new colorprint.Colorprint({
    PREFIX: '[ape-releasing] '
  })
  return co(function * () {
    yield new Promise((resolve, reject) =>
      async.series([
        (callback) => {
          logger.info('Creating git tag...')
          taggit({}, callback)
        },
        (callback) => {
          if (pkg[ 'private' ]) {
            logger.debug('Skip publishing to npm since this is private package.')
            callback(null)
            return
          }
          logger.info('Publishing to npm...')
          execcli('npm', [ 'publish', '.' ], callback)
        },
        (callback) => {
          logger.info('Updating package version...')
          versionup({}, callback)
        },
        (callback) => {
          logger.info('Pushing git changes...')
          execcli('git', [ 'add', '.', '-A' ], callback)
        },
        (callback) => {
          var commitMsg = 'Version incremented to ' + pkg[ 'version' ]
          execcli('git', [ 'commit', '-m', commitMsg ], callback)
        },
        (callback) => {
          execcli('git', [ 'push' ], callback)
        }
      ], (err) => err ? reject(err) : resolve())
    )
  })
}

module.exports = doRelease
