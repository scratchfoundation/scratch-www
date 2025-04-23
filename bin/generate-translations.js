const routes = require('../src/routes.json');
const path = require('path');
const fs = require('fs');
const merge = require('lodash.merge');

const globalTemplateFile = path.resolve(__dirname, '../src/l10n.json');
const generatedLocales = {
    en: JSON.parse(fs.readFileSync(globalTemplateFile, 'utf8'))
};
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
        const l10n = path.resolve(
            __dirname,
            `../src/views/${subdir.join('/')}/l10n.json`
        );
        const viewIds = JSON.parse(fs.readFileSync(l10n, 'utf8'));
        defaultLocales[routes[route].name] = viewIds;
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }
}

views
    .map(view => defaultLocales[view])
    .reduce((acc, curr) => merge(acc, curr), generatedLocales.en);

const dirPath = './test/generated';
const filePath = './test/generated/generated-locales.js';
const variableName = 'generatedLocales';
const variableValue = JSON.stringify(generatedLocales, null, 2);
const content = `const ${variableName} = ${variableValue};
export {${variableName}};
`;

fs.mkdirSync(dirPath, {recursive: true});
fs.writeFileSync(filePath, content, 'utf8');
