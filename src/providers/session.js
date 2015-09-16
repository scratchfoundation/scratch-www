require('xhr');
require('custom-event-polyfill');

window._session = {};

window.updateSession = function (session) {
    window._session = session;
    var sessionEvent = new CustomEvent('session', session);
    window.dispatchEvent(sessionEvent);
};

// @todo Get the session from an API
window.updateSession(require('./session.json'));
