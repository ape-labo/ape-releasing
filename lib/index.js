/**
 * Releasing module for ape framework.
 * @module ape-releasing
 */

"use strict";

module.exports = {
    get execCommand() { return require('./exec_command'); },
    get releasePackage() { return require('./release_package'); }
};