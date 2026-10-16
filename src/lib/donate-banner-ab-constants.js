// Shared by the Fastly deploy snippets and the client cookie reader.
// Keep this file import-free so configure-fastly.js does not load browser
// modules (jar, cookie, xhr, pako) just to stamp a cookie name into VCL.

const DONATE_BANNER_AB_COOKIE = 'donate_banner_ab';

const DONATE_BANNER_AB_VARIANTS = {
    A: 'A',
    B: 'B'
};

module.exports = {
    DONATE_BANNER_AB_COOKIE,
    DONATE_BANNER_AB_VARIANTS
};
