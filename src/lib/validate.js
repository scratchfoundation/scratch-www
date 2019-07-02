module.exports = {};
const api = require('./api');

module.exports.validateUsernameLocally = username => {
    if (!username || username === '') {
        return {valid: false, errMsgId: 'form.validationRequired'};
    } else if (username.length < 3) {
        return {valid: false, errMsgId: 'form.validationUsernameMinLength'};
    } else if (username.length > 20) {
        return {valid: false, errMsgId: 'form.validationUsernameMaxLength'};
    } else if (!/^[\w-]+$/i.test(username)) {
        return {valid: false, errMsgId: 'form.validationUsernameRegexp'};
    }
    return {valid: true};
};

module.exports.validateUsernameRemotely = username => (
    new Promise(resolve => {
        api({
            uri: `/accounts/checkusername/${username}/`
        }, (err, body, res) => {
            if (err || res.statusCode !== 200) {
                resolve({valid: false, errMsgId: 'general.apiError'});
            }
            switch (body.msg) {
            case 'valid username':
                resolve({valid: true});
                break;
            case 'username exists':
                resolve({valid: false, errMsgId: 'registration.validationUsernameExists'});
                break;
            case 'bad username':
                resolve({valid: false, errMsgId: 'registration.validationUsernameVulgar'});
                break;
            case 'invalid username':
            default:
                resolve({valid: false, errMsgId: 'registration.validationUsernameInvalid'});
            }
        });
    })
);

module.exports.validatePassword = password => {
    if (!password) {
        return {valid: false, errMsgId: 'form.validationRequired'};
    } else if (password.length < 6) {
        return {valid: false, errMsgId: 'registration.validationPasswordLength'};
    } else if (password === 'password') {
        return {valid: false, errMsgId: 'registration.validationPasswordNotEquals'};
    }
    return {valid: true};
};

module.exports.validatePasswordConfirm = (password, passwordConfirm) => {
    if (!passwordConfirm) {
        return {valid: false, errMsgId: 'form.validationRequired'};
    } else if (password !== passwordConfirm) {
        // TODO: add a new string for this case
        return {valid: false, errMsgId: 'general.error'};
    }
    return {valid: true};
};
