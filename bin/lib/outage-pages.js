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

// Fastly rejects response object content longer than this.
const MAX_CONTENT_LENGTH = 65535;

/**
 * Find reasons Fastly can't serve this content from a response object.
 * The build runs this so an oversized or unsafe page fails CI, and the deploy runs it again before uploading.
 * @param {string} content A built outage page
 * @returns {string[]} Problems, or an empty array if there are none
 */
const outagePageProblems = content => {
    const problems = [];
    if (content.includes(VCL_LONG_STRING_END)) {
        problems.push(`contains ${VCL_LONG_STRING_END}, which would end Fastly's VCL string early`);
    }
    if (content.length > MAX_CONTENT_LENGTH) {
        problems.push(`is ${content.length} characters, over Fastly's ${MAX_CONTENT_LENGTH}-character limit`);
    }
    return problems;
};

/**
 * Read the built outage pages.
 * @param {string} buildDir Webpack's output directory
 * @returns {Array<{name: string, content: string}>} Response object names with the content each should serve
 */
const outagePageResponseObjects = buildDir => outagePages.map(page => {
    const file = path.join(buildDir, page.filename);
    const content = fs.readFileSync(file, 'utf8');
    const problems = outagePageProblems(content);
    if (problems.length) {
        throw new Error(`${file} ${problems.join('; ')}`);
    }
    return {name: page.fastlyResponseObject, content};
});

module.exports = {outagePageProblems, outagePageResponseObjects};
