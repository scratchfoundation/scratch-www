/* eslint-disable react/jsx-no-bind */
import React, {useState, useEffect} from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import {FormattedMessage, injectIntl} from 'react-intl';
import PropTypes from 'prop-types';

import render from '../../lib/render.jsx';
import thumbnailUrl from '../../lib/user-thumbnail';
import {connect} from 'react-redux';
import sessionActions from '../../redux/session.js';
import api from '../../lib/api';
import Button from '../../components/forms/button.jsx';
import Modal from '../../components/modal/base/modal.jsx';
import NotAvailable from '../../components/not-available/not-available.jsx';
import WarningBanner from '../../components/title-banner/warning-banner.jsx';

require('./become-a-scratcher.scss');

const communityGuidelines = [
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

/* eslint-disable max-len */
const confettiPaths = [
    new Path2D('M34.549 3.1361L40.613 15.4191L54.1718 17.3947C58.7918 18.0636 60.6345 23.7378 57.2946 26.9979L47.4788 36.5612L49.7954 50.0668C50.5839 54.6646 45.7557 58.1728 41.6274 56.0024L29.4994 49.6239L17.3714 56.0024C13.2386 58.1728 8.4149 54.6646 9.19893 50.0668L11.52 36.5612L1.70862 26.9979C-1.63567 23.7378 0.20701 18.0636 4.82699 17.3947L18.3902 15.4191L24.4497 3.1361C26.5183 -1.04537 32.4805 -1.04537 34.549 3.1361Z'),
    new Path2D('M58.9044 21.997C57.1803 41.4894 35.1024 56.8198 29.5019 56.8198C23.9015 56.8198 1.81974 41.4894 0.0993974 21.997C0.0496987 21.3611 0 20.7252 0 20.0893C0 10.6382 7.71859 2.9502 17.211 2.9502C22.028 2.9502 26.4053 4.90743 29.5019 8.14029C32.5985 4.90743 36.9758 2.9502 41.7928 2.9502C51.2814 2.9502 59 10.6382 59 20.0893C59 20.7252 58.9503 21.3611 58.9044 21.997Z'),
    new Path2D('M10.9967 45.1305C5.99892 36.9346 5.59074 25.9968 9.99448 17.3259C14.5575 8.00641 22.2367 3.87569 25.3229 2.53264C27.178 1.67111 29.1327 0.999586 31.2366 0.504948L33.3008 0.0594462C34.8174 -0.25175 36.3273 0.68839 36.6558 2.18868C36.9877 3.69225 36.022 5.17289 34.4988 5.50047L32.491 5.93286C30.8218 6.32595 29.2223 6.87628 27.6625 7.6035C25.6349 8.4814 18.9281 11.8783 15.0586 19.786C12.1217 25.5612 11.2456 34.7431 15.8683 42.3199C20.0564 49.6183 28.6315 54.0929 36.7654 53.3395C44.4578 52.7859 51.5164 47.6659 53.992 40.8851C56.5042 34.5072 54.835 27.9688 52.0772 24.2869C48.7553 19.75 44.6204 18.3545 42.9976 17.9647C42.7554 17.8926 37.074 16.186 32.0563 18.6985C29.8959 19.7336 27.1017 22.0627 25.605 25.5612C23.9889 29.1743 24.407 33.8193 26.5973 36.9051C28.8008 40.2136 32.9556 42.0873 36.5297 41.4518C40.0872 40.8917 42.4932 38.2449 43.064 35.9191C43.7343 33.4197 42.7056 31.3068 41.9025 30.5468C40.5386 29.2005 39.3605 29.1776 39.3107 29.1743C38.7532 29.1579 38.4777 29.2005 38.3118 29.2267C37.6746 29.4593 36.772 29.9703 36.5065 30.5075C36.46 30.596 36.3406 30.8384 36.5696 31.4444C37.1171 32.8825 36.3771 34.4908 34.9202 35.0313C33.47 35.5751 31.8373 34.8446 31.2864 33.4033C30.3804 31.0186 30.8815 29.1514 31.4623 28.0049C32.9789 25.0207 36.4999 23.9397 36.8981 23.825C37.0806 23.7693 37.2731 23.7366 37.4623 23.7202C37.8505 23.6612 38.5342 23.5695 39.46 23.6055C41.5806 23.6317 43.9965 24.7389 45.8483 26.5701C48.0352 28.6338 49.7476 32.7809 48.533 37.2883C47.3483 42.1135 42.7952 46.1034 37.4822 46.9387C31.7676 47.9575 25.3329 45.1403 21.9347 40.0334C18.6593 35.431 18.032 28.696 20.4281 23.3533C23.0564 17.2014 28.0773 14.4171 29.5508 13.7095C36.6359 10.1717 44.2089 12.5073 44.5275 12.6056C46.5651 13.0871 52.2299 14.9838 56.6336 21.0013C60.0186 25.5284 62.763 33.9831 59.2752 42.8342C56.0894 51.5575 47.0197 58.1843 37.2399 58.8886C36.4733 58.9607 35.6968 59 34.9236 59C25.4325 59 15.8186 53.5295 10.9967 45.1305Z')
];

const OnboardingHeader = ({user, sectionText, secondary}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="header">
            {/* Finish Later Modal */}
            <Modal
                isOpen={showModal}
                showCloseButton
                useStandardSizes
                className="mod-join"
                shouldCloseOnOverlayClick={false}
                onRequestClose={() => setShowModal(false)}
            >
                <div className="finish-later-modal-header">
                    <FormattedMessage
                        id={'becomeAScratcher.buttons.finishLater'}
                    />
                </div>
                <div className="finish-later-modal-content">
                    <h3>
                        <FormattedMessage
                            id={'becomeAScratcher.finishLater.header'}
                        />
                    </h3>
                    <div>
                        <FormattedMessage
                            id={'becomeAScratcher.finishLater.body'}
                        />
                        <br />
                        <FormattedMessage
                            id={'becomeAScratcher.finishLater.clickBecomeAScratcher'}
                        />
                    </div>
                    <img
                        className="profile-page-image"
                        src="/images/onboarding/profile-page-become-a-scratcher-button.svg"
                    />
                    <a href={`/users/${user.username}`}>
                        <Button>
                            <FormattedMessage
                                id={'becomeAScratcher.buttons.backToProfile'}
                            />
                        </Button>
                    </a>
                </div>
            </Modal>
            <span>
                <span className="section">{sectionText}</span>
            </span>
            <Button
                onClick={() => setShowModal(true)}
                className={`finish-later ${secondary ? 'secondary-finish-later' : ''}`}
            >
                <FormattedMessage
                    id={'becomeAScratcher.buttons.finishLater'}
                />
            </Button>
        </div>
    );
};
OnboardingHeader.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        thumbnailUrl: PropTypes.string,
        username: PropTypes.string
    }),
    sectionText: PropTypes.string,
    secondary: PropTypes.bool
};

const OnboardingNavigation = ({currentPage, totalDots, onNextPage, onBackPage, nextButtonText}) => {
    const dots = [];

    if (currentPage && totalDots){
        for (let i = 0; i < totalDots; i++){
            // First two pages don't have dots
            dots.push(<div className={`dot ${currentPage === i + 2 && 'active'}`} />);
        }
    }
    
    return (
        
        <div className="navigation">
            <Button onClick={onBackPage}>
                <img
                    className="left-arrow"
                    alt=""
                    src="/images/onboarding/left-arrow.svg"
                />
                <span className="navText">
                    <FormattedMessage
                        id={'becomeAScratcher.buttons.back'}
                    />
                </span>
            </Button>
            {(currentPage && totalDots) &&
            <div className="dotRow">
                {dots}
            </div>}
            <Button onClick={onNextPage}>
                <span className="navText">
                    {nextButtonText || <FormattedMessage id={'becomeAScratcher.buttons.next'} />}
                </span>
                <img
                    className="right-arrow"
                    alt=""
                    src="/images/onboarding/right-arrow.svg"
                />
            </Button>
        </div>

    );
};
OnboardingNavigation.propTypes = {
    currentPage: PropTypes.number,
    totalDots: PropTypes.number,
    onNextPage: PropTypes.func,
    onBackPage: PropTypes.func,
    nextButtonText: PropTypes.string
};

