const OS_ENUM = require('../../components/extension-landing/os-enum.js');

module.exports = {};

const INSTALL_ENUM = {
    DOWNLOAD: 'download', // Windows and Mac App stores
    GOOGLEPLAY: 'Google Play' // Play store for ChromeOS and Android
};

module.exports.installType = os => {
    if (os === OS_ENUM.ANDROID || os === OS_ENUM.CHROMEOS) return INSTALL_ENUM.GOOGLEPLAY;
    return INSTALL_ENUM.DOWNLOAD;
};

module.exports.INSTALL_ENUM = INSTALL_ENUM;
