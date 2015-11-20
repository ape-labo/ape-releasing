"use strict";

var stringcase = require('stringcase');

module.exports =  function _parseOptions(options) {
    var parsed = {};
    Object.keys(options || {}).forEach(function (key) {
        parsed[stringcase.camelcase(key)] = options[key];
    });
    return parsed;
};
