#!usr/bin/env node

var apeReleasing = require('ape-releasing');

apeReleasing.execCommand('ci/build.js', [
    '-a'
], function (err) {
    /*...*/
});