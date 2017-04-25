var fastly = require('../../bin/lib/fastly-extended');
var tap = require('tap');

tap.test('testSetBackend', function (t) {
    var backend = fastly.setBackend('wemust', 'goback', 'marty');
    t.equal(backend, '' +
        'if (marty) {\n' +
        '    set req.backend = wemust;\n' +
        '    set req.http.host = \"goback\";\n' +
        '}\n'
    );
});

tap.test('testSetForward', function (t) {
    var forward = fastly.setForwardHeaders('alwaysforward');
    t.equal(forward, '' +
        'if (alwaysforward) {\n' +
        '    if (!req.http.Fastly-FF) {\n' +
        '        if (req.http.X-Forwarded-For) {\n' +
        '            set req.http.Fastly-Temp-XFF = req.http.X-Forwarded-For ", " client.ip;\n' +
        '        } else {\n' +
        '            set req.http.Fastly-Temp-XFF = client.ip;\n' +
        '        }\n' +
        '    } else {\n' +
        '        set req.http.Fastly-Temp-XFF = req.http.X-Forwarded-For;\n' +
        '    }\n' +
        '    set req.grace = 60s;\n' +
        '    return(pass);\n' +
        '}\n'
    );
    t.end();
});

tap.test('testSetTTL', function (t) {
    var ttl = fastly.setResponseTTL('itsactuallyttyl');
    t.equal(ttl, '' +
        'if (itsactuallyttyl) {\n' +
        '    set beresp.ttl = 0s;\n' +
        '    set beresp.grace = 0s;\n' +
        '    return(pass);\n' +
        '}\n'
    );
});
