#!/usr/bin/env node

var apeReleasing = require('ape-releasing');

// Release a npm package
apeReleasing.releasePackage({
    beforeRelease: [ // Scripts run before releasing
        './ci/build.js',
        './ci/test.js'
    ]
}, function (err) {
    /*...*/
});
