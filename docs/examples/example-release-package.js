#!/usr/bin/env node

/**
 * This is an example to release packages.
 */
"use strict";


var apTasking = require('ape-tasking'),
    apeReleasing = require('ape-releasing');

apTasking.runTasks('release', [
    function (callback) {
        // Task before releasing.
        callback(null);
    },
    function (callback) {
        apeReleasing.releasePackage({/*options*/}, callback);
    },
    function (callback) {
        // Task after releasing.
        callback(null);
    }
], true);
