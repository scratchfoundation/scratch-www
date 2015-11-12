module.exports = {
    // Bind environment
    api_host: process.env.API_HOST || 'https://api.scratch.mit.edu',

    // Search and metadata
    title: 'Imagine, Program, Share',
    description:
        'Scratch is a free programming language and online community ' +
        'where you can create your own interactive stories, games, ' +
        'and animations.',

    // Open graph
    og_image: 'https://scratch.mit.edu/images/scratch-og.png',
    og_image_type: 'image/png',
    og_image_width: 986,
    og_image_height: 860,

    // Analytics & Monitoring
    ga_tracker: process.env.GA_TRACKER || '',

    // Error handling
    sentry_dsn: process.env.CLIENT_SENTRY_DSN || '',

    // Use minified JS libraries
    min: (process.env.NODE_ENV === 'production') ? '.min' : ''
};
