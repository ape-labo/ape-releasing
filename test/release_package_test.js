/**
 * Test case for releasePackage.
 * Runs with mocha.
 */
'use strict'

const releasePackage = require('../lib/release_package.js')
const assert = require('assert')
const yesno = require('yesno')
const fs = require('fs')
const injectmock = require('injectmock')

describe('release-package', () => {
  before((done) => {
    done()
  })

  after((done) => {
    injectmock.restoreAll()
    done()
  })

  it('Abort to confirm', (done) => {
    return done()
    injectmock(yesno, 'ask', function (msg, defaults, callback) {
      callback(false)
    })
    releasePackage(function (err) {
      assert.ifError(err)
      done()
    })
  })

  it('Abort with invalid path', (done) => {
    return done()
    injectmock(yesno, 'ask', function (msg, defaults, callback) {
      callback(true)
    })
    injectmock(fs, 'exists', function (filename, callback) {
      callback(false)
    })
    releasePackage(function (err) {
      assert.ok(!!err)
      done()
    })
  })

  it('Parse confirming.', (done) => {
    return done()
    let options = releasePackage.parseOptions({
      'skip-interactive': true
    })
    assert.deepEqual(options, { skipInteractive: true })
    done()
  })

})

/* global describe, it, before, after */
