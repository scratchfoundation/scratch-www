/*
* Check that there are no duplicate strings in any individual l10n json file.
 */
var path = require('path');
var fs = require('fs');
var tap = require('tap');

var routes = require('../../src/routes.json');

const noDuplicateValues = (idsToCheck, name) => {
    let values = {};
    for (const key in idsToCheck) {
        if (values.hasOwnProperty(idsToCheck[key])) {
            // duplicate values
            // return false;
            tap.fail(`${name}.${idsToCheck[key]} has duplicates`);
        } else {
            values[idsToCheck[key]] = key;
        }
    }
    tap.pass();
    // return true;
};

tap.test('generalCheckForDuplicates', function (t) {
    const ids = require(path.resolve(__dirname, '../../src/l10n.json')); // eslint-disable-line global-require
    noDuplicateValues(ids, 'general');
    t.end();
});

for (var v in routes) {
    if (typeof routes[v].redirect !== 'undefined') {
        continue;
    }
    var subdir = routes[v].view.split('/');
    subdir.pop();
    var name = routes[v].name;
    var uri = path.resolve(__dirname, '../../src/views/' + subdir.join('/') + '/l10n.json');
    try {
        var file = fs.readFileSync(uri, 'utf8');
        var ids = JSON.parse(file);
        tap.test(name + 'CheckForDuplicates', function (t) { // eslint-disable-line no-loop-func
            noDuplicateValues(ids, name);
            t.end();
        });
    } catch (err) {
        if (err.code !== 'ENOENT') {
            // ignore if ENOENT for routes with no l10n file, throw error for anything else
            throw err;
        }
    }
}
