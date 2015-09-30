var api = require('./mixins/api.jsx').api;
require('custom-event-polyfill');

window._session = {};

window.updateSession = function (session) {
    window._session = session;
    var sessionEvent = new CustomEvent('session', session);
    window.dispatchEvent(sessionEvent);
};

window.refreshSession = function () {
    api({
        uri: '/session/',
        responseType: 'json'
    }, function (err, res) {
        if (!err) window.updateSession(res);
    });
};

window.refreshSession();
