const jar = require('../../../src/lib/jar');
const cookie = require('cookie');

jest.mock('cookie', () => ({serialize: jest.fn()}));
describe('unit test lib/jar.js', () => {

    test('simple set test with no opts', () => {
        jar.set('name', 'value');
        expect(cookie.serialize).toHaveBeenCalled();
        expect(cookie.serialize).toHaveBeenCalledWith('name', 'value',
            expect.objectContaining({
                path: '/',
                sameSite: 'Lax',
                expires: expect.anything() // not specifically matching the date because it is hard to mock
            }));
    });
    test('with opts', () => {
        jar.set('a', 'b', {option: 'one'});
        expect(cookie.serialize).toHaveBeenCalled();
        expect(cookie.serialize).toHaveBeenCalledWith('a', 'b',
            expect.objectContaining({
                option: 'one',
                path: '/',
                sameSite: 'Lax',
                expires: expect.anything() // not specifically matching the date because it is hard to mock
            }));
    });
    test('expires opts overrides default', () => {
        jar.set('a', 'b', {
            option: 'one',
            expires: 'someday'
        });
        expect(cookie.serialize).toHaveBeenCalled();
        expect(cookie.serialize).toHaveBeenCalledWith('a', 'b',
            expect.objectContaining({
                option: 'one',
                path: '/',
                expires: 'someday'
            }));
    });
    test('sameSite opts overrides default', () => {
        jar.set('a', 'b', {
            option: 'one',
            sameSite: 'override'
        });
        expect(cookie.serialize).toHaveBeenCalled();
        expect(cookie.serialize).toHaveBeenCalledWith('a', 'b',
            expect.objectContaining({
                option: 'one',
                sameSite: 'override'
            }));
    });
});
