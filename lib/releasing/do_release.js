'use strict'

const co = require('co')
const execcli = require('execcli')
const taggit = require('taggit')
const versionup = require('versionup')
const { Colorprint } = require('colorprint')

/** @lends doRelease */
function doRelease (pkg) {
  let logger = new Colorprint({
    PREFIX: '[ape-releasing] '
  })
  return co(function * () {
    logger.info('Creating git tag...')
    yield new Promise((resolve, reject) =>
      taggit({}, (err) => err ? reject(err) : resolve())
    )

    let isPrivate = pkg[ 'private' ] && !pkg[ 'publishConfig' ]
    if (isPrivate) {
      logger.debug('Skip publishing to npm since this is private package.')
      return
    }

    logger.info('Publishing to npm...')
    yield execcli('npm', [ 'publish', '.' ])

    logger.info('Updating package version...')
    yield versionup({})

    logger.info('Pushing git changes...')
    yield execcli('git', [ 'add', '.', '-A' ])

    let commitMsg = `Version incremented to ${pkg[ 'version' ]}`
    yield execcli('git', [ 'commit', '-m', commitMsg ])
    yield execcli('git', [ 'push' ])
  })
}

module.exports = doRelease
