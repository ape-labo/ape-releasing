#!/usr/bin/env node

var apeReleasing = require('ape-releasing');

apeReleasing.releasePackage({
    beforeRelease: [
        './ci/build.js',
        './ci/test.js'
    ]
}, callback);
