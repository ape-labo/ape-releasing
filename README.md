ape-releasing
==========

[![Build Status][my_travis_badge_url]][my_travis_url]
[![Code Climate][my_codeclimate_badge_url]][my_codeclimate_url]
[![Code Coverage][my_codeclimate_coverage_badge_url]][my_codeclimate_url]
[![npm version][my_npm_budge_url]][my_npm_url]

ape framework module for releasing tasks.


Usage
----

### Do release.

`.apeReleasing.releasePackage()` function will do:

1. Create a git tag and push to remote.
2. Publish package to npm.
3. Increment package.json version number.
4. Commit and push git local changes.

```javascript
#!/usr/bin/env node

var apeReleasing = require('ape-releasing');

apeReleasing.releasePackage({
    beforeRelease: [
        './ci/build.js',
        './ci/test.js'
    ]
}, callback);

```

### Exec a command.

`.apeReleasing.execCommand()` will execute a command in sub process and pipe stdout/stderr.

```javascript
#!usr/bin/env node

var apeReleasing = require('ape-releasing');

apeReleasing.execCommand('ci/build.js', [
    '-a'
], function (err) {
    /*...*/
});
```


Installation
----

```javascript
$ npm install ape-releasing --save
```


License
-------
This software is released under the [MIT License][my_license_url].


Links
------

+ [ape-repo](https://github.com/ape-repo)


[npm_url]: https://www.npmjs.org/
[my_repo_url]: https://github.com/ape-repo/ape-releasing
[my_travis_url]: http://travis-ci.org/ape-repo/ape-releasing
[my_travis_badge_url]: http://img.shields.io/travis/ape-repo/ape-releasing.svg?style=flat
[my_license_url]: https://github.com/ape-repo/ape-releasing/blob/master/LICENSE
[my_codeclimate_url]: http://codeclimate.com/github/ape-repo/ape-releasing
[my_codeclimate_badge_url]: http://img.shields.io/codeclimate/github/ape-repo/ape-releasing.svg?style=flat
[my_codeclimate_coverage_badge_url]: http://img.shields.io/codeclimate/coverage/github/ape-repo/ape-releasing.svg?style=flat
[my_coverage_url]: http://ape-repo.github.io/ape-releasing/coverage/lcov-report
[my_npm_url]: http://www.npmjs.org/package/ape-releasing
[my_npm_budge_url]: http://img.shields.io/npm/v/ape-releasing.svg?style=flat

