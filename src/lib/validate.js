module.exports = {};
const api = require('./api');
const emailValidator = require('email-validator');

module.exports.validateUsernameLocally = username => {
    if (!username || username === '') {
        return {valid: false, errMsgId: 'general.required'};
    } else if (username.length < 3) {
        return {valid: false, errMsgId: 'registration.validationUsernameMinLength'};
    } else if (username.length > 20) {
        return {valid: false, errMsgId: 'registration.validationUsernameMaxLength'};
    } else if (/\s/i.test(username)) {
        return {valid: false, errMsgId: 'registration.validationUsernameSpaces'};
    } else if (!/^[\w-]+$/i.test(username)) {
        return {valid: false, errMsgId: 'registration.validationUsernameRegexp'};
    }
    return {valid: true};
};

module.exports.validateUsernameRemotely = username => (
    new Promise(resolve => {
        api({
            uri: `/accounts/checkusername/${username}/`
        }, (err, body, res) => {
            if (err || res.statusCode !== 200) {
                resolve({requestSucceeded: false, valid: false, errMsgId: 'general.error'});
            }
            // get the message in a way that will work for both scratchr2 and api
            // versions of the checkusername endpoint
            let msg = '';
            if (body && body.msg) msg = body.msg;
            else if (body && body[0]) msg = body[0].msg;
            switch (msg) {
            case 'valid username':
                resolve({requestSucceeded: true, valid: true});
                break;
            case 'username exists':
                resolve({requestSucceeded: true, valid: false, errMsgId: 'registration.validationUsernameExists'});
                break;
            case 'bad username': // i.e., vulgar
                resolve({requestSucceeded: true, valid: false, errMsgId: 'registration.validationUsernameNotAllowed'});
                break;
            case 'invalid username':
            default:
                resolve({requestSucceeded: true, valid: false, errMsgId: 'registration.validationUsernameNotAllowed'});
            }
        });
    })
);

/**
 * Validate password value, optionally also considering username value
 * @param  {string} password     password value to validate
 * @param  {string} username     username value to compare
 * @return {object}              {valid: boolean, errMsgId: string}
 */
module.exports.validatePasswordLocally = (password, username) => {
    if (!password) {
        return {valid: false, errMsgId: 'general.required'};
    // Using Array.from(string).length, instead of string.length, improves unicode
    // character counting for a subset of unicode characters, so that they are counted
    // as single characters by js.
    // However, this only helps with a subset of unicode. Characters combinations,
    // including diacritical marks or skintone/gender variations, will still appear
    // to be multiple characters. See discussions:
    // https://blog.jonnew.com/posts/poo-dot-length-equals-two
    // https://stackoverflow.com/a/54370584/2308190
    } else if (Array.from(password).length < 6) {
        return {valid: false, errMsgId: 'registration.validationPasswordLength'};
    } else if (password.toLowerCase() === 'password') {
        return {valid: false, errMsgId: 'registration.validationPasswordNotEquals'};
    } else if (username && password === username) {
        return {valid: false, errMsgId: 'registration.validationPasswordNotUsername'};
    }
    return {valid: true};
};

module.exports.validatePasswordRemotely = password => (
    new Promise(resolve => {
        api({
            method: 'POST',
            uri: `/accounts/checkpassword`,
            json: {
                password: `${password}`
            }
        }, (err, body, res) => {
            if (err || res.statusCode !== 200) {
                return resolve({
                    requestSucceeded: false,
                    valid: false,
                    errMsgId: 'general.error'
                });
            }
            let msg = '';
            if (body && body.msg) msg = body.msg;
            else if (body && body[0]) msg = body[0].msg;
            switch (msg) {
            case 'valid password':
                return resolve({
                    requestSucceeded: true,
                    valid: true
                });
            case 'invalid password':
            default:
                return resolve({
                    requestSucceeded: true,
                    valid: false,
                    errMsgId: 'registration.validationPasswordNotEquals'
                });
            } // switch
        }); // api
    }) // promise
);

module.exports.validatePasswordConfirm = (password, passwordConfirm) => {
    if (!passwordConfirm) {
        return {valid: false, errMsgId: 'general.required'};
    } else if (password !== passwordConfirm) {
        return {valid: false, errMsgId: 'registration.validationPasswordConfirmNotEquals'};
    }
    return {valid: true};
};

module.exports.validateEmailLocally = email => {
    if (!email || email === '') {
        return {valid: false, errMsgId: 'general.required'};
    } else if (emailValidator.validate(email)) {
        return {valid: true};
    }
    return ({valid: false, errMsgId: 'registration.validationEmailInvalid'});
};

module.exports.validateEmailRemotely = email => (
    new Promise(resolve => {
        api({
            host: '', // not handled by API; use existing infrastructure
            params: {email: email},
            uri: '/accounts/check_email/'
        }, (err, body, res) => {
            if (err || res.statusCode !== 200 || !body || body.length < 1 || !body[0].msg) {
                resolve({requestSucceeded: false, valid: false, errMsgId: 'general.apiError'});
            }
            switch (body[0].msg) {
            case 'valid email':
                resolve({requestSucceeded: true, valid: true});
                break;
            case 'Scratch is not allowed to send email to this address.': // e.g., bad TLD or block-listed
            case 'Enter a valid email address.':
            default:
                resolve({requestSucceeded: true, valid: false, errMsgId: 'registration.validationEmailInvalid'});
                break;
            }
        });
    })
);

const responseErrorMsgs = module.exports.responseErrorMsgs = {
    username: {
        'username exists': {errMsgId: 'registration.errorUsernameExists'},
        'bad username': {errMsgId: 'registration.errorBadUsername'}
    },
    password: {
        'Ensure this value has at least 6 characters \\(it has \\d\\).': {
            errMsgId: 'registration.errorPasswordTooShort'
        }
    },
    recaptcha: {
        'Incorrect, please try again.': {errMsgId: 'registration.errorCaptcha'}
    }
};

module.exports.responseErrorMsg = (fieldName, serverRawErr) => {
    if (fieldName && responseErrorMsgs[fieldName]) {
        const serverErrPatterns = responseErrorMsgs[fieldName];
        // use regex compare to find matching error string in responseErrorMsgs
        const matchingKey = Object.keys(serverErrPatterns).find(errPattern => (
            RegExp(errPattern).test(serverRawErr)
        ));
        if (matchingKey) return responseErrorMsgs[fieldName][matchingKey].errMsgId;
    }
    return null;
};
