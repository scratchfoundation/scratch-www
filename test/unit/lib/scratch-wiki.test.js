const getScratchWikiLink = require('../../../src/lib/scratch-wiki');

describe('unit test lib/scratch-wiki.js', () => {
    test('getScratchWikiLink exists', () => {
        expect(typeof getScratchWikiLink).toBe('function');
    });

    test('it returns link to jawiki when ja is given', () => {
        expect(getScratchWikiLink('ja')).toBe('https://ja.scratch-wiki.info/');
    });

    test('it returns link to jawiki when ja-Hira is given', () => {
        expect(getScratchWikiLink('ja-Hira')).toBe('https://ja.scratch-wiki.info/');
    });

    test('it returns link to enwiki when invalid locale is given', () => {
        expect(getScratchWikiLink('test')).toBe('https://en.scratch-wiki.info/');
    });
});
