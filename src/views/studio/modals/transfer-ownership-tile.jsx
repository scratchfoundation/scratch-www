import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';

const TransferOwnershipTile = ({
    username, image, isCreator, selected, handleSelected
}) => {
    return (
        <div 
            className={classNames("studio-member-tile", {"transfer-ownership-tile-selected": selected})}
            onClick={handleSelected}    
        >
            <img
                className="studio-member-image"
                src={image}
            />
            <div className="studio-member-info">
                {username}
                {isCreator && <div className="studio-member-role"><FormattedMessage id="studio.creatorRole" /></div>}
            </div>
        </div>
    );
};

TransferOwnershipTile.propTypes = {
    username: PropTypes.string,
    handleSelected: PropTypes.func,
    image: PropTypes.string,
    isCreator: PropTypes.bool,
    selected: PropTypes.bool
};

export default TransferOwnershipTile;
