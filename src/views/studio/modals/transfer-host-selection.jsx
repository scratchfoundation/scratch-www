import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import ModalInnerContent from '../../../components/modal/base/modal-inner-content.jsx';

import TransferHostTile from './transfer-host-tile.jsx';

import {managers} from '../lib/redux-modules';
import {loadManagers} from '../lib/studio-member-actions';

import './transfer-host-modal.scss';

const TransferHostSelection = ({
    handleSelected,
    handleNext,
    handleBack,
    onLoadMore,
    items,
    hostId,
    selectedId
}) => {
    useEffect(() => {
        if (items.length === 0) onLoadMore();
    }, []);

    return (
        <ModalInnerContent>
            <div className="transfer-selection-heading">
                <h3>
                    <FormattedMessage id="studio.transfer.whichManager" />
                </h3>
            </div>
            <div className="transfer-selection-scroll-pane">
                <div className="transfer-host-grid">
                    {items.filter(item => hostId !== item.id).map(item =>
                        (<TransferHostTile
                            key={item.username}
                            // eslint-disable-next-line react/jsx-no-bind
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
            </div>
            <div
                className="transfer-host-button-row transfer-host-button-row-split transfer-selection-buttons"
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
    );
};

TransferHostSelection.propTypes = {
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
    // moreToLoad: PropTypes.bool,
    onLoadMore: PropTypes.func,
    selectedId: PropTypes.number,
    hostId: PropTypes.number
};

export default connect(
    state => ({
        hostId: state.studio.owner,
        ...managers.selector(state)
    }),
    {
        onLoadMore: loadManagers
    }
)(TransferHostSelection);
