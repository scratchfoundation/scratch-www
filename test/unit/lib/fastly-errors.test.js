const {describeFastlyError} = require('../../../bin/lib/fastly-errors');

describe('describeFastlyError', () => {
    test('pulls status + message out of a fastly-js rejection object', () => {
        // The shape fastly-js rejects with on a 401 (message lives in response.text).
        const err = {
            status: 401,
            body: {},
            response: {
                status: 401,
                statusMessage: 'Unauthorized',
                body: {},
                text: '{"msg":"Provided credentials are missing or invalid"}'
            },
            error: new Error('Unauthorized')
        };
        expect(describeFastlyError(err)).toBe('HTTP 401 Unauthorized: Provided credentials are missing or invalid');
    });

    test('reads a message from a parsed body detail/msg/title', () => {
        expect(describeFastlyError({status: 400, body: {detail: 'bad vcl'}})).toBe('HTTP 400: bad vcl');
        expect(describeFastlyError({status: 422, body: {title: 'Unprocessable'}})).toBe('HTTP 422: Unprocessable');
    });

    test('falls back to the superagent error message when the body has none', () => {
        expect(describeFastlyError({status: 500, body: {}, error: {message: 'Server Error'}}))
            .toBe('HTTP 500: Server Error');
    });

    test('returns the stack for a real Error', () => {
        expect(describeFastlyError(new Error('boom'))).toMatch(/^Error: boom/);
    });

    test('passes a thrown string straight through', () => {
        expect(describeFastlyError('just a string')).toBe('just a string');
    });

    test('stringifies an unrecognized object rather than "[object Object]"', () => {
        expect(describeFastlyError({whatever: 1})).toBe('{"whatever":1}');
    });
});
