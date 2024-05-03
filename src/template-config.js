/**
 * Default options for the html-webpack-plugin HTML renderer
 *
 * See https://github.com/ampedandwired/html-webpack-plugin#configuration
 * for possible options. Any other options will be available to the template
 * under `htmlWebpackPlugin.options`
 */

module.exports = {
    // html-webpack-plugin options
    template: './src/template.ejs',
    inject: false,

    // Search and metadata
    title: 'Imagine, Program, Share',
    description:
        'Scratch is a free programming language and online community ' +
        'where you can create your own interactive stories, games, ' +
        'and animations.',

    // override if mobile-friendly
    viewportWidth: 'device-width',

    // Open graph
    og_image: 'https://scratch.mit.edu/images/scratch-og.png',
    og_image_type: 'image/png',
    og_image_width: 986,
    og_image_height: 860,

    // Analytics & Monitoring
    // ----------------------

    // Google Tag Manager ID
    // Looks like 'GTM-XXXXXXX'
    gtm_id: process.env.GTM_ID || '',

    // Google Tag Manager env & auth info for alterative GTM environments
    // Looks like '&gtm_auth=0123456789abcdefghijklm&gtm_preview=env-00&gtm_cookies_win=x'
    // Taken from the middle of: GTM -> Admin -> Environments -> (environment) -> Get Snippet
    // Blank for production
    gtm_env_auth: process.env.GTM_ENV_AUTH || ''
};
