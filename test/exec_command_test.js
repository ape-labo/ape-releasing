/**
 * Test case for execCommand.
 * Runs with nodeunit.
 */

var execCommand = require('../lib/exec_command.js');

exports['Exec command'] = function (test) {
    execCommand('ls', ['.'], function (err) {
        test.ifError(err);
        test.done();
    });
};

exports['Exec command without args'] = function (test) {
    execCommand('pwd', function (err) {
        test.ifError(err);
        test.done();
    });
};

