/*
 * Guards the trailing-slash convention for internal links, so scratch-www does
 * not send users through avoidable redirects.
 *
 * The dynamic backend canonicalizes its URLs *with* a trailing slash (it 301s a
 * slash-free URL to the slashed one), while the static app routes serve either
 * form. So a link to a backend endpoint that omits the trailing slash costs an
 * extra 301 on every click. This test classifies each static internal link
 * against the route table and fails if a backend link is missing its slash.
 *
 * Only code reachable from a routed view is checked (found by walking the import
 * graph from the view entry points), so unrouted/archived views and their
 * private components are ignored -- editing them would change nothing a user
 * hits, and they predate the convention.
 */
const fs = require('fs');
const path = require('path');

const fastlyConfig = require('../../bin/lib/fastly-config-methods');
const routes = require('../../src/routes');

const SRC = path.join(__dirname, '../../src');

// Classify a link path against the route table.
const matchers = routes.map(route => ({
    redirect: !!route.redirect,
    rx: new RegExp(fastlyConfig.expressPatternToRegex(route.pattern))
}));
const classify = linkPath => {
    if (matchers.some(m => m.redirect && m.rx.test(linkPath))) return 'redirect';
    if (matchers.some(m => !m.redirect && m.rx.test(linkPath))) return 'app';
    return 'backend';
};

// Resolve a relative import specifier to a source file, trying the usual extensions.
const resolveImport = (fromFile, spec) => {
    if (!spec.startsWith('.')) return null;
    const base = path.resolve(path.dirname(fromFile), spec);
    const candidates = [
        base, `${base}.js`, `${base}.jsx`,
        path.join(base, 'index.js'), path.join(base, 'index.jsx')
    ];
    return candidates.find(c => fs.existsSync(c) && fs.statSync(c).isFile()) || null;
};

// The routed views are the entry points; everything they import (transitively) is live.
const entryFiles = routes
    .filter(route => route.view)
    .map(route => {
        const base = path.join(SRC, 'views', route.view);
        return [`${base}.jsx`, `${base}.js`].find(fs.existsSync);
    })
    .filter(Boolean);

const IMPORT_RE = /(?:require\(|from)\s*['"]([^'"]+)['"]/g;
const reachableFiles = () => {
    const seen = new Set();
    const queue = [...entryFiles];
    while (queue.length) {
        const file = queue.pop();
        if (seen.has(file)) continue;
        seen.add(file);
        const src = fs.readFileSync(file, 'utf8');
        let match;
        while ((match = IMPORT_RE.exec(src)) !== null) {
            const resolved = resolveImport(file, match[1]);
            if (resolved && /\.jsx?$/.test(resolved) && !seen.has(resolved)) queue.push(resolved);
        }
    }
    return seen;
};

// A path whose last segment has an extension is a file (asset), not a slash-canonical route.
const isFileLike = linkPath => /\.[^/]+$/.test(linkPath.split('/').pop());
const LINK_RE = /(?:href|to)=["'](\/[^"'${}]*)["']/g;

describe('internal link trailing-slash conventions', () => {
    const violations = [];
    reachableFiles().forEach(file => {
        const src = fs.readFileSync(file, 'utf8');
        let match;
        while ((match = LINK_RE.exec(src)) !== null) {
            // Consider only the path portion; a trailing "?query" or "#fragment"
            // does not change which route serves the link or its slash convention.
            const linkPath = match[1].split(/[?#]/)[0];
            if (linkPath === '/' || linkPath.endsWith('/') || isFileLike(linkPath)) continue;
            if (classify(linkPath) === 'backend') {
                violations.push(`${path.relative(SRC, file)}: ${match[1]}`);
            }
        }
    });

    test('links to dynamic-backend endpoints end with a trailing slash', () => {
        // The backend 301s a slash-free URL to its slashed canonical form, so a
        // slash-free backend link here costs users an extra redirect. Add the slash.
        expect(violations).toEqual([]);
    });
});
