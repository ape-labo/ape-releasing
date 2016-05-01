'use strict'

const co = require('co')
const execcli = require('execcli')

/** @lends runTask */
function runTask (task) {
  return co(function * () {
    if (!task) {
      return
    }
    if (typeof task === 'string') {
      return execcli(task, [])
    }
    return yield new Promise((resolve, reject) => {
      let promise = task((err) => {
        console.warn('[ape-releasing] Task callback is now deprecated. Use promise instead.')
        err ? reject(err) : resolve()
      })
      if (promise) {
        return promise.then(resolve, reject)
      }
    })
  })
}

module.exports = runTask
