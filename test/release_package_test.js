/**
 * Test case for releasePackage.
 * Runs with mocha.
 */
"use strict";

const releasePackage = require('../lib/release_package.js'),
    assert = require('assert'),
    yesno = require('yesno'),
    fs = require('fs'),
    injectmock = require('injectmock');

describe('release-package', () => {

    before((done) => {
        done();
    });

    after((done) => {
        injectmock.restoreAll();
        done();
    });


    it('Abort to confirm', (done) => {
        injectmock(yesno, 'ask', function (msg, defaults, callback) {
            callback(false);
        });
        releasePackage(function (err) {
            assert.ifError(err);
            done();
        });
    });


    it('Abort with invalid path', (done) => {
        injectmock(yesno, 'ask', function (msg, defaults, callback) {
            callback(true);
        });
        injectmock(fs, 'exists', function (filename, callback) {
            callback(false);
        });
        releasePackage(function (err) {
            assert.ok(!!err);
            done();
        });
    });


    it('Wrap task.', (done) => {
        assert.ok(releasePackage.task('foo'));
        assert.ok(releasePackage.task(function () {
        }));
        done();
    });

    it('Parse confirming.', (done) => {
        let options = releasePackage._parseOptions({
            'skip-interactive': true
        });
        assert.deepEqual(options, {skipInteractive: true});
        done();
    });

});

