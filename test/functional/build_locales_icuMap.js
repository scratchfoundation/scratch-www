var merge = require('lodash.merge');
var tap = require('tap');

var buildLocales = require('../../bin/lib/locale-compare');

tap.test('buildIcuMap', function (t) {
    var ids1 = {
        'first.test1' : 'We know where we\'re going, but we don\'t know where we\'ve been',
        'first.test2' : 'You may find yourself living in a shotgun shack'
    };
    var ids2 = {
        'second.test1' : 'We know where we\'re going, but we don\'t know where we\'ve been',
        'second.test2' : 'Gadji beri bimba clandridi'
    };

    var testicuMap = buildLocales.icuToIdMap('first', ids1);
    testicuMap = merge(testicuMap, buildLocales.icuToIdMap('second', ids2), buildLocales.customMerge);

    t.ok(testicuMap['We know where we\'re going, but we don\'t know where we\'ve been'].length === 2);
    t.ok(testicuMap['You may find yourself living in a shotgun shack'].length === 1);
    t.ok(testicuMap['Gadji beri bimba clandridi'].length === 1);
    t.end();
});
