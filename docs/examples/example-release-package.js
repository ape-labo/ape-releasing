#!/usr/bin/env node

/**
 * This is an example to release packages.
 */
"use strict";

var apeReleasing = require('ape-releasing');

apeReleasing.releasePackage({
    beforeRelease: [
        './ci/build.js',
        './ci/test.js'
    ]
}, callback);
