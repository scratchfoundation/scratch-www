const React = require('react');
const {shallow} = require('enzyme');
import {StudioShell} from '../../../src/views/studio/studio.jsx';

jest.mock('react-dom', () => ({
    render: jest.fn()
}));

jest.mock('react-router-dom', () => ({
    useRouteMatch: jest.fn(() => ({path: ''}))
}));

describe('Studio', () => {
    test('dir is RTL when locale is rtl', () => {
        const component = shallow(
            <StudioShell
                intl={{
                    locale: 'ar'
                }}
            />
        );

        const studioShell = component.find('div.studio-shell');
        expect(studioShell.prop('dir')).toEqual('rtl');
    });

    test('dir is LTR when locale is ltr', () => {
        const component = shallow(
            <StudioShell
                intl={{
                    locale: 'ja'
                }}
            />
        );

        const studioShell = component.find('div.studio-shell');
        expect(studioShell.prop('dir')).toBeNull();
    });
});
