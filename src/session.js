var api = require('./mixins/api.jsx').api;
require('custom-event-polyfill');

window._session = {};

window.updateSession = function (session) {
    window._session = session;
    var sessionEvent = new CustomEvent('session', session);
    window.dispatchEvent(sessionEvent);
};

window.refreshSession = function (iteration) {
    if (!iteration) iteration = 1;
    api({
        uri: '/session/',
        responseType: 'json'
    }, function (err, body) {
        if (err) {
            var timeout = Math.floor(Math.pow(Math.E, iteration));
            if (!isFinite(timeout)) return;
            window.setTimeout(window.refreshSession.bind(window, iteration+1), timeout);
        } else {
            window.updateSession(body);
        }
    });
};

window.refreshSession();
