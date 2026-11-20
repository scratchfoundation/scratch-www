const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const {outagePageResponseObjects} = require('../../../bin/lib/outage-pages');

describe('outage-pages', () => {
    let fakeBuildDir;

    const writePage = (name, content) => {
        fs.mkdirSync(path.join(fakeBuildDir, 'cdn'), {recursive: true});
        fs.writeFileSync(path.join(fakeBuildDir, 'cdn', name), content);
    };

    beforeEach(() => {
        fakeBuildDir = fs.mkdtempSync(path.join(os.tmpdir(), 'outage-pages-'));
    });

    afterEach(() => {
        fs.rmSync(fakeBuildDir, {recursive: true, force: true});
    });

    test('maps each built page to its Fastly response object', () => {
        writePage('maintenance.html', '<p>maintenance</p>');
        writePage('trouble.html', '<p>trouble</p>');
        expect(outagePageResponseObjects(fakeBuildDir)).toEqual([
            {name: 'Maintenance', content: '<p>maintenance</p>'},
            {name: 'Trouble Response', content: '<p>trouble</p>'}
        ]);
    });

    test('rejects a page that would end the VCL long string early', () => {
        writePage('maintenance.html', '<script>const x = {a: "b", c: 1};</script>');
        writePage('trouble.html', '<script>const x = {a: "b"}</script>');
        expect(() => outagePageResponseObjects(fakeBuildDir)).toThrow(/trouble\.html contains "}/);
    });

    test('rejects a page over Fastly\'s content length limit', () => {
        writePage('maintenance.html', 'x'.repeat(65535));
        writePage('trouble.html', 'x'.repeat(65536));
        expect(() => outagePageResponseObjects(fakeBuildDir))
            .toThrow(/trouble\.html is 65536 characters, over Fastly's 65535-character limit/);
    });

    test('fails when a page has not been built', () => {
        writePage('maintenance.html', '<p>maintenance</p>');
        expect(() => outagePageResponseObjects(fakeBuildDir)).toThrow(/ENOENT/);
    });
});
