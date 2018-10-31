'use strict'

const execcli = require('execcli')

/** @lends runTask */
async function runTask (task) {
  if (!task) {
    return
  }
  if (typeof task === 'string') {
    return execcli(task, [])
  }
  return await new Promise((resolve, reject) => {
    let promise = task((err) => {
      console.warn('[ape-releasing] Task callback is now deprecated. Use promise instead.')
      err ? reject(err) : resolve()
    })
    if (promise) {
      return promise.then(resolve, reject)
    }
  })
}

module.exports = runTask
