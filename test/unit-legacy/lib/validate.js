const tap = require('tap');
const validate = require('../../../src/lib/validate');

tap.tearDown(() => process.nextTick(process.exit));

tap.test('validate username locally', t => {
    let response;
    t.type(validate.validateUsernameLocally, 'function');
    response = validate.validateUsernameLocally('abc');
    t.deepEqual(response, {valid: true});
    response = validate.validateUsernameLocally('abcdefghijklmnopqrst');
    t.deepEqual(response, {valid: true});
    response = validate.validateUsernameLocally('abc-def-ghi');
    t.deepEqual(response, {valid: true});
    response = validate.validateUsernameLocally('');
    t.deepEqual(response, {valid: false, errMsgId: 'form.validationRequired'});
    response = validate.validateUsernameLocally('ab');
    t.deepEqual(response, {valid: false, errMsgId: 'form.validationUsernameMinLength'});
    response = validate.validateUsernameLocally('abcdefghijklmnopqrstu');
    t.deepEqual(response, {valid: false, errMsgId: 'form.validationUsernameMaxLength'});
    response = validate.validateUsernameLocally('abc def');
    t.deepEqual(response, {valid: false, errMsgId: 'form.validationUsernameRegexp'});
    response = validate.validateUsernameLocally('abc!def');
    t.deepEqual(response, {valid: false, errMsgId: 'form.validationUsernameRegexp'});
    response = validate.validateUsernameLocally('abc😄def');
    t.deepEqual(response, {valid: false, errMsgId: 'form.validationUsernameRegexp'});
    t.end();
});

tap.test('validate password', t => {
    let response;
    t.type(validate.validatePassword, 'function');
    response = validate.validatePassword('abcdef');
    t.deepEqual(response, {valid: true});
    response = validate.validatePassword('abcdefghijklmnopqrst');
    t.deepEqual(response, {valid: true});
    response = validate.validatePassword('passwo');
    t.deepEqual(response, {valid: true});
    response = validate.validatePassword('');
    t.deepEqual(response, {valid: false, errMsgId: 'form.validationRequired'});
    response = validate.validatePassword('abcde');
    t.deepEqual(response, {valid: false, errMsgId: 'registration.validationPasswordLength'});
    response = validate.validatePassword('password');
    t.deepEqual(response, {valid: false, errMsgId: 'registration.validationPasswordNotEquals'});
    t.end();
});

tap.test('validate password confirm', t => {
    let response;
    t.type(validate.validatePasswordConfirm, 'function');
    response = validate.validatePasswordConfirm('abcdef', 'abcdef');
    t.deepEqual(response, {valid: true});
    response = validate.validatePasswordConfirm('abcdefghijklmnopqrst', 'abcdefghijklmnopqrst');
    t.deepEqual(response, {valid: true});
    response = validate.validatePasswordConfirm('passwo', 'passwo');
    t.deepEqual(response, {valid: true});
    response = validate.validatePasswordConfirm('', '');
    t.deepEqual(response, {valid: false, errMsgId: 'form.validationRequired'});
    response = validate.validatePasswordConfirm('abcdef', 'abcdefg');
    t.deepEqual(response, {valid: false, errMsgId: 'general.error'});
    response = validate.validatePasswordConfirm('abcdef', '123456');
    t.deepEqual(response, {valid: false, errMsgId: 'general.error'});
    response = validate.validatePasswordConfirm('', 'abcdefg');
    t.deepEqual(response, {valid: false, errMsgId: 'general.error'});
    t.end();
});
