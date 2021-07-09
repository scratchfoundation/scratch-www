import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import ModalInnerContent from '../../../components/modal/base/modal-inner-content.jsx';

import {selectUserId} from '../../../redux/session';
import {managers} from '../lib/redux-modules';
import {loadManagers} from '../lib/studio-member-actions';

import './transfer-ownership-modal.scss';

const TransferOwnershipSelection = ({
    handleClose,
    items,
    userId
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
                        userId !== item.id && <span>{item.username}</span>
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
                        className="button cancel-button"
                        onClick={handleClose}
                    >
                        <FormattedMessage id="studio.cancel" />
                    </button>
                    <button
                        className="button next-button"
                        // onClick={}
                    >
                        <FormattedMessage id="studio.next" />
                    </button>
                </div>
        </ModalInnerContent>
    </div>
}

TransferOwnershipSelection.propTypes = {
    handleClose: PropTypes.func,
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