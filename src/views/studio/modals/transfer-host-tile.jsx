import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TransferHostTile = ({
    className, username, image, selected, handleSelected
}) => (
    <div
        className={classNames('studio-member-tile', className, {
            'transfer-host-tile-selected': selected
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
                    {'transfer-host-name-selected': selected}
                )}

            >
                {username}
            </div>
        </div>
        {selected &&
            <div className="transfer-selection-icon">
                <img src="/svgs/studio/check-icon-white.svg" />
            </div>}
    </div>
);

TransferHostTile.propTypes = {
    className: PropTypes.string,
    username: PropTypes.string,
    handleSelected: PropTypes.func,
    image: PropTypes.string,
    selected: PropTypes.bool
};

export default TransferHostTile;
