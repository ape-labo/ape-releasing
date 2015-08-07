#!/usr/bin/env node

/**
 * Run coverage
 */

"use strict";

var path = require('path'),
    async = require('async'),
    apeCovering = require('../lib');

var basedir = path.resolve(__dirname, '..');
process.chdir(basedir);

async.series([
    function (callback) {
        apeCovering.measureCoverage(
            require.resolve('./test.js'), [], {
                dir: 'coverage'
            }, callback
        );
    }
], function (err) {
    if (err) {
        console.error(err);
    }
});