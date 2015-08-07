/**
 * Execute an command.
 * @memberof module:ape-releasing/lib
 * @function execCommand
 * @param {string} cmd - Command bin
 * @param {string[] cmdArgs - Command args.
 * @param {function} callback - Callback when done.
 */

"use strict";

var argx = require('argx'),
    execcli = require('execcli');

/** @lends execCommand */
function execCommand(cmd, cmdArgs, callback) {
    var args = argx(arguments);
    callback = args.pop('function') || callback;
    cmd = args.shift('string');
    cmdArgs = [].concat(args.shift('string|array') || []);
    execcli(cmd, cmdArgs, callback);
}

module.exports = execCommand;
