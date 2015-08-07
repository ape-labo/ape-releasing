#!/usr/bin/env node

/**
 * Release this package.
 */

"use strict";

process.chdir(__dirname + '/..');

var apeTasking = require('ape-tasking'),
    apeReleasing = require('../lib');

apeTasking.runTasks('release', [
    function releasePackage(callback) {
        apeReleasing.releasePackage({
            beforeRelease: [
                './ci/build.js',
                './ci/test.js'
            ]
        }, callback);
    }
], true);
