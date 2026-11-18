/* eslint-env browser */
const React = require('react');
const {fireEvent} = require('@testing-library/react');
require('@testing-library/jest-dom');
const {renderWithIntl} = require('../../helpers/intl-helpers.jsx');
const MaintenanceBanner = require('../../../src/components/maintenance-banner/maintenance-banner.jsx');
const navigationActions = require('../../../src/redux/navigation.js');
const jar = require('../../../src/lib/jar.js');

jest.mock('../../../src/lib/jar.js', () => ({use: jest.fn()}));

const MESSAGE = 'Scratch will be in maintenance mode';

describe('MaintenanceBanner', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.spyOn(Date, 'now').mockReturnValue(Date.parse('2026-11-18T12:00:00Z'));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('shows the maintenance message with a link to the Scratch App', () => {
        const {container} = renderWithIntl(<MaintenanceBanner username="user1" />);

        expect(container).toHaveTextContent(MESSAGE);
        const link = container.querySelector('a');
        expect(link).toHaveTextContent('Scratch App');
        expect(link).toHaveAttribute('href', 'https://www.scratchfoundation.org/tools');
    });

    test('links "Learn more" to the maintenance forum topic', () => {
        const {getByText} = renderWithIntl(<MaintenanceBanner username="user1" />);

        const link = getByText('Learn more').closest('a');
        expect(link).toHaveAttribute('href', 'https://scratch.mit.edu/discuss/topic/914130/');
        expect(link).toHaveAttribute('target', '_blank');
    });

    test('stays hidden after being closed during the same login', () => {
        const {container} = renderWithIntl(<MaintenanceBanner username="user1" />);
        fireEvent.click(container.querySelector('button'));
        expect(container).toBeEmptyDOMElement();

        const {container: reloaded} = renderWithIntl(<MaintenanceBanner username="user1" />);
        expect(reloaded).toBeEmptyDOMElement();
    });

    test('does not store the session token', () => {
        const {container} = renderWithIntl(<MaintenanceBanner username="user1" />);
        fireEvent.click(container.querySelector('button'));

        expect(JSON.parse(localStorage.getItem('maintenanceBannerDismissed'))).toEqual({user1: true});
    });

    test('shows again after the user logs out and back in', () => {
        const {container} = renderWithIntl(<MaintenanceBanner username="user1" />);
        fireEvent.click(container.querySelector('button'));

        navigationActions.handleLogOut()();
        expect(jar.use).toHaveBeenCalled();

        const {container: nextLogin} = renderWithIntl(<MaintenanceBanner username="user1" />);
        expect(nextLogin).toHaveTextContent(MESSAGE);
    });

    test('is hidden once maintenance starts at 7 AM ET on November 20', () => {
        Date.now.mockReturnValue(Date.parse('2026-11-20T11:59:59Z'));
        const {container: before} = renderWithIntl(<MaintenanceBanner username="user1" />);
        expect(before).toHaveTextContent(MESSAGE);

        Date.now.mockReturnValue(Date.parse('2026-11-20T12:00:00Z'));
        const {container: after} = renderWithIntl(<MaintenanceBanner username="user1" />);
        expect(after).toBeEmptyDOMElement();
    });
});
