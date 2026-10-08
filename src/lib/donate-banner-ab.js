const jar = require('./jar');

const DONATE_BANNER_AB_COOKIE = 'donate_banner_ab';

const DONATE_BANNER_AB_VARIANTS = {
    A: 'A',
    B: 'B'
};

/**
 * Read the donate-banner group Fastly assigned for this browser.
 * Returns null when the cookie is missing or invalid (e.g. cookies blocked, or
 * local development where the Fastly snippets are not in front of the site),
 * so unassigned visitors can be kept out of the experiment results.
 * @returns {?string} `A`, `B`, or null
 */
const getDonateBannerVariant = () => {
    const value = jar.get(DONATE_BANNER_AB_COOKIE);
    if (value === DONATE_BANNER_AB_VARIANTS.A || value === DONATE_BANNER_AB_VARIANTS.B) {
        return value;
    }
    return null;
};

module.exports = {
    DONATE_BANNER_AB_COOKIE,
    DONATE_BANNER_AB_VARIANTS,
    getDonateBannerVariant
};
