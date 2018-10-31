'use strict'

const execcli = require('execcli')
const taggit = require('taggit')
const versionup = require('versionup')
const { Colorprint } = require('colorprint')

/** @lends doRelease */
async function doRelease (pkg) {
  let logger = new Colorprint({
    PREFIX: '[ape-releasing] '
  })
  logger.info('Creating git tag...')
  await taggit({})

  let isPrivate = pkg['private'] && !pkg['publishConfig']
  if (isPrivate) {
    logger.debug('Skip publishing to npm since this is private package.')
    return
  }

  logger.info('Publishing to npm...')
  await execcli('npm', ['publish', '.'])

  logger.info('Updating package version...')
  await versionup({})

  logger.info('Pushing git changes...')
  await execcli('git', ['add', '.', '-A'])

  let commitMsg = `Version incremented to ${pkg['version']}`
  await execcli('git', ['commit', '-m', commitMsg])
  await execcli('git', ['push'])
}

module.exports = doRelease
