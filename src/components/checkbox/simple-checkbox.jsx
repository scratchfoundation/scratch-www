import React from 'react';
import PropTypes from 'prop-types';
import './simple-checkbox.scss';

export const SimpleCheckbox = ({id, checked, onChange, label}) => (
    <label
        className="checkbox-container"
        htmlFor={id}
    >
        <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            style={{marginRight: 8}}
        />
        {label}
    </label>
);

SimpleCheckbox.propTypes = {
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.node.isRequired
};
