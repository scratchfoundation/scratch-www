var tap = require('tap');

var buildLocales = require('../../bin/lib/locale-compare');

tap.test('buildLocalesMergeTranslations', function (t) {
    var existingTranslations = {
        'test.test1': 'It\'s like raaayaaain, on your wedding day',
        'test.test2': 'Free to flyyy, when you already paid'
    };
    var newTranslations = {
        'Isn\'t it ironic? No.': 'Es irónico? No.'
    };
    var md5map = {
        'c21ce5ceefe167028182032d4255a384': ['test.test1'],
        '9c40648034e467e16f8d6ae24bd610ab': ['test.test2'],
        '6885a345adafb3a9dd43d9f549430c88': ['test.test3']
    };

    var mergedTranslations = buildLocales.mergeNewTranslations(existingTranslations, newTranslations, {}, md5map);
    t.ok(mergedTranslations['test.test3'] !== undefined);
    t.ok(mergedTranslations['test.test2'] !== undefined);
    t.end();
});
