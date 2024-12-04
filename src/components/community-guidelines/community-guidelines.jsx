import React, {useEffect} from 'react';
import {FormattedMessage} from 'react-intl';
import thumbnailUrl from '../../lib/user-thumbnail.js';
import ModalNavigation from '../modal-navigation/modal-navigation.jsx';

import './community-guidelines.scss';
import PropTypes from 'prop-types';

export const communityGuidelines = [
    {
        section: 'communityGuidelines.guidelines.respectSection',
        header: 'communityGuidelines.guidelines.respectHeader',
        body: 'communityGuidelines.guidelines.respectBody',
        image: 'respect-illustration.svg',
        imageLeft: true
    },
    {
        section: 'communityGuidelines.guidelines.safeSection',
        header: 'communityGuidelines.guidelines.safeHeader',
        body: 'communityGuidelines.guidelines.safeBody',
        image: 'safe-illustration.svg'
    },
    {
        section: 'communityGuidelines.guidelines.feedbackSection',
        header: 'communityGuidelines.guidelines.feedbackHeader',
        body: 'communityGuidelines.guidelines.feedbackBody',
        image: 'feedback-illustration.svg',
        imageLeft: true
    },
    {
        section: 'communityGuidelines.guidelines.remix1Section',
        header: 'communityGuidelines.guidelines.remix1Header',
        body: 'communityGuidelines.guidelines.remix1Body',
        image: 'remix-illustration-1.svg'
    },
    {
        section: 'communityGuidelines.guidelines.remix2Section',
        header: 'communityGuidelines.guidelines.remix2Header',
        body: 'communityGuidelines.guidelines.remix2Body',
        image: 'remix-illustration-2.svg'
    },
    {
        section: 'communityGuidelines.guidelines.remix3Section',
        header: 'communityGuidelines.guidelines.remix3Header',
        body: 'communityGuidelines.guidelines.remix3Body',
        image: 'remix-illustration-3.svg'
    },
    {
        section: 'communityGuidelines.guidelines.honestSection',
        header: 'communityGuidelines.guidelines.honestHeader',
        body: 'communityGuidelines.guidelines.honestBody',
        image: 'honest-illustration.svg',
        imageLeft: true
    },
    {
        section: 'communityGuidelines.guidelines.friendlySection',
        header: 'communityGuidelines.guidelines.friendlyHeader',
        body: 'communityGuidelines.guidelines.friendlyBody',
        image: 'friendly-illustration.svg'
    }
];

export const CommunityGuidelines = ({
    constructHeader = () => null,
    userId,
    currentPage,
    nextButtonText,
    prevButtonText,
    onNextPage,
    onBackPage
}) => {
    useEffect(() => {
        communityGuidelines.forEach(guideline => {
            new Image().src = `/images/onboarding/${guideline.image}`;
        });
    }, []);

    const guideline = communityGuidelines[currentPage];
    return (
        <div className="onboarding col">
            {constructHeader(guideline)}
            <div className="content">
                {guideline.imageLeft && (
                    <div className="image-content">
                        <img
                            alt=""
                            src={`/images/onboarding/${guideline.image}`}
                        />
                    </div>
                )}
                <div className="text-content">
                    <h1><FormattedMessage id={guideline.header} /></h1>
                    <div>
                        <FormattedMessage id={guideline.body} />
                    </div>
                </div>
                {!guideline.imageLeft && (
                    <div className="image-content">
                        <div className="image-inner-content">
                            <img
                                alt=""
                                src={`/images/onboarding/${guideline.image}`}
                            />
                            {currentPage === 1 && <img
                                className="security-avatar"
                                src={thumbnailUrl(userId, 100, 100)}
                            />}
                        </div>
                    </div>
                )}
            </div>
            <ModalNavigation
                currentPage={currentPage}
                totalDots={communityGuidelines.length}
                nextButtonText={nextButtonText}
                prevButtonText={prevButtonText}
                onNextPage={onNextPage}
                onBackPage={onBackPage}
            />
        </div>
    );
};

CommunityGuidelines.propTypes = {
    currentPage: PropTypes.number,
    userId: PropTypes.string,
    constructHeader: PropTypes.func,
    nextButtonText: PropTypes.node,
    prevButtonText: PropTypes.node,
    onNextPage: PropTypes.func,
    onBackPage: PropTypes.func
};
