ape-releasing
==========

[![Build Status][my_travis_badge_url]][my_travis_url]
[![Code Climate][my_codeclimate_badge_url]][my_codeclimate_url]
[![Code Coverage][my_codeclimate_coverage_badge_url]][my_codeclimate_url]
[![Dependency Status][my_gemnasium_badge_url]][my_gemnasium_url]
[![npm Version][my_npm_budge_url]][my_npm_url]

ape framework module for releasing tasks.

Installation
----

```javascript
$ npm install ape-releasing --save-dev
```


Usage
----

### Release a npm Package

`.apeReleasing.releasePackage()` function will do:

1. Create a git tag and push to remote.
2. Publish package to npm.
3. Increment package.json version number.
4. Commit and push git local changes.

```javascript
#!/usr/bin/env node

var apeReleasing = require('ape-releasing');

// Release a npm package
apeReleasing.releasePackage({
    beforeRelease: [ // Scripts run before releasing
        './ci/build.js',
        './ci/test.js'
    ]
}, callback);

```

### Execute a Command

`.apeReleasing.execCommand()` will execute a command in sub process and pipe stdout/stderr.

```javascript
#!usr/bin/env node

var apeReleasing = require('ape-releasing');

// Execute a command
apeReleasing.execCommand('ci/build.js', [ // Command args
    '-a'
], function (err) {
    /*...*/
});
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
[my_gemnasium_url]: https://gemnasium.com/ape-repo/ape-releasing
[my_gemnasium_badge_url]: https://gemnasium.com/ape-repo/ape-releasing.svg
[my_npm_url]: http://www.npmjs.org/package/ape-releasing
[my_npm_budge_url]: http://img.shields.io/npm/v/ape-releasing.svg?style=flat

