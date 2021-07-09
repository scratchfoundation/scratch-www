import React, {useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


import Page from '../../components/page/www/page.jsx';
import render from '../../lib/render.jsx';
import NotAvailable from '../../components/not-available/not-available.jsx';

import StudioInfo from './studio-info.jsx';
import StudioMeta from './studio-meta.jsx';
import StudioAdminPanel from './studio-admin-panel.jsx';
import StudioDeleted from './studio-deleted.jsx';

import {reducers, initialState} from './studio-redux.js';
import {selectStudioLoadFailed, getInfo} from '../../redux/studio';

import './studio.scss';
import {selectIsAdmin} from '../../redux/session.js';

import StudioTabArea from './studio-tab-area.jsx';

const StudioShell = ({isAdmin, studioLoadFailed, onLoadInfo}) => {
    useEffect(() => {
        onLoadInfo();
    }, [isAdmin]); // Reload any time isAdmin changes to allow admins to view deleted studios

    return (
        studioLoadFailed ?
            <NotAvailable /> :
            <div className="studio-shell">
                <StudioDeleted />
                <StudioMeta />
                <div className="studio-info">
                    <StudioInfo />
                </div>
                <StudioTabArea />
            </div>
    );
};

StudioShell.propTypes = {
    isAdmin: PropTypes.bool,
    studioLoadFailed: PropTypes.bool,
    onLoadInfo: PropTypes.func
};

const ConnectedStudioShell = connect(
    state => ({
        studioLoadFailed: selectStudioLoadFailed(state),
        isAdmin: selectIsAdmin(state)
    }),
    {
        onLoadInfo: getInfo
    }
)(StudioShell);

render(
    <Page className="studio-page">
        <StudioAdminPanel />
        <Router>
            <Switch>
                {/* Use variable studioPath to support /studio-playground/ or future route */}
                <Route path="/:studioPath/:studioId">
                    <ConnectedStudioShell />
                </Route>
            </Switch>
        </Router>
    </Page>,
    document.getElementById('app'),
    reducers,
    initialState
);
