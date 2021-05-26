import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import AlertComponent from './alert-component.jsx';
import AlertStatus from './alert-status.js';
import {useAlertContext} from './alert-context.js';

import successIcon from './icon-alert-success.svg';
import errorIcon from './icon-alert-error.svg';

const Alert = ({className}) => {
    const {status, data, showClear, clearAlert} = useAlertContext();
    if (status === AlertStatus.NONE) return null;
    return (
        <AlertComponent
            className={classNames(className, {
                'alert-success': status === AlertStatus.SUCCESS,
                'alert-error': status === AlertStatus.ERROR
            })}
            icon={status === AlertStatus.SUCCESS ? successIcon : errorIcon}
            id={data.id}
            values={data.values}
            onClear={showClear && clearAlert}
        />
    );
};

Alert.propTypes = {
    className: PropTypes.string
};

export default Alert;
