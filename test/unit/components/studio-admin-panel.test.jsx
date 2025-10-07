import React, {act} from 'react';

import {
    StudioAdminPanel, adminPanelOpenClass, adminPanelOpenKey
} from '../../../src/views/studio/studio-admin-panel.jsx';
import {renderWithIntl} from '../../helpers/react-testing-library-wrapper.jsx';
import {fireEvent} from '@testing-library/react';

let viewEl;
describe('Studio comments', () => {
    beforeAll(() => {
        viewEl = global.document.createElement('div');
        viewEl.id = 'view';
        global.document.body.appendChild(viewEl);
    });
    beforeEach(() => {
        global.localStorage.clear();
        viewEl.classList.remove(adminPanelOpenClass);
    });
    describe('gets stored state from local storage if available', () => {
        test('stored as open', () => {
            global.localStorage.setItem(adminPanelOpenKey, 'open');
            const {findByComponentName} = renderWithIntl(<StudioAdminPanel showAdminPanel />, 'StudioAdminPanel');
            const child = findByComponentName('AdminPanel');
            expect(child.memoizedProps.isOpen).toBe(true);
        });
        test('stored as closed', () => {
            global.localStorage.setItem(adminPanelOpenKey, 'closed');
            const {findByComponentName} = renderWithIntl(<StudioAdminPanel showAdminPanel />, 'StudioAdminPanel');
            const child = findByComponentName('AdminPanel');
            expect(child.memoizedProps.isOpen).toBe(false);
        });
        test('not stored', () => {
            const {findByComponentName} = renderWithIntl(
                <StudioAdminPanel showAdminPanel />, 'StudioAdminPanel'
            );
            const child = findByComponentName('AdminPanel');
            expect(child.memoizedProps.isOpen).toBe(false);
        });
    });
    describe('non admins', () => {
        test('should not have localStorage set with a false value', () => {
            renderWithIntl(<StudioAdminPanel showAdminPanel={false} />);
            expect(global.localStorage.getItem(adminPanelOpenKey)).toBe(null);
        });
        test('should not have css class set even if localStorage contains open key', () => {
            // Regression test for situation where admin logs out but localStorage still
            // contains "open", causing extra space to appear
            global.localStorage.setItem(adminPanelOpenKey, 'open');
            renderWithIntl(<StudioAdminPanel showAdminPanel={false} />);
            expect(viewEl.classList.contains(adminPanelOpenClass)).toBe(false);
        });
    });
    test('calling onOpen sets a class on the #viewEl and records in local storage', () => {
        const {container} = renderWithIntl(<StudioAdminPanel showAdminPanel />, 'StudioAdminPanel');
        const child = container.querySelector('.toggle');
        expect(viewEl.classList.contains(adminPanelOpenClass)).toBe(false);
        // `act` is a test-util function for making react state updates sync
        fireEvent.click(child);
        expect(viewEl.classList.contains(adminPanelOpenClass)).toBe(true);
        expect(global.localStorage.getItem(adminPanelOpenKey)).toBe('open');
    });
    test('renders the correct iframe when open', () => {
        global.localStorage.setItem(adminPanelOpenKey, 'open');
        const {container} = renderWithIntl(
            <StudioAdminPanel
                studioId={123}
                showAdminPanel
            />,
            'StudioAdminPanel'
        );
        const child = container.querySelector('iframe');
        expect(child.src).toMatch('/scratch2-studios/123/adminpanel');
    });
    test('responds to closePanel MessageEvent from the iframe', () => {
        global.localStorage.setItem(adminPanelOpenKey, 'open');
        renderWithIntl(<StudioAdminPanel showAdminPanel />);
        expect(viewEl.classList.contains(adminPanelOpenClass)).toBe(true);
        act(() => {
            global.window.dispatchEvent(new global.MessageEvent('message', {data: 'closePanel'}));
        });
        expect(viewEl.classList.contains(adminPanelOpenClass)).toBe(false);
        expect(global.localStorage.getItem(adminPanelOpenKey)).toBe('closed');
    });
});
