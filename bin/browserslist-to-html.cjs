#!/usr/bin/env node

const readline = require('node:readline');

const friendlyBrowsers = {
    and_chr: 'Android Chrome',
    chrome: 'Chrome',
    edge: 'Edge',
    firefox: 'Firefox',
    ios_saf: 'iOS Safari',
    safari: 'Safari'
};

/**
 * Zips together multiple iterables. Most implementations stop as soon as one iterable is exhausted,
 * but this implementation continues until all iterables are exhausted, filling in `undefined` for
 * any missing values.
 * @param  {...Iterable} iterables The iterables to zip together.
 * @yields {Array} An array containing the next value from each iterable, or `undefined` if an iterable is exhausted.
 * @example
 * const zipped = zipAll([1, 2], ['a', 'b', 'c'], [true]);
 * console.log([...zipped]); // [[1, 'a', true], [2, 'b', undefined], [undefined, 'c', undefined]]
 */
const zipAll = function*(...iterables) {
    const iterators = iterables.map(iterable => iterable[Symbol.iterator]());
    while (true) {
        const results = iterators.map(iterator => iterator.next());
        if (results.every(result => result.done)) {
            return;
        }
        yield results.map(result => result.value);
    }
};

const main = async () => {
    const input = readline.createInterface({
        input: process.stdin
    });

    const browsers = {};

    for await (const line of input) {
        const [browser, version] = line.split(' ');
        if (!browsers[browser]) {
            browsers[browser] = [];
        }
        browsers[browser].unshift(version);
    }

    process.stdout.write([
        '<!DOCTYPE html>',
        '<html>',
        '  <head>',
        '    <title>Scratch: Supported Browsers</title>',
        '    <meta charset="utf-8">',
        '    <style>',
        '      table { border-collapse: collapse; }',
        '      th, td { border: 1px solid black; padding: 0.25rem 0.5rem; text-align: center; }',
        '    </style>',
        '  </head>',
        '  <body>',
        '    <table>',
        '      <caption>Supported Browsers</caption>',
        '      <thead>',
        '        <tr>',
        ''
    ].join('\n'));

    const browserIds = Object.keys(browsers).sort();
    for (const browserId of browserIds) {
        process.stdout.write(`          <th scope="col">${friendlyBrowsers[browserId] || browserId}</th>\n`);
    }
    process.stdout.write([
        '        </tr>',
        '      </thead>',
        '      <tbody>',
        ''
    ].join('\n'));
    for (const versions of zipAll(...Object.values(browsers))) {
        process.stdout.write('        <tr>\n');
        for (const version of versions) {
            process.stdout.write(`          <td>${version || ''}</td>\n`);
        }
        process.stdout.write('        </tr>\n');
    }
    process.stdout.write([
        '      </tbody>',
        '    </table>',
        '  </body>',
        '</html>',
        ''
    ].join('\n'));
};

main();
