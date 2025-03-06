import React, {useCallback, useState, useEffect} from 'react';
import {CommunityGuidelines, communityGuidelines} from './community-guidelines.jsx';
import PropTypes from 'prop-types';
import {FormattedMessage, useIntl} from 'react-intl';
const ReactModal = require('react-modal');

export const CommunityGuidelinesModal = props => {
    useIntl();

    const [currentPage, setCurrentPage] = useState(0);
    const onNextPage = useCallback(() => setCurrentPage(currentPage + 1), [currentPage]);
    const onBackPage = useCallback(() => setCurrentPage(currentPage - 1), [currentPage]);
    const onComplete = props.onComplete ?? (() => true);
    
    useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = props.isOpen ? 'hidden' : 'auto';
    }, [props.isOpen]);

    return (
        <ReactModal
            isOpen={props.isOpen}
            style={{
                content: {
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    margin: 0,
                    padding: 0
                },
                overlay: {
                    zIndex: 1000
                }
            }}
        >
            <CommunityGuidelines
                userId={props.userId}
                currentPage={currentPage}
                onNextPage={
                    currentPage < communityGuidelines.length - 1 ?
                        onNextPage :
                        onComplete
                }
                nextButtonText={
                    currentPage === communityGuidelines.length - 1 ? (
                        <FormattedMessage id={'communityGuidelines.buttons.finish'} />
                    ) : (
                        <FormattedMessage id={'communityGuidelines.buttons.next'} />
                    )
                }
                prevButtonText={
                    <FormattedMessage id={'communityGuidelines.buttons.back'} />
                }
                onBackPage={currentPage > 0 ? onBackPage : null}
            />
        </ReactModal>
    );
};

CommunityGuidelinesModal.propTypes = {
    userId: PropTypes.string,
    onComplete: PropTypes.func,
    isOpen: PropTypes.bool
};
