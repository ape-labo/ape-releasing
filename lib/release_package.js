/**
 * Release node js package.
 * @memberof module:ape-releasing/lib
 * @function releasePackage
 * @param {object} [options] - Optional settings.
 * @param {function[]} [options.beforeRelease] - Tasks to do before release.
 * @param {function[]} [options.afterRelease] - Tasks to do after release.
 * @param {boolean} [options.skipInteractive] - Skip interactive.
 * @param {string} [options.confirmMsg=releasePackage.CONFIRM_MSG] - Confirm message before release.
 * @param {function} callback - Callback when done.
 */

"use strict";

const argx = require('argx'),
    path = require('path'),
    fs = require('fs'),
    async = require('async'),
    apeAsking = require('ape-asking'),
    taggit = require('taggit'),
    colorprint = require('colorprint'),
    _parseOptions = require('./_parse_options'),
    versionup = require('versionup'),
    execcli = require('execcli');

/** @lends releasePackage */
function releasePackage(options, callback) {
    let args = argx(arguments);
    callback = args.pop('function') || argx.noop;
    options = args.pop('object') || {};

    options = releasePackage._parseOptions(options);
    let skipInteractive = !!options.skipInteractive;
    if (skipInteractive) {
        releasePackage._doRelease(options, callback);
    } else {
        let confirmMsg = options.confirmMsg || releasePackage.CONFIRM_MSG;
        apeAsking.askYesNo(confirmMsg, {
            yes: () => {
                releasePackage._doRelease(options, callback);
            },
            no: () => {
                callback(null);
            }
        });
    }
}

releasePackage._parseOptions = _parseOptions;

releasePackage._doRelease = function (options, callback) {

    let pkgPath = path.resolve(process.cwd(), 'package.json');
    fs.exists(pkgPath, (exists) => {
        if (!exists) {
            callback(new Error('package.json not found.'));
            return;
        }
        let pkg = require(pkgPath);

        let beforeRelease = options.beforeRelease || [],
            afterRelease = options.afterRelease || [];

        async.series([
            (callback) => {
                async.series([].concat(beforeRelease).map(releasePackage.task), callback);
            },
            (callback) => {
                releasePackage.execute(pkg, callback);
            },
            (callback) => {
                async.series([].concat(afterRelease).map(releasePackage.task), callback);
            }
        ], callback);
    });
};

releasePackage.task = function (task) {
    if (typeof(task) === 'string') {
        return function (callback) {
            execcli(task, [], callback);
        }
    }
    return task;
};

releasePackage.execute = function (pkg, callback) {
    let logger = new colorprint.Colorprint({
        PREFIX: '[ape-releasing] '
    });
    async.series([
        (callback) => {
            logger.info('Creating git tag...');
            taggit({}, callback);
        },
        (callback) => {
            if (pkg['private']) {
                logger.debug('Skip publishing to npm since this is private package.');
                callback(null);
                return;
            }
            logger.info('Publishing to npm...');
            execcli('npm', ['publish', '.'], callback);
        },
        (callback) => {
            logger.info('Updating package version...');
            versionup({}, callback);
        },
        (callback) => {
            logger.info('Pushing git changes...');
            execcli('git', ['add', '.', '-A'], callback);
        },
        (callback) => {
            var commitMsg = 'Version incremented to ' + pkg['version'];
            execcli('git', ['commit', '-m', commitMsg], callback)
        },
        (callback) => {
            execcli('git', ['push'], callback);
        }
    ], callback);
};

releasePackage.CONFIRM_MSG = 'Are you sure to release new version? (y/N) ';

module.exports = releasePackage;
