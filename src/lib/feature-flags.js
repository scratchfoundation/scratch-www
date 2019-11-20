// eslint-disable-next-line no-unused-vars
const isStaging = () => process.env.SCRATCH_ENV === 'staging';

// eslint-disable-next-line no-unused-vars
const flagInUrl = flag => {
    const url = (window.location && window.location.search) || '';
    return url.indexOf(`${flag}=true`) !== -1;
};

module.exports = {
    CHROME_APP_RELEASED: true
};
