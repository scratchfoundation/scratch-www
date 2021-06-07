import React from 'react';
import {act} from 'react-dom/test-utils';

import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
import AdminPanel from '../../../src/components/adminpanel/adminpanel.jsx';
import {
    StudioAdminPanel, adminPanelOpenClass, adminPanelOpenKey
} from '../../../src/views/studio/studio-admin-panel.jsx';

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
            const component = mountWithIntl(<StudioAdminPanel showAdminPanel />);
            const child = component.find(AdminPanel);
            expect(child.prop('isOpen')).toBe(true);
        });
        test('stored as closed', () => {
            global.localStorage.setItem(adminPanelOpenKey, 'closed');
            const component = mountWithIntl(<StudioAdminPanel showAdminPanel />);
            const child = component.find(AdminPanel);
            expect(child.prop('isOpen')).toBe(false);
        });
        test('not stored', () => {
            const component = mountWithIntl(
                <StudioAdminPanel showAdminPanel />
            );
            const child = component.find(AdminPanel);
            expect(child.prop('isOpen')).toBe(false);
        });
    });
    test('calling onOpen sets a class on the #viewEl and records in local storage', () => {
        const component = mountWithIntl(<StudioAdminPanel showAdminPanel />);
        let child = component.find(AdminPanel);
        expect(viewEl.classList.contains(adminPanelOpenClass)).toBe(false);
        // `act` is a test-util function for making react state updates sync
        act(child.prop('onOpen'));
        expect(viewEl.classList.contains(adminPanelOpenClass)).toBe(true);
        expect(global.localStorage.getItem(adminPanelOpenKey)).toBe('open');
    });
    test('renders the correct iframe when open', () => {
        global.localStorage.setItem(adminPanelOpenKey, 'open');
        const component = mountWithIntl(
            <StudioAdminPanel
                studioId={123}
                showAdminPanel
            />
        );
        let child = component.find('iframe');
        expect(child.getDOMNode().src).toMatch('/scratch2-studios/123/adminpanel');
    });
    test('responds to closePanel MessageEvent from the iframe', () => {
        global.localStorage.setItem(adminPanelOpenKey, 'open');
        mountWithIntl(<StudioAdminPanel showAdminPanel />);
        expect(viewEl.classList.contains(adminPanelOpenClass)).toBe(true);
        act(() => {
            global.window.dispatchEvent(new global.MessageEvent('message', {data: 'closePanel'}));
        });
        expect(viewEl.classList.contains(adminPanelOpenClass)).toBe(false);
        expect(global.localStorage.getItem(adminPanelOpenKey)).toBe('closed');
    });
});
