const validate = require('../../../src/lib/validate');

describe('unit test lib/validate.js', () => {
    test('validate username locally', () => {
        let response;
        expect(typeof validate.validateUsernameLocally).toBe('function');
        response = validate.validateUsernameLocally('abc');
        expect(response).toEqual({valid: true});
        response = validate.validateUsernameLocally('abcdefghijklmnopqrst');
        expect(response).toEqual({valid: true});
        response = validate.validateUsernameLocally('abc-def-ghi');
        expect(response).toEqual({valid: true});
        response = validate.validateUsernameLocally('');
        expect(response).toEqual({valid: false, errMsgId: 'general.required'});
        response = validate.validateUsernameLocally('ab');
        expect(response).toEqual({valid: false, errMsgId: 'registration.validationUsernameMinLength'});
        response = validate.validateUsernameLocally('abcdefghijklmnopqrstu');
        expect(response).toEqual({valid: false, errMsgId: 'registration.validationUsernameMaxLength'});
        response = validate.validateUsernameLocally('abc def');
        expect(response).toEqual({valid: false, errMsgId: 'registration.validationUsernameRegexp'});
        response = validate.validateUsernameLocally('abc!def');
        expect(response).toEqual({valid: false, errMsgId: 'registration.validationUsernameRegexp'});
        response = validate.validateUsernameLocally('abc😄def');
        expect(response).toEqual({valid: false, errMsgId: 'registration.validationUsernameRegexp'});
    });

    test('validate password', () => {
        let response;
        expect(typeof validate.validatePassword).toBe('function');
        response = validate.validatePassword('abcdef');
        expect(response).toEqual({valid: true});
        response = validate.validatePassword('abcdefghijklmnopqrst');
        expect(response).toEqual({valid: true});
        response = validate.validatePassword('passwo');
        expect(response).toEqual({valid: true});
        response = validate.validatePassword('');
        expect(response).toEqual({valid: false, errMsgId: 'general.required'});
        response = validate.validatePassword('abcde');
        expect(response).toEqual({valid: false, errMsgId: 'registration.validationPasswordLength'});
        response = validate.validatePassword('password');
        expect(response).toEqual({valid: false, errMsgId: 'registration.validationPasswordNotEquals'});
        response = validate.validatePassword('abcdefg', 'abcdefg');
        expect(response).toEqual({valid: false, errMsgId: 'registration.validationPasswordNotUsername'});
        response = validate.validatePassword('abcdefg', 'abcdefG');
        expect(response).toEqual({valid: true});
    });

    test('validate password confirm', () => {
        let response;
        expect(typeof validate.validatePasswordConfirm).toBe('function');
        response = validate.validatePasswordConfirm('abcdef', 'abcdef');
        expect(response).toEqual({valid: true});
        response = validate.validatePasswordConfirm('abcdefghijklmnopqrst', 'abcdefghijklmnopqrst');
        expect(response).toEqual({valid: true});
        response = validate.validatePasswordConfirm('passwo', 'passwo');
        expect(response).toEqual({valid: true});
        response = validate.validatePasswordConfirm('', '');
        expect(response).toEqual({valid: false, errMsgId: 'general.required'});
        response = validate.validatePasswordConfirm('abcdef', 'abcdefg');
        expect(response).toEqual({valid: false, errMsgId: 'registration.validationPasswordConfirmNotEquals'});
        response = validate.validatePasswordConfirm('abcdef', '123456');
        expect(response).toEqual({valid: false, errMsgId: 'registration.validationPasswordConfirmNotEquals'});
        response = validate.validatePasswordConfirm('', 'abcdefg');
        expect(response).toEqual({valid: false, errMsgId: 'registration.validationPasswordConfirmNotEquals'});
    });
});
