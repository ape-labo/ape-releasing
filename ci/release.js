#!/usr/bin/env node

/**
 * Release this package.
 */

"use strict";

process.chdir(__dirname + '/..');

const apeTasking = require('ape-tasking'),
    apeReleasing = require('../lib');

apeTasking.runTasks('release', [
    (callback) => {
        apeReleasing.releasePackage({
            beforeRelease: [
                './ci/build.js',
                './ci/test.js'
            ],
            'skip-interactive': true
        }, callback);
    }
], true);
