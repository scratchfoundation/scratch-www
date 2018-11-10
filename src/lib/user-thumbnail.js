/**
 * @user-thumbnail
 * Utility functions to return thumnail-related strings
 */

/**
 * Generate a thumbnail url for a particular userid, with width and height.
 * @param {string} userId userId for the user whose thumbnail we want
 * @param {number} width desired thumbnail width; defaults to 32
 * @param {number} height desired thumbnail height; defaults to width.
 * @returns {string} thumbnail url string
 */
const thumbnailUrl = (userId, width, height) => (
    `/get_image/user/${userId}_${width ? width : 32}x${height ? height : (width ? width : 32)}.png`
);

module.exports = thumbnailUrl;
