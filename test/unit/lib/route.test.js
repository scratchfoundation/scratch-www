const route = require('../../../src/lib/route');

describe('unit test lib/route.js', () => {

    test('getURIClassroomToken exists', () => {
        expect(typeof route.getURIClassroomToken).toBe('function');
    });

    test('getURIClassroomToken parses URI paths like /classes/21/register/r9n5f5xk', () => {
        let response;
        response = route.getURIClassroomToken('/classes/21/register/r9n5f5xk');
        expect(response).toEqual('r9n5f5xk');
    });

    test('getURIClassroomToken parses URI paths like /join/e2dcfkx95', () => {
        let response;
        response = route.getURIClassroomToken('/join/e2dcfkx95');
        expect(response).toEqual('e2dcfkx95');
    });

    test('getURIClassroomToken works with trailing slash', () => {
        let response;
        response = route.getURIClassroomToken('/join/r9n5f5xk/');
        expect(response).toEqual('r9n5f5xk');
    });
});
