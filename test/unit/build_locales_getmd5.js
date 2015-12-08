var tap = require('tap');

var buildLocales = require('../../lib/locale-compare');

tap.test('buildLocalesGetMD5', function (t) {
    var testString1 = 'are there bears here?';
    var testString2 = 'are\nthere\tbears here?';
    
    t.equal(buildLocales.getMD5(testString1), buildLocales.getMD5(testString2));
    t.end();
});
