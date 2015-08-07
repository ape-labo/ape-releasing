#!/usr/bin/env node


/**
 * Release this package.
 */

"use strict";

var path = require('path'),
    async = require('async'),
    apeReleasing = require('../lib');

var basedir = path.resolve(__dirname, '..');
process.chdir(basedir);


async.series([
    function (callback) {
        apeReleasing.releasePackage({}, callback);
    }
], function (err) {
    console.log('release done!');
    if (err) {
        console.error(err);
    }
});