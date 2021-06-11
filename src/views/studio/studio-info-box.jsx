import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/forms/button.jsx';

const StudioInfoBox = ({showInfoBox, onClose, ...props}) => {
    if (!showInfoBox) return null;

    return (
        <div className="studio-invitation studio-info-box"> {/* TODO move more styling into studio-info-box? */}
            {props.children}
            <Button
                className="studio-info-close-button"
                isCloseType
                onClick={onClose}
            />
        </div>
    );
};

StudioInfoBox.propTypes = {
    showInfoBox: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node
};

export default StudioInfoBox;
