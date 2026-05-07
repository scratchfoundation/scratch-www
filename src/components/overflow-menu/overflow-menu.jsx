/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Dropdown from '../dropdown/dropdown.jsx';
import overflowIcon from './overflow-icon.svg';
import overflowIconDisabled from './overflow-icon-disabled.svg';

import './overflow-menu.scss';

const OverflowMenu = ({
    children,
    dropdownAs = 'ul',
    className,
    disabled
}) => {
    const [open, setOpen] = useState(false);
    const iconSrc = disabled ? overflowIconDisabled : overflowIcon;

    return (
        <div className={classNames('overflow-menu-container', className)}>
            <button
                className={classNames('overflow-menu-trigger', {
                    'ignore-react-onclickoutside': open
                })}
                onClick={() => setOpen(!open)}
                disabled={disabled}
            >
                <img src={iconSrc} />
            </button>
            {open && <Dropdown
                isOpen
                as={dropdownAs}
                className="overflow-menu-dropdown"
                onRequestClose={() => setOpen(false)}
            >
                {children}
            </Dropdown>}
        </div>
    );
};

OverflowMenu.propTypes = {
    children: PropTypes.node,
    dropdownAs: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool
};

OverflowMenu.defaultProps = {
    disabled: false
};

export default OverflowMenu;
