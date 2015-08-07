#!usr/bin/env node

var apeReleasing = require('ape-releasing');

// Execute a command
apeReleasing.execCommand('ci/build.js', [ // Command args
    '-a'
], function (err) {
    /*...*/
});