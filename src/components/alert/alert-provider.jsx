import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';

import AlertStatus from './alert-status.js';
import AlertContext from './alert-context.js';

const AlertProvider = ({children}) => {
    const defaultState = {
        status: AlertStatus.NONE,
        data: {},
        showClear: false
    };
    const [state, setState] = useState(defaultState);
    const timeoutRef = useRef(null);

    const clearAlert = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
        setState(defaultState);
    };

    const handleAlert = (status, data, timeoutSeconds = 3) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setState({status, data, showClear: !timeoutSeconds});
        if (timeoutSeconds) {
            timeoutRef.current = setTimeout(() => {
                timeoutRef.current = null;
                setState(defaultState);
            }, timeoutSeconds * 1000);
        }
    };

    return (
        <AlertContext.Provider
            value={{
                status: state.status,
                data: state.data,
                showClear: state.showClear,
                clearAlert: clearAlert,
                successAlert: (newData, timeoutSeconds = 3) =>
                    handleAlert(AlertStatus.SUCCESS, newData, timeoutSeconds),
                errorAlert: (newData, timeoutSeconds = 3) =>
                    handleAlert(AlertStatus.ERROR, newData, timeoutSeconds)
            }}
        >
            {children}
        </AlertContext.Provider>
    );
};
AlertProvider.propTypes = {
    children: PropTypes.node
};

export default AlertProvider;
