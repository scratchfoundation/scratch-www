var fs = require('fs');
var path = require('path');
var po2icu = require('po2icu');
var tap = require('tap');

var buildLocales = require('../../intl/locale-compare');

tap.test('buildLocalesFile', function (t) {
    var md5map = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../fixtures/test_es_md5map.json'), 'utf8'));
    var newTranslations = po2icu.poFileToICUSync('es', path.resolve(__dirname, '../fixtures/test_es.po'));
    var translations = buildLocales.mergeNewTranslations({}, newTranslations, {}, md5map);

    t.ok(translations['test.id1'] !== undefined);
    t.ok(translations['test.id2'] !== undefined);
    t.end();
});
