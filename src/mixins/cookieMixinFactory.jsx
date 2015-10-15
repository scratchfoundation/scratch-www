var cookie = require('cookie');
var xhr = require('xhr');


var cookieMixinFactory = function (cookieName, cookieSetter) {
    var capitalizedCookieName = cookieName.charAt(0).toUpperCase() + cookieName.slice(1);
    var getterName = "get" + capitalizedCookieName;
    var userName = "use" + capitalizedCookieName;
    var mixin = {}
    mixin[getterName] = function (callback) {
        var obj = cookie.parse(document.cookie) || {};
        if (typeof obj[cookieName] === 'undefined') return callback('Cookie not found.');
        callback(null, obj[cookieName]);
    };
    mixin[userName] = function (callback) {
        this[getterName](function (err, cookieValue) {
            if (cookieValue) return callback(null, cookieValue);
            xhr({
                'uri': cookieSetter
            }, function (err) {
                if (err) return callback(err);
                this[getterName](function (err, cookieValue) {
                    if (err) return callback(err);
                    callback(err, cookieValue);
                });
            }.bind(this));
        }.bind(this));
    }
    return mixin;
};

module.exports = cookieMixinFactory;
