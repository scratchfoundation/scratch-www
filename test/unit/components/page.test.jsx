const React = require('react');
const {shallowWithIntl} = require('../../helpers/intl-helpers.jsx');
const Page = require('../../../src/components/page/www/page.jsx');

describe('Page', () => {
    test('Do not show donor recognition', () => {
        const component = shallowWithIntl(
            <Page />
        );
        expect(component.find('#donor')).toHaveLength(0);
    });

    test('Show donor recognition', () => {
        const component = shallowWithIntl(
            <Page
                showDonorRecognition
            />
        );
        expect(component.find('#donor')).toHaveLength(1);
    });
});
