/**
 * Pages Fastly serves while the site is unavailable, built from `template.ejs`.
 * On deploy, bin/configure-fastly.js copies each page into the Fastly response object named `fastlyResponseObject`.
 * Fastly limits that content to 65535 characters, so only the illustration is inlined. The other images and the editor
 * load from hosts that stay up while the site is down.
 */

// A self-contained editor (scratch-gui's site-maintenance.html)
const editorUrl = process.env.OUTAGE_EDITOR_URL || 'https://maintenance.scratch.mit.edu/site-maintenance.html';

// The pages' other images. This bucket's copies of the illustrations have a solid background, so they aren't used.
const imageBaseUrl = 'https://scratch-maintenance.s3.amazonaws.com/';

module.exports = [
    {
        // Planned maintenance
        filename: 'cdn/maintenance.html',
        fastlyResponseObject: 'Maintenance',
        title: 'Scratch is down for maintenance!',
        illustration: 'cairn.svg',
        heading: 'The Scratch Team is working on some planned updates to the website',
        showReload: false,
        // "While the website is ..."
        websiteStatus: 'being worked on',
        editorUrl,
        imageBaseUrl
    },
    {
        // Unplanned outage
        filename: 'cdn/trouble.html',
        fastlyResponseObject: 'Trouble Response',
        title: 'Scratch is having trouble!',
        illustration: 'wateringcan.svg',
        heading: 'The Scratch Team is working hard to fix an issue with the Scratch website',
        showReload: true,
        // "While the website is ..."
        websiteStatus: 'being fixed',
        editorUrl,
        imageBaseUrl
    }
];
