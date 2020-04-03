module.exports = {};

// try to extract classroom token from either of two routes
module.exports.getURIClassroomToken = uriPathname => {
    // first try to match /classes/CLASSROOM_ID/register/CLASSROOM_TOKEN
    const classRegisterRegexp = /^\/?classes\/\d*\/register\/([a-zA-Z0-9]*)\/?$/;
    const classRegisterMatch = classRegisterRegexp.exec(uriPathname);
    if (classRegisterMatch) return classRegisterMatch[1];
    // if regex match failed, try to match /join/CLASSROOM_TOKEN
    const joinTokenRegexp = /^\/?join\/([a-zA-Z0-9]*)\/?$/;
    const joinTokenMatch = joinTokenRegexp.exec(uriPathname);
    if (joinTokenMatch) return joinTokenMatch[1];
    // if neither matched
    return null;
};
