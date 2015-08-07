#!/usr/bin/env node

/**
 * This is an example to exec a command.
 */
"use strict";


var apeReleasing = require('ape-releasing');

apeReleasing.execCommand('ci/build.js', [
    // Command args
    '-a'
], function (err) {
    /*...*/
});