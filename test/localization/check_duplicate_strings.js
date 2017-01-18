/*
* Check that there are no duplicate strings in any individual l10n json file.
 */
var path = require('path');
//var fs = require('fs');
var tap = require('tap');

var routes = require('../../src/routes.json');

function noDuplicateValues (idsToCheck, name) {
    var values = {};
    for (var key in idsToCheck) {
        if (values.hasOwnProperty(idsToCheck[key])) {
            // duplicate values
            //return false;
            tap.fail(name + '.' + idsToCheck[key] + ' has duplicates');
        } else {
            values[idsToCheck[key]] = key;
        }
    }
    tap.pass();
    //return true;
}

tap.test('generalCheckForDuplicates', function (t) {
    var ids = require(path.resolve(__dirname, '../../src/l10n.json'));
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
    try {
        var ids = require(path.resolve(__dirname, '../../src/views/' + subdir.join('/') +'/l10n.json'));
        tap.test(name + 'CheckForDuplicates', function (t) {
            noDuplicateValues(ids, name);
            t.end();
        });
    } catch (err) {
     // skip views without l10n files
        continue;
    }
}
