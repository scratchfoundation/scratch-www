const route = require('../../../src/lib/route');

describe('unit test lib/route.js', () => {

    test('getURIClassroomToken exists', () => {
        expect(typeof route.getURIClassroomToken).toBe('function');
    });

    test('getURIClassroomToken parses URI paths like /classes/21/register/r9n5f5xk', () => {
        const response = route.getURIClassroomToken('/classes/21/register/r9n5f5xk');
        expect(response).toEqual('r9n5f5xk');
    });

    test('getURIClassroomToken parses URI paths like /signup/e2dcfkx95', () => {
        const response = route.getURIClassroomToken('/signup/e2dcfkx95');
        expect(response).toEqual('e2dcfkx95');
    });

    test('getURIClassroomToken works with trailing slash', () => {
        const response = route.getURIClassroomToken('/signup/r9n5f5xk/');
        expect(response).toEqual('r9n5f5xk');
    });
});
