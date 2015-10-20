var jar = require('../lib/jar');

var cookieMixinFactory = function (cookieName, cookieSetter) {
    var capitalizedCookieName = cookieName.charAt(0).toUpperCase() + cookieName.slice(1);
    var getterName = 'get' + capitalizedCookieName;
    var userName = 'use' + capitalizedCookieName;
    var mixin = {};
    mixin[getterName] = function (callback) {
        jar.get(cookieName, callback);
    };
    mixin[userName] = function (callback) {
        jar.use(cookieName, cookieSetter, callback);
    };
    return mixin;
};

module.exports = cookieMixinFactory;
