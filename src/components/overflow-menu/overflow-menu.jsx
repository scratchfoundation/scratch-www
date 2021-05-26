/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Dropdown from '../dropdown/dropdown.jsx';
import overflowIcon from './overflow-icon.svg';

import './overflow-menu.scss';

const OverflowMenu = ({children, dropdownAs, className}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={classNames('overflow-menu-container', className)}>
            <button
                className={classNames('overflow-menu-trigger', {
                    'ignore-react-onclickoutside': open
                })}
                onClick={() => setOpen(!open)}
            >
                <img src={overflowIcon} />
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
    className: PropTypes.string
};

OverflowMenu.defaultProps = {
    dropdownAs: 'ul'
};

export default OverflowMenu;
