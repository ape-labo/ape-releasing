#!/usr/bin/env node

var path = require('path'),
    async = require('async'),
    coz = require('coz');

var basedir = path.resolve(__dirname, '..');

process.chdir(basedir);

async.series([
    function (callback) {
        coz.render([
            '.*.bud',
            'lib/.*.bud',
            'test/.*.bud'
        ], callback);
    }
], function (err) {
    if (err) {
        console.error(err);
    }
});

