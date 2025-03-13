import React from 'react';
import {render} from '@testing-library/react';
import {IntlProvider} from 'react-intl';
import routes from '../../src/routes.json';
import path from 'path';
import fs from 'fs';
import merge from 'lodash.merge';

// TBD: Move code to script that executes before running all tests,
// fix issue where texts for views don't load

const globalTemplateFile = path.resolve(__dirname, '../../src/l10n.json');
const generalLocales = {en: JSON.parse(fs.readFileSync(globalTemplateFile, 'utf8'))};
const defaultLocales = {};
const views = [];

for (const route in routes) {
    if (typeof routes[route].redirect !== 'undefined') {
        continue;
    }

    views.push(routes[route].name);
    try {
        const subdir = routes[route].view.split('/');
        subdir.pop();
        const l10n = path.resolve(__dirname, `../../src/views/${subdir.join('/')}/l10n.json`);
        const viewIds = JSON.parse(fs.readFileSync(l10n, 'utf8'));
        defaultLocales[routes[route].name] = viewIds;
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }
}

views.map(view => defaultLocales[view]).reduce((acc, curr) => merge(acc, curr), generalLocales);

const renderWithIntl = ui => ({
    ...render(
        <IntlProvider
            locale="en"
            messages={generalLocales.en}
        >
            {ui}
        </IntlProvider>
    )
});

export {renderWithIntl};
