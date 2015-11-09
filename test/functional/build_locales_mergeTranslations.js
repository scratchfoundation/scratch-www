var crypto = require('crypto');
var tap = require('tap');

var buildLocales = require('../../src/scripts/buildLocales/helpers');

tap.test('buildLocalesMergeTranslations', function (t) {
    var existingTranslations = {
        'test.test1': 'It\'s like raaayaaain, on your wedding day',
        'test.test2': 'Free to flyyy, when you already paid'
    };
    var md5Test1 = crypto.createHash('md5').update(existingTranslations['test.test1'], 'utf8').digest('hex');
    var md5Test2 = crypto.createHash('md5').update(existingTranslations['test.test2'], 'utf8').digest('hex');
    var md5map = {};
    md5map[md5Test1] = 'test.test1';
    md5map[md5Test2] = 'test.test2';

    var newTranslations = {
        'Isn\'t it ironic? No.': 'Es irónico? No.'
    };
    var md5Test3 = crypto.createHash('md5').update('Isn\'titironic?No.', 'utf8').digest('hex');
    md5map[md5Test3] = 'test.test3';

    var mergedTranslations = buildLocales.mergeNewTranslations(existingTranslations, newTranslations, md5map);
    t.ok(mergedTranslations['test.test3'] !== undefined);
    t.ok(mergedTranslations['test.test2'] !== undefined);
    t.end();
});
