/**
 * ape framework module for releasing tasks.
 * @module ape-releasing
 */

"use strict";

module.exports = {
    get execCommand() { return require('./exec_command'); },
    get releasePackage() { return require('./release_package'); }
};