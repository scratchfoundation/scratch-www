import React, {useEffect} from 'react';
import {FormattedMessage} from 'react-intl';
import thumbnailUrl from '../../lib/user-thumbnail';
import OnboardingNavigation from '../onboarding-navigation/onboarding-navigation.jsx';

import './community-guidelines.scss';
import PropTypes from 'prop-types';

export const communityGuidelines = [
    {
        section: 'becomeAScratcher.guidelines.respectSection',
        header: 'becomeAScratcher.guidelines.respectHeader',
        body: 'becomeAScratcher.guidelines.respectBody',
        image: 'respect-illustration.svg',
        imageLeft: true
    },
    {
        section: 'becomeAScratcher.guidelines.safeSection',
        header: 'becomeAScratcher.guidelines.safeHeader',
        body: 'becomeAScratcher.guidelines.safeBody',
        image: 'safe-illustration.svg'
    },
    {
        section: 'becomeAScratcher.guidelines.feedbackSection',
        header: 'becomeAScratcher.guidelines.feedbackHeader',
        body: 'becomeAScratcher.guidelines.feedbackBody',
        image: 'feedback-illustration.svg',
        imageLeft: true
    },
    {
        section: 'becomeAScratcher.guidelines.remix1Section',
        header: 'becomeAScratcher.guidelines.remix1Header',
        body: 'becomeAScratcher.guidelines.remix1Body',
        image: 'remix-illustration-1.svg'
    },
    {
        section: 'becomeAScratcher.guidelines.remix2Section',
        header: 'becomeAScratcher.guidelines.remix2Header',
        body: 'becomeAScratcher.guidelines.remix2Body',
        image: 'remix-illustration-2.svg'
    },
    {
        section: 'becomeAScratcher.guidelines.remix3Section',
        header: 'becomeAScratcher.guidelines.remix3Header',
        body: 'becomeAScratcher.guidelines.remix3Body',
        image: 'remix-illustration-3.svg'
    },
    {
        section: 'becomeAScratcher.guidelines.honestSection',
        header: 'becomeAScratcher.guidelines.honestHeader',
        body: 'becomeAScratcher.guidelines.honestBody',
        image: 'honest-illustration.svg',
        imageLeft: true
    },
    {
        section: 'becomeAScratcher.guidelines.friendlySection',
        header: 'becomeAScratcher.guidelines.friendlyHeader',
        body: 'becomeAScratcher.guidelines.friendlyBody',
        image: 'friendly-illustration.svg'
    }
];

const CommunityGuidelines = ({constructHeader = () => null, userId, currentPage, onNextPage, onBackPage}) => {
    useEffect(() => {
        communityGuidelines.forEach(guideline => {
            new Image().src = `/images/onboarding/${guideline.image}`;
        });
    }, []);

    console.log('==user id', userId);

    const guideline = communityGuidelines[currentPage - 2];
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
                            {currentPage === 3 && <img
                                className="security-avatar"
                                src={thumbnailUrl(userId, 100, 100)}
                            />}
                        </div>
                    </div>
                )}
            </div>
            <OnboardingNavigation
                currentPage={currentPage}
                totalDots={communityGuidelines.length}
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
    onNextPage: PropTypes.func,
    onBackPage: PropTypes.func
};

export default CommunityGuidelines;
