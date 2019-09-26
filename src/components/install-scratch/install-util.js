const OS_ENUM = require('../../lib/os-enum.js');

module.exports = {};

module.exports.isDownloaded = os => {
    if (os === OS_ENUM.WINDOWS || os === OS_ENUM.MACOS) return true;
    return false;
};

module.exports.isFromGooglePlay = os => {
    if (os === OS_ENUM.ANDROID || os === OS_ENUM.CHROMEOS) return true;
    return false;
};
