'use strict'

const co = require('co')
const execcli = require('execcli')

/** @lends runTask */
function runTask (task) {
  return co(function * () {
    if (typeof task === 'string') {
      return yield new Promise((resolve, reject) =>
        execcli(task, [], (err) =>
          err ? reject(err) : resolve()
        )
      )
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
