const isStaging = () => process.env.SCRATCH_ENV === 'staging';

const flagInUrl = flag => {
    const url = (window.location && window.location.search) || '';
    return url.indexOf(`${flag}=true`) !== -1;
};

module.exports = {
    CHROME_APP_RELEASED: isStaging() && flagInUrl('CHROME_APP_RELEASED')
};
