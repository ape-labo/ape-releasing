ape-releasing
==========

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_shield_url]][bd_travis_url]
[![Code Climate][bd_codeclimate_shield_url]][bd_codeclimate_url]
[![Code Coverage][bd_codeclimate_coverage_shield_url]][bd_codeclimate_url]
[![Dependency Status][bd_gemnasium_shield_url]][bd_gemnasium_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]

[bd_repo_url]: https://github.com/ape-repo/ape-releasing
[bd_travis_url]: http://travis-ci.org/ape-repo/ape-releasing
[bd_travis_shield_url]: http://img.shields.io/travis/ape-repo/ape-releasing.svg?style=flat
[bd_license_url]: https://github.com/ape-repo/ape-releasing/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/ape-repo/ape-releasing
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/ape-repo/ape-releasing.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/ape-repo/ape-releasing.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/ape-repo/ape-releasing
[bd_gemnasium_shield_url]: https://gemnasium.com/ape-repo/ape-releasing.svg
[bd_npm_url]: http://www.npmjs.org/package/ape-releasing
[bd_npm_shield_url]: http://img.shields.io/npm/v/ape-releasing.svg?style=flat
[bd_bower_badge_url]: https://img.shields.io/bower/v/ape-releasing.svg?style=flat

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

ape framework module for releasing tasks.

<!-- Description End -->




<!-- Sections Start -->
<a name="sections"></a>

<!-- Section from "docs/readme/02.Usage.md.hbs" Start -->

<a name="section-docs-readme-02-usage-md"></a>
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
<!-- Section from "docs/readme/02.Usage.md.hbs" End -->


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [MIT License](https://github.com/ape-repo/ape-releasing/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------

+ [ape-repo](https://github.com/ape-repo)
+ [npm](https://www.npmjs.com/)

<!-- Links End -->
