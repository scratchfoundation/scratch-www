import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import ModalInnerContent from '../../../components/modal/base/modal-inner-content.jsx';

import TransferOwnershipTile from './transfer-ownership-tile.jsx';

import {selectUserId} from '../../../redux/session';
import {managers} from '../lib/redux-modules';
import {loadManagers} from '../lib/studio-member-actions';

import './transfer-ownership-modal.scss';

const TransferOwnershipSelection = ({
    handleSelected,
    handleNext,
    handleBack,
    items,
    userId,
    selectedId
}) => {
    useEffect(() => {
        if (items.length === 0) onLoadMore();
    }, []);

    return <div className="content">
        <ModalInnerContent
                className="inner"
            >
                <h3>
                    <FormattedMessage id="studio.transferOwnership.whichManager" />
                </h3>
                <div className="studio-members-grid">
                    {items.map(item =>
                        userId !== item.id && 
                            (<TransferOwnershipTile
                                key={item.username}
                                handleSelected={() => handleSelected(item.id)}
                                id={item.id}
                                username={item.username}
                                image={item.profile.images['90x90']}
                                isCreator={false}
                                selected={item.id === selectedId}
                            />)
                    )}
                    {/* {moreToLoad &&
                    <div className="studio-grid-load-more">
                        <button
                            className={classNames('button', {
                                'mod-mutating': loading
                            })}
                            onClick={onLoadMore}
                        >
                            <FormattedMessage id="general.loadMore" />
                        </button>
                    </div>
                    } */}
                </div>
                <div
                    className="transfer-ownership-button-row"
                >
                    <button
                        className="button"
                        onClick={handleBack}
                    >
                        <FormattedMessage id="studio.back" />
                    </button>
                    <button
                        className="button next-button"
                        disabled={selectedId === null}
                        onClick={handleNext}
                    >
                        <FormattedMessage id="studio.next" />
                    </button>
                </div>
        </ModalInnerContent>
    </div>
}

TransferOwnershipSelection.propTypes = {
    handleBack: PropTypes.func,
    handleNext: PropTypes.func,
    handleSelected: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.id,
        username: PropTypes.string,
        profile: PropTypes.shape({
            images: PropTypes.shape({
                '90x90': PropTypes.string
            })
        })
    })),
    moreToLoad: PropTypes.bool,
    onLoadMore: PropTypes.func,
    selectedId: PropTypes.number,
    userId: PropTypes.number
};

export default connect(
    state => ({        
        userId: selectUserId(state),
        ...managers.selector(state)
    }),
    {
        onLoadMore: loadManagers
    }
)(TransferOwnershipSelection);