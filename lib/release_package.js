/**
 * Release node js package.
 * @memberof module:ape-releasing/lib
 * @function releasePackage
 * @param {object} [options] - Optional settings.
 * @param {function[]} [options.beforeRelease] - Tasks to do before release.
 * @param {function[]} [options.afterRelease] - Tasks to do after release.
 * @param {boolean} [options.skipInteractive] - Skip interactive.
 * @param {string} [options.confirmMsg=releasePackage.CONFIRM_MSG] - Confirm message before release.
 * @return {Promise}
 */

'use strict'

const argx = require('argx')
const path = require('path')
const fs = require('fs')
const apeAsking = require('ape-asking')
const parseOptions = require('./_parse_options')

const co = require('co')
const runTask = require('./tasking/run_task')
const doRelease = require('./releasing/do_release')

let warnCallback = () => console.warn('[ape-relaseing] Callback is no deprecated. Use promise interface instead.')

/** @lends releasePackage */
function releasePackage (options) {
  let args = argx(arguments)
  let callback = args.pop('function')
  options = args.pop('object') || {}

  options = releasePackage.parseOptions(options)
  return co(function * () {
    let skipInteractive = !!options.skipInteractive
    if (!skipInteractive) {
      let confirmMsg = options.confirmMsg || releasePackage.CONFIRM_MSG
      let sure = yield apeAsking.askYesNo(confirmMsg)
      if (!sure) {
        if (callback) {
          warnCallback()
          callback()
        }
        return
      }
    }

    let pkgPath = path.resolve(process.cwd(), 'package.json')

    let exists = yield new Promise((resolve) =>
      fs.exists(pkgPath, (exists) => resolve(exists))
    )
    if (!exists) {
      throw new Error('package.json not found.')
    }
    let pkg = require(pkgPath)

    for (let task of [].concat(options.beforeRelease)) {
      yield runTask(task)
    }

    yield doRelease(pkg)

    for (let task of [].concat(options.afterRelease)) {
      yield runTask(task)
    }

    if (callback) {
      warnCallback()
      callback()
    }
  }).catch((err) => {
    warnCallback()
    callback(err)
    return Promise.reject(err)
  })
}

Object.assign(releasePackage, {
  parseOptions,
  CONFIRM_MSG: 'Are you sure to release new version? (y/N) '
})

module.exports = releasePackage
