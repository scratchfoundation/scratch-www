const fs = require('fs');
const glob = require('glob');
const tap = require('tap');

const TRANSLATIONS_PATTERN = './node_modules/scratch-l10n/www/**/*.json';
const files = glob.sync(TRANSLATIONS_PATTERN);

const checkJson = (data, name) => {
    try {
        JSON.parse(data);
    } catch (e) {
        tap.fail(`${name} has invalid Json.\n`);
    }
};

tap.test('check valid json', t => {
    files.forEach(f => {
        const data = fs.readFileSync(f);
        checkJson(data, f);
    });
    t.pass();
    t.end();
});
