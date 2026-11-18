/* eslint-env browser */
const React = require('react');
const {fireEvent} = require('@testing-library/react');
require('@testing-library/jest-dom');
const {renderWithIntl} = require('../../helpers/intl-helpers.jsx');
const MaintenanceBanner = require('../../../src/components/maintenance-banner/maintenance-banner.jsx');

describe('MaintenanceBanner', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.spyOn(Date, 'now').mockReturnValue(Date.parse('2026-11-18T12:00:00Z'));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('shows the maintenance message with a link to the Scratch App', () => {
        const {container} = renderWithIntl(
            <MaintenanceBanner
                token="token-1"
                username="user1"
            />
        );

        expect(container).toHaveTextContent('Scratch will be in maintenance mode');
        const link = container.querySelector('a');
        expect(link).toHaveTextContent('Scratch App');
        expect(link).toHaveAttribute('href', 'https://www.scratchfoundation.org/tools');
    });

    test('stays hidden after being closed during the same login', () => {
        const {container} = renderWithIntl(
            <MaintenanceBanner
                token="token-1"
                username="user1"
            />
        );
        fireEvent.click(container.querySelector('button'));
        expect(container).toBeEmptyDOMElement();

        const {container: reloaded} = renderWithIntl(
            <MaintenanceBanner
                token="token-1"
                username="user1"
            />
        );
        expect(reloaded).toBeEmptyDOMElement();
    });

    test('shows again after the user logs in again', () => {
        const {container} = renderWithIntl(
            <MaintenanceBanner
                token="token-1"
                username="user1"
            />
        );
        fireEvent.click(container.querySelector('button'));

        const {container: nextLogin} = renderWithIntl(
            <MaintenanceBanner
                token="token-2"
                username="user1"
            />
        );
        expect(nextLogin).toHaveTextContent('Scratch will be in maintenance mode');
    });

    test('is hidden once maintenance starts at 7 AM ET on November 20', () => {
        Date.now.mockReturnValue(Date.parse('2026-11-20T11:59:59Z'));
        const {container: before} = renderWithIntl(
            <MaintenanceBanner
                token="token-1"
                username="user1"
            />
        );
        expect(before).toHaveTextContent('Scratch will be in maintenance mode');

        Date.now.mockReturnValue(Date.parse('2026-11-20T12:00:00Z'));
        const {container: after} = renderWithIntl(
            <MaintenanceBanner
                token="token-1"
                username="user1"
            />
        );
        expect(after).toBeEmptyDOMElement();
    });
});
