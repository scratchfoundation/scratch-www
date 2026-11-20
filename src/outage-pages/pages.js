/**
 * Pages Fastly serves while the site is unavailable, built from `template.ejs`.
 * They're delivered as synthetic responses, so every image is inlined and the built HTML is self-contained.
 * On deploy, bin/configure-fastly.js copies each page into the Fastly response object named `fastlyResponseObject`.
 * The one external dependency is the editor, which loads in a frame from a separate host.
 */

// A self-contained editor (scratch-gui's site-maintenance.html) on a host that stays up while the site is down
const editorUrl = process.env.OUTAGE_EDITOR_URL || 'https://maintenance.scratch.mit.edu/site-maintenance.html';

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
        editorUrl
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
        editorUrl
    }
];
