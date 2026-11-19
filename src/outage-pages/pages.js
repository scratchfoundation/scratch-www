/**
 * Pages Fastly serves while the site is unavailable, built from `template.ejs`.
 * They're delivered as synthetic responses, so every image is inlined and the built HTML is self-contained.
 */
module.exports = [
    {
        // Planned maintenance
        filename: 'cdn/maintenance.html',
        title: 'Scratch is down for maintenance!',
        illustration: 'cairn.svg',
        heading: 'The Scratch Team is working on some planned updates to the website',
        showReload: false,
        appIntro: 'While the website is being worked on, you can use the Scratch app to make projects offline'
    },
    {
        // Unplanned outage
        filename: 'cdn/trouble.html',
        title: 'Scratch is having trouble!',
        illustration: 'wateringcan.svg',
        heading: 'The Scratch Team is working hard to fix an issue with the Scratch website',
        showReload: true,
        appIntro: 'While the website is being fixed, you can use the Scratch app to make projects offline'
    }
];
