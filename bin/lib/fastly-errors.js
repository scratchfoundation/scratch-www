/*
 * fastly-js rejects a failed request with a plain object
 * ({status, statusText, body, response, error}) rather than an Error, so the
 * default `${err}` stringifies to "[object Object]". Turn any rejection --
 * a fastly-js object, a real Error, or a thrown string -- into a readable
 * one-line message.
 */

// Pull the human-readable message out of a Fastly error body, which may arrive
// as a parsed object or as a JSON (or plain) string in response.text.
const messageFromBody = raw => {
    if (!raw) return null;
    let body = raw;
    if (typeof raw === 'string') {
        try {
            body = JSON.parse(raw);
        } catch (e) {
            return raw;
        }
    }
    return (body && (body.detail || body.msg || body.title || body.message)) || null;
};

const describeFastlyError = err => {
    if (err === null || typeof err === 'undefined') return String(err);
    if (typeof err === 'string') return err;
    if (err.stack && !err.status && !err.response) return err.stack; // a plain Error

    const parts = [];
    const status = err.status || (err.response && err.response.status);
    if (status) {
        const statusText = err.statusText ||
            (err.response && (err.response.statusMessage || err.response.statusText));
        parts.push(`HTTP ${status}${statusText ? ` ${statusText}` : ''}`);
    }

    const message =
        messageFromBody(err.body) ||
        messageFromBody(err.response && err.response.body) ||
        messageFromBody(err.response && err.response.text) ||
        (err.error && err.error.message) ||
        null;
    if (message) parts.push(message);

    if (parts.length) return parts.join(': ');
    try {
        return JSON.stringify(err);
    } catch (e) {
        return String(err);
    }
};

module.exports = {describeFastlyError};
