const {getLocalStorageValue, setLocalStorageValue} = require('./local-storage.js');

const STORAGE_KEY = 'maintenanceBannerDismissed';

const isMaintenanceBannerDismissed = username => getLocalStorageValue(STORAGE_KEY, username) === true;

const dismissMaintenanceBanner = username => setLocalStorageValue(STORAGE_KEY, username, true);

// Called on logout so the banner shows again after the next login.
const resetMaintenanceBannerDismissals = () => localStorage.removeItem(STORAGE_KEY);

module.exports = {
    dismissMaintenanceBanner,
    isMaintenanceBannerDismissed,
    resetMaintenanceBannerDismissals
};