const BecomeAScratcher = ({user, invitedScratcher, scratcher, sessionStatus}) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [hoorayAppear, setHoorayAppear] = useState(false);
    const [showConfetti, setShowConfetti] = useState(true);
    const [showPromotionError, setShowPromotionError] = useState(false);
    
    const {width, height} = useWindowSize();

    const lastPage = 3 + communityGuidelines.length;

    const handlePromoteToScratcher = onSuccess => {
        api({
            host: '',
            uri: `/users/${user.username}/promote-to-scratcher/`,
            method: 'GET'
        }, err => {
            if (err) {
                return setShowPromotionError(true);
            }

            onSuccess();
        });
    };

    // Preload images
    useEffect(() => {
        communityGuidelines.forEach(guideline => {
            new Image().src = `/images/onboarding/${guideline.image}`;
        });
        new Image().src = '/images/onboarding/community-guidelines.svg';
        new Image().src = '/images/onboarding/create-a-project.svg';
        new Image().src = '/images/onboarding/right-arrow.svg';
        new Image().src = '/images/onboarding/left-arrow.svg';
    }, []);
    
    useEffect(() => {
        if (user){
            // If user is a scratcher only show last page
            if (scratcher){
                setCurrentPage(lastPage);
            }
        }
    }, [user]);

    useEffect(() => {
        if (currentPage === lastPage){
            setTimeout(() => {
                setHoorayAppear(true);
            }, 2500);
            setTimeout(() => {
                setShowConfetti(false);
            }, 5000);
        }
    }, [currentPage]);

    const nextPage = () => {
        window.scrollTo(0, 0);
        setCurrentPage(Math.min(currentPage + 1, lastPage));
    };
    
    const backPage = () => {
        window.scrollTo(0, 0);
        setCurrentPage(Math.max(currentPage - 1, 0));
    };


    if (sessionStatus === sessionActions.Status.FETCHED){
        // Not logged in
        if (!user){
            return (<NotAvailable />);
        }

        // New scratcher who is not invited
        if (!invitedScratcher && !scratcher){
            return (<div className="no-invitation">
                <img
                    className="profile-page-image"
                    src="/images/onboarding/invitation-illustration.svg"
                />
                <h2>
                    <FormattedMessage
                        id={'becomeAScratcher.noInvitation.header'}
                    />
                </h2>
                <div>
                    <FormattedMessage
                        id={'becomeAScratcher.noInvitation.body'}
                    />
                </div>
            </div>);
        }

        // Invited Scratcher
        if (currentPage === 0){
            return (
                <div className="onboarding col">
                    <div className="congratulations-page">
                        <OnboardingHeader user={user} />
                        <div className="congratulations-image-layout">
                            <div className="congratulations-image-container">
                                <img
                                    className="congrats-banner-image"
                                    alt=""
                                    src={`/images/onboarding/congratulations-illustration.svg`}
                                />
                                <img
                                    className="congratulations-avatar"
                                    src={thumbnailUrl(user.id, 100, 100)}
                                />
                                <h3
                                    className="congratulations-username"
                                >
                                    {user.username}
                                </h3>
                            </div>
                        </div>
                        <div className="congratulations-text-layout">
                            <div className="congratulations-text">
                                <h1>
                                    <FormattedMessage
                                        id={'becomeAScratcher.congratulations.header'}
                                        values={{username: user.username}}
                                    />
                                </h1>

                                <FormattedMessage
                                    id={'becomeAScratcher.congratulations.body'}
                                />
                                <div />
                            </div>
                            <Button onClick={nextPage}>
                                <FormattedMessage
                                    id={'becomeAScratcher.buttons.getStarted'}
                                />
                                <img
                                    className="right-arrow"
                                    alt=""
                                    src="/images/onboarding/right-arrow.svg"
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            );
        } else if (currentPage === 1){
            return (
                <div className="onboarding col">
                    <OnboardingHeader user={user} />
                    <div className="content">
                        <div className="opening-text-content">
                            <h1><FormattedMessage id={'becomeAScratcher.toBeAScratcher.header'} /></h1>
                            <div>
                                <FormattedMessage id={'becomeAScratcher.toBeAScratcher.body'} />
                            </div>
                            <br />
                            <b>
                                <FormattedMessage id={'becomeAScratcher.toBeAScratcher.definition'} />
                            </b>
                        </div>
                        <div className="opening-text-content">
                            <FormattedMessage id={'becomeAScratcher.toBeAScratcher.canDo'} />
                            <div className="labeled-icon">
                                <img
                                    alt=""
                                    src="/images/onboarding/create-studios.svg"
                                />
                                <FormattedMessage id={'becomeAScratcher.toBeAScratcher.createStudios'} />
                            </div>
                            <div className="labeled-icon">
                                <img
                                    alt=""
                                    src="/images/onboarding/help-out.svg"
                                />
                                <FormattedMessage id={'becomeAScratcher.toBeAScratcher.helpOut'} />
                            </div>
                            <FormattedMessage id={'becomeAScratcher.toBeAScratcher.communityGuidelines'} />
                        </div>
                    </div>
                    <OnboardingNavigation
                        onNextPage={nextPage}
                        onBackPage={backPage}
                        nextButtonText={<FormattedMessage id={'becomeAScratcher.buttons.communityGuidelines'} />}
                    />
                </div>
            );
        } else if (currentPage < 2 + communityGuidelines.length) {
            const guideline = communityGuidelines[currentPage - 2];
            return (
                <div className="onboarding col">
                    <OnboardingHeader
                        user={user}
                        section={(<FormattedMessage id={guideline.section} />)}
                    />
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
                                        src={thumbnailUrl(user.id, 100, 100)}
                                    />}
                                </div>
                            </div>
                        )}
                    </div>
                    <OnboardingNavigation
                        currentPage={currentPage}
                        totalDots={communityGuidelines.length}
                        onNextPage={nextPage}
                        onBackPage={backPage}
                    />
                </div>
            );
        } else if (currentPage === lastPage - 1) {
            return (<div className="onboarding blue-background col">
                {
                    showPromotionError &&
                    <WarningBanner>
                        <FormattedMessage id={'becomeAScratcher.success.error'} />
                    </WarningBanner>
                }
                <OnboardingHeader
                    secondary
                    user={user}
                />
                <div className="content center-flex">
                    <div className="invitation-card">
                        <div className="invitation-image row center-flex">
                            <img
                                alt=""
                                src={`/images/onboarding/left-lines.svg`}
                            />
                            <img
                                className="invitation-icon"
                                src={thumbnailUrl(user.id, 100, 100)}
                            />
                            <img
                                alt=""
                                src={`/images/onboarding/right-lines.svg`}
                            />
                        </div>
                        <h1>
                            <FormattedMessage
                                id={'becomeAScratcher.invitation.header'}
                                values={{username: user.username}}
                            />
                        </h1>
                        <div className="content">
                            <FormattedMessage
                                id={'becomeAScratcher.invitation.body'}
                            />
                        </div>
                        <br />
                        <div className="content">
                            <FormattedMessage
                                id={'becomeAScratcher.invitation.finishLater'}
                            />
                        </div>
                        <div className="invitation-buttons">
                            <Button
                                className="go-back"
                                onClick={backPage}
                            >
                                <FormattedMessage id={'becomeAScratcher.buttons.goBack'} />
                            </Button>
                            <Button
                                onClick={() => {
                                    handlePromoteToScratcher(nextPage);
                                }}
                            >
                                <FormattedMessage id={'becomeAScratcher.buttons.iAgree'} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>);
        } else if (currentPage === lastPage) {
            return (<div className="onboarding col">
                <div className="hooray-screen">
                    <div className={`hooray-confetti ${hoorayAppear && 'hooray-disappear'}`}>
                        {showConfetti && confettiPaths.map(confettiPath =>
                            (<Confetti
                                key={confettiPath.toString()}
                                colors={['#0FBD8C', '#4C97FF', '#FFBF00', '#FF6680']}
                                gravity={.08}
                                width={width}
                                height={height}
                                friction={.9999}
                                numberOfPieces={45}
                                initialVelocityY={-10}
                                initialVelocityX={1}
                                drawShape={ctx => {
                                    ctx.scale(.5, .5);
                                    ctx.translate(-30, -30);
                                    ctx.fill(confettiPath);
                                }}
                            />)
                        )}
                    </div>
                    <h1><FormattedMessage id={'becomeAScratcher.success.header'} /></h1>
                    <div className={`hooray-links ${hoorayAppear && 'hooray-appear'}`}>
                        <div>
                            <FormattedMessage id={'becomeAScratcher.success.body'} />
                        </div>
                        <div className="row">
                            <a
                                className="hooray-link"
                                href={hoorayAppear ? '/community_guidelines' : null}
                            >
                                <img
                                    className="profile-page-image"
                                    src="/images/onboarding/community-guidelines.svg"
                                />
                                <FormattedMessage id={'becomeAScratcher.success.communityGuidelines'} />
                            </a>
                            <a
                                className="hooray-link"
                                href={hoorayAppear ? '/projects/editor' : null}
                            >
                                <img
                                    className="profile-page-image"
                                    src="/images/onboarding/create-a-project.svg"
                                />
                                <FormattedMessage id={'becomeAScratcher.success.createAProject'} />
                            </a>
                        </div>
                        <a href={hoorayAppear ? '/' : null}>
                            <Button>
                                <FormattedMessage id={'becomeAScratcher.buttons.takeMeBack'} />
                            </Button>
                        </a>
                    </div>
                </div>
            </div>);
        }
    }
    return (null);
};
BecomeAScratcher.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        thumbnailUrl: PropTypes.string,
        username: PropTypes.string
    }),
    invitedScratcher: PropTypes.bool,
    scratcher: PropTypes.bool,
    sessionStatus: PropTypes.string
};


const mapStateToProps = state => ({
    user: state.session && state.session.session && state.session.session.user,
    invitedScratcher: state.session && state.session.session && state.session.session.permissions && state.session.session.permissions.invited_scratcher,
    scratcher: state.session && state.session.session && state.session.session.permissions && state.session.session.permissions.scratcher,
    sessionStatus: state.session.status
});

const ConnectedBecomeAScratcher = connect(
    mapStateToProps
)(BecomeAScratcher);

const IntlConnectedScratchedOnboarding = injectIntl(ConnectedBecomeAScratcher);

render(<IntlConnectedScratchedOnboarding />, document.getElementById('app'));
