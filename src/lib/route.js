module.exports = {};

// try to extract classroom token from either of two routes
module.exports.getURIClassroomToken = uriPathname => {
    // first try to match /classes/CLASSROOM_ID/register/CLASSROOM_TOKEN
    const classRegisterRegexp = /^\/?classes\/\d*\/register\/([a-zA-Z0-9]*)\/?$/;
    const classRegisterMatch = classRegisterRegexp.exec(uriPathname);
    if (classRegisterMatch) return classRegisterMatch[1];
    // if regex match failed, try to match /signup/CLASSROOM_TOKEN
    const signupTokenRegexp = /^\/?signup\/([a-zA-Z0-9]*)\/?$/;
    const signupTokenMatch = signupTokenRegexp.exec(uriPathname);
    if (signupTokenMatch) return signupTokenMatch[1];
    // if neither matched
    return null;
};
