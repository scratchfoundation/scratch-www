var fs = require('fs');
var glob = require('glob');
var tap = require('tap');

var TRANSLATIONS_PATTERN = './node_modules/scratch-l10n/www/**/*.json';
var files = glob.sync(TRANSLATIONS_PATTERN);

const checkJson = (data, name) => {
    try {
        JSON.parse(data);
    } catch (e) {
        tap.fail(name + ' has invalid Json.\n');
    }
};

tap.test('check valid json', function (t) {
    files.forEach(function (f) {
        const data = fs.readFileSync(f);
        checkJson(data, f);
    });
    t.pass();
    t.end();
});
