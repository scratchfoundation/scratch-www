import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';

const TransferOwnershipTile = ({
    className, username, image, isCreator, selected, handleSelected
}) => (
    <div
        className={classNames('studio-member-tile', className, {
            'transfer-ownership-tile-selected': selected
        })}
        onClick={handleSelected}
    >
        <img
            className="studio-member-image"
            src={image}
        />
        <div className="studio-member-info">
            <div
                className={classNames('studio-member-name',
                    {'transfer-ownership-name-selected': selected}
                )}

            >
                {username}
            </div>
            {isCreator && <div className="studio-member-role"><FormattedMessage id="studio.creatorRole" /></div>}
        </div>
        {selected &&
            <div className="transfer-selection-icon">
                <img src="/svgs/studio/check-icon-white.svg" />
            </div>}
    </div>
);

TransferOwnershipTile.propTypes = {
    className: PropTypes.string,
    username: PropTypes.string,
    handleSelected: PropTypes.func,
    image: PropTypes.string,
    isCreator: PropTypes.bool,
    selected: PropTypes.bool
};

export default TransferOwnershipTile;
