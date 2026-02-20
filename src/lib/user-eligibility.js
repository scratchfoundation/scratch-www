export const isBanned = user => user.banned;

export const isAdmin = permissions => permissions.admin;

export const isMuted = permissions =>
    !!Object.keys(permissions.mute_status).length;

export const isDateInRange = (date, startDate, endDate) => {
    const dateToCompare = Date.parse(date);
    const startDateToCompare = Date.parse(startDate);
    const endDateToCompare = Date.parse(endDate);

    return (
        dateToCompare >= startDateToCompare && dateToCompare <= endDateToCompare
    );
};

export const calculateAgeGroup = (birthYear, birthMonth) => {
    if (!birthMonth || !birthYear) {
        return '[no-data]';
    }

    const today = new Date();
    let age = today.getFullYear() - birthYear;
    const monthDiff = today.getMonth() + 1 - birthMonth;

    if (monthDiff < 0) {
        age--;
    }

    if (age <= 10) {
        return '[00-10]';
    } else if (age <= 16) {
        return '[11-16]';
    }
    return '[17+]';
};

export const getUserRoles = permissions => {
    const permissionsToExclude = ['social', 'mute_status'];

    return Object.keys(permissions)
        .filter(permissionKey => !permissionsToExclude.includes(permissionKey))
        .filter(userRole => permissions[userRole])
        .join(',');
};

export const isUserEligible = (user, permissions, callback = () => true) =>
    Object.keys(user).length !== 0 &&
    Object.keys(permissions).length !== 0 &&
    !isAdmin(permissions) &&
    !isMuted(permissions) &&
    !isBanned(user) &&
    callback();
