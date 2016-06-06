module.exports = {
    // Search and metadata
    title: 'Imagine, Program, Share',
    description:
        'Scratch is a free programming language and online community ' +
        'where you can create your own interactive stories, games, ' +
        'and animations.',

    // override if mobile-friendly
    viewportWidth: 942,

    // Open graph
    og_image: 'https://scratch.mit.edu/images/scratch-og.png',
    og_image_type: 'image/png',
    og_image_width: 986,
    og_image_height: 860,

    // Analytics & Monitoring
    ga_tracker: process.env.GA_TRACKER || ''
};
