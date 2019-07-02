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
