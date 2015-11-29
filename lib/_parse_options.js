"use strict";

const stringcase = require('stringcase');

module.exports = function _parseOptions(options) {
    let parsed = {};
    Object.keys(options || {}).forEach((key) => {
        parsed[stringcase.camelcase(key)] = options[key];
    });
    return parsed;
};
