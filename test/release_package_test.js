/**
 * Test case for releasePackage.
 * Runs with nodeunit.
 */

var releasePackage = require('../lib/release_package.js'),
    yesno = require('yesno'),
    fs = require('fs'),
    childProcess = require('child_process'),
    injectmock = require('injectmock');

exports.tearDown = function (done) {
    injectmock.restoreAll();
    done();
};

exports['Abort to confirm'] = function (test) {
    injectmock(yesno, 'ask', function (msg, defaults, callback) {
        callback(false);
    });
    releasePackage(function (err) {
        test.ifError(err);
        test.done();
    });
};


exports['Abort with invalid path'] = function (test) {
    injectmock(yesno, 'ask', function (msg, defaults, callback) {
        callback(true);
    });
    injectmock(fs, 'exists', function (filename, callback) {
        callback(false);
    });
    releasePackage(function (err) {
        test.ok(!!err);
        test.done();
    });
};

