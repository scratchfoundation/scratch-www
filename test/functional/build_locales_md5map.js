var fs = require('fs');
var path = require('path');
var tap = require('tap');

var buildLocales = require('../../lib/locale-compare');

tap.test('buildLocalesFile', function (t) {
    var actualMd5map = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../fixtures/test_es_md5map.json'), 'utf8'));
    var templates = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../fixtures/build_locales.json'), 'utf8'));
    var testMd5map = buildLocales.getMD5Map(templates);

    for (var key in actualMd5map) {
        t.ok(testMd5map[key] !== undefined);
    }
    t.end();
});
