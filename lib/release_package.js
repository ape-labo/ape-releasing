/**
 * Release node js package.
 * @memberof module:ape-releasing/lib
 * @function releasePackage
 * @param {object} options - Optional settings.
 * @param {string} [options.confirmMsg=releasePackage.CONFIRM_MSG] - Confirm message before release.
 * @param {function} callback - Callback when done.
 */

"use strict";

var argx = require('argx'),
    path = require('path'),
    fs = require('fs'),
    async = require('async'),
    yesno = require('yesno'),
    taggit = require('taggit'),
    versionup = require('versionup'),
    execcli = require('execcli');

/** @lends releasePackage */
function releasePackage(options, callback) {
    var args = argx(arguments);
    callback = args.pop('function') || argx.noop;
    options = args.pop('object') || {};

    var confirmMsg = options.confirmMsg || releasePackage.CONFIRM_MSG;
    yesno.ask(confirmMsg, false, function (sure) {
        if (!sure) {
            callback(null);
            return;
        }
        var pkgPath = path.resolve(process.cwd(), 'package.json');
        fs.exists(pkgPath, function (exists) {
            if (!exists) {
                callback(new Error('package.json not found.'));
                return;
            }
            var pkg = require(pkgPath);
            releasePackage.execute(pkg, callback);
        });
    });
}

releasePackage.execute = function (pkg, callback) {
    async.series([
        function (callback) {
            taggit({}, callback);
        },
        function (callback) {
            execcli('npm', ['publish', '.'], callback);
        },
        function (callback) {
            versionup({}, callback);
        },
        function (callback) {
            execcli('git', ['add', '.', '-A'], callback);
        },
        function (callback) {
            var commitMsg = 'Version incremented to ' + pkg['version'];
            execcli('git', ['commit', '-m', commitMsg], callback)
        },
        function (callback) {
            execcli('git', ['push'], callback);
        }
    ], callback);
};

releasePackage.CONFIRM_MSG = 'Are you sure to release new version? (y/N) ';

module.exports = releasePackage;
