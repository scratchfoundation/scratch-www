var fs = require('fs');
var glob = require('glob');
var tap = require('tap');

var TRANSLATIONS_PATTERN = './node_modules/scratchr2_translations/www/**/*.json';
var files = glob.sync(TRANSLATIONS_PATTERN);

function checkJson (data, name) {
    try {
        JSON.parse(data);
    } catch (e) {
        tap.fail(name + ' has invalid Json.\n');
    }
    tap.pass();
}

files.forEach(function (f) {
    tap.test('check valid json', function (t) {
        fs.readFile(f, function (err, data) {
            if (err) {
                throw err;
            }
            checkJson(data, f);
        });
        t.end();
    });
});
