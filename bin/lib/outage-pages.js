/*
 * Content for the Fastly response objects that serve the maintenance and trouble pages.
 *
 * Each page is built by webpack from src/outage-pages/ into a single self-contained HTML file. On deploy,
 * configure-fastly.js copies that file into the content of the matching response object. Everything else about the
 * response objects stays as configured in Fastly: the request conditions that read the maintenance and trouble flags,
 * the status, and the content type. Turning a mode on or off is still a dictionary change, with no deploy.
 */

const fs = require('node:fs');
const path = require('node:path');

const outagePages = require('../../src/outage-pages/pages');

// Fastly puts response object content in a VCL long string, {"..."}, which ends at the first `"}`.
const VCL_LONG_STRING_END = '"}';

/**
 * Read the built outage pages.
 * @param {string} buildDir Webpack's output directory
 * @returns {Array<{name: string, content: string}>} Response object names with the content each should serve
 */
const outagePageResponseObjects = buildDir => outagePages.map(page => {
    const file = path.join(buildDir, page.filename);
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes(VCL_LONG_STRING_END)) {
        throw new Error(`${file} contains ${VCL_LONG_STRING_END}, which would end Fastly's VCL string early`);
    }
    return {name: page.fastlyResponseObject, content};
});

module.exports = {outagePageResponseObjects};
