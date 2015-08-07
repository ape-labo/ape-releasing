#!/usr/bin/env node

"use strict";

var path = require('path'),
    apeTesting = require('ape-testing'),
    async = require('async');

var basedir = path.resolve(__dirname, '..');

process.chdir(basedir);

async.series([
    function (callback) {
        apeTesting.runNodeunit('test/*_test.js', callback);
    }
], function (err) {
    if (err) {
        console.error(err);
    }
});