import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import Button from '../../components/forms/button.jsx';

import './alert.scss';

const AlertComponent = ({className, icon, id, values, onClear}) => (
    <div className="alert-wrapper">
        <div
            className={classNames('alert', className)}
        >
            {icon && <img
                className="alert-icon"
                src={icon}
            />}
            <div className="alert-msg">
                <FormattedMessage
                    id={id}
                    values={values}
                />
            </div>
            {onClear && <Button
                className="alert-close-button"
                isCloseType
                onClick={onClear}
            />}
        </div>
    </div>
);

AlertComponent.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string,
    id: PropTypes.string.isRequired,
    values: PropTypes.shape({}),
    onClear: PropTypes.func
};

export default AlertComponent;
