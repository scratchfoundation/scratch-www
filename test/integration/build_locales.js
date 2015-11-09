var fs = require('fs');
var path = require('path');
var po2icu = require('po2icu');
var tap = require('tap');

var buildLocales = require('../../src/scripts/buildLocales/helpers');

tap.test('buildLocalesFile', function (t) {
    var templates = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../fixtures/build_locales.json'), 'utf8'));
    var md5map = buildLocales.getMD5Map(templates);
    var newTranslations = po2icu.poFileToICUSync('es', path.resolve(__dirname, '../fixtures/build_locales.po'));
    var translations = buildLocales.mergeNewTranslations({}, newTranslations, md5map);

    t.ok(translations['test.id1'] !== undefined);
    t.ok(translations['test.id2'] !== undefined);
    t.end();
});
