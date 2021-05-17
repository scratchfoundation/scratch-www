/* eslint-disable react/jsx-no-bind */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';


import {selectIsAdmin} from '../../redux/session.js';
import {selectStudioId} from '../../redux/studio.js';

import AdminPanel from '../../components/adminpanel/adminpanel.jsx';

const adminPanelOpenKey = 'adminPanelToggled_studios';
const adminPanelOpenClass = 'mod-view-admin-panel-open';

/**
 * Propagate the admin panel openness to localStorage and set a class name
 * on the #view element.
 * @param {boolean} value - whether the admin panel is now open.
 */
const storeAdminPanelOpen = value => {
    try {
        localStorage.setItem(adminPanelOpenKey, value ? 'open' : 'closed');
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Could not set adminPanelToggled_studios in local storage', e);
    }
    try {
        document.querySelector('#view').classList
            .toggle(adminPanelOpenClass, value);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Could not set admin-panel-open class on #view');
    }
};

/**
 * Get the previous stored value of admin panel openness from localStorage.
 * @returns {boolean} - whether the admin panel should be open.
 */
const getAdminPanelOpen = () => {
    try {
        return localStorage.getItem(adminPanelOpenKey) === 'open';
    } catch (_) {
        return false;
    }
};

const StudioAdminPanel = ({studioId, showAdminPanel}) => {
    const [adminPanelOpen, setAdminPanelOpen] = useState(getAdminPanelOpen());

    useEffect(() => {
        storeAdminPanelOpen(adminPanelOpen);
    }, [adminPanelOpen]);

    useEffect(() => {
        if (!showAdminPanel) return;
        const handleMessage = e => {
            if (e.data === 'closePanel') setAdminPanelOpen(false);
        };
        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [showAdminPanel]);

    return showAdminPanel && (
        <AdminPanel
            className={classNames('studio-admin-panel', {
                'admin-panel-open': adminPanelOpen
            })}
            isOpen={adminPanelOpen}
            onOpen={() => setAdminPanelOpen(true)}
        >
            <iframe
                className="admin-iframe"
                src={`/scratch2-studios/${studioId}/adminpanel/`}
            />
        </AdminPanel>
    );
};

const ConnnectedStudioAdminPanel = connect(
    state => ({
        studioId: selectStudioId(state),
        showAdminPanel: selectIsAdmin(state)
    })
)(StudioAdminPanel);

export {
    ConnnectedStudioAdminPanel as default,
    // Export the unconnected component by name for testing
    StudioAdminPanel,
    // Export some constants for easy testing as well
    adminPanelOpenClass,
    adminPanelOpenKey
};
