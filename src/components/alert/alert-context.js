import {createContext, useContext} from 'react';
import AlertStatus from './alert-status.js';

const AlertContext = createContext({
    // Note: defaults here are only used if there is no Provider in the tree
    status: AlertStatus.NONE,
    data: {},
    clearAlert: () => {},
    successAlert: () => {},
    errorAlert: () => {}
});

const useAlertContext = () => useContext(AlertContext);

export {
    AlertContext as default,
    useAlertContext
};
