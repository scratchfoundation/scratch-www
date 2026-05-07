import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {clearReadOnlyError} from '../../redux/api-error.js';

import AlertStatus from './alert-status.js';
import AlertContext from './alert-context.js';

const DEFAULT_TIMEOUT_SECONDS = 6;

const AlertProvider = ({children, clearReadOnlyModeError, readOnlyError, showReadOnlyAlert}) => {
    const defaultState = {
        status: AlertStatus.NONE,
        data: {},
        showClear: false,
        isReadOnlyError: false
    };
    const [state, setState] = useState(defaultState);
    const timeoutRef = useRef(null);

    const clearAlert = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
        if (state.isReadOnlyError) {
            clearReadOnlyModeError();
        }
        setState(defaultState);
    };

    const handleAlert = (status, data, timeoutSeconds = DEFAULT_TIMEOUT_SECONDS, isReadOnlyError = false) => {
        // Read-only mode takes precedence - suppress all other alerts.
        if (state.isReadOnlyError) return;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setState({status, data, showClear: !timeoutSeconds, isReadOnlyError});
        if (timeoutSeconds) {
            timeoutRef.current = setTimeout(() => {
                timeoutRef.current = null;
                setState(defaultState);
                if (isReadOnlyError) {
                    clearReadOnlyModeError();
                }
            }, timeoutSeconds * 1000);
        }
    };

    useEffect(() => {
        if (showReadOnlyAlert && readOnlyError) {
            handleAlert(AlertStatus.ERROR, {id: 'general.readOnlyModeAlert'}, DEFAULT_TIMEOUT_SECONDS, true);
        }
    }, [readOnlyError, showReadOnlyAlert]);

    return (
        <AlertContext.Provider
            value={{
                status: state.status,
                data: state.data,
                showClear: state.showClear,
                clearAlert: clearAlert,
                successAlert: (newData, timeoutSeconds = DEFAULT_TIMEOUT_SECONDS) =>
                    handleAlert(AlertStatus.SUCCESS, newData, timeoutSeconds),
                errorAlert: (newData, timeoutSeconds = DEFAULT_TIMEOUT_SECONDS) =>
                    handleAlert(AlertStatus.ERROR, newData, timeoutSeconds)
            }}
        >
            {children}
        </AlertContext.Provider>
    );
};
AlertProvider.propTypes = {
    children: PropTypes.node,
    clearReadOnlyModeError: PropTypes.func,
    readOnlyError: PropTypes.bool,
    showReadOnlyAlert: PropTypes.bool
};

const mapStateToProps = state => ({
    readOnlyError: state.apiError.readOnlyError
});

const mapDispatchToProps = dispatch => ({
    clearReadOnlyModeError: () => dispatch(clearReadOnlyError())
});

const ConnectedAlertProvider = connect(mapStateToProps, mapDispatchToProps)(AlertProvider);

export default ConnectedAlertProvider;
