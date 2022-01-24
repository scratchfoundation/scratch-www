/* eslint-disable */

import React, {useState, useEffect} from 'react';
const FormattedMessage = require('react-intl').FormattedMessage;
const render = require('../../lib/render.jsx');
const thumbnailUrl = require('../../lib/user-thumbnail');
const injectIntl = require('react-intl').injectIntl;
const connect = require('react-redux').connect;
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

import Button from '../../components/forms/button.jsx';
import Modal from '../../components/modal/base/modal.jsx';

require('./scratcher-onboarding.scss');

const steps = [
    {
        section: 'Become a Scratcher - Treat everyone with respect',
        header: 'Scratchers treat everyone with respect.',
        body: 'Everyone on Scratch is encouraged to share things that excite them and are important to them—we hope that you find ways to celebrate your own identity on Scratch, and allow others to do the same.',
        image: 'respect-illustration.svg',
        imageLeft: true
    },
    {
        section: 'Become a Scratcher - Be safe',
        header: 'Scratchers are safe: we keep personal and contact information private.',
        body: 'This includes not sharing real last names, phone numbers, addresses, hometowns, school names, email addresses, usernames or links to social media sites, video chatting applications, or websites with private chat functionality.',
        image: 'safe-illustration.svg'
    },
    {
        section: 'Become a Scratcher - Give helpful feedback',
        header: 'Scratchers give helpful feedback.',
        body: 'When commenting on a project, remember to say something you like about it, offer suggestions, and be kind, not critical.',
        image: 'feedback-illustration.svg',
        imageLeft: true
    },
    {
        section: 'Become a Scratcher - Embrace remix culture',
        header: 'Scratchers embrace remix culture.',
        body: 'Remixing is when you build upon someone else’s projects, code, ideas, images, or anything else they share on Scratch to make your own unique creation.',
        image: 'remix-illustration-1.svg'
    },
    {
        section: 'Become a Scratcher - Embrace remix culture',
        header: 'Remixing is a great way to collaborate and connect with other Scratchers.',
        body: 'You are encouraged to use anything you find on Scratch in your own creations, as long as you provide credit to everyone whose work you used and make a meaningful change to it. ',
        image: 'remix-illustration-2.svg'
    },
    {
        section: 'Become a Scratcher - Embrace remix culture',
        header: 'Remixing means sharing with others.',
        body: 'When you share something on Scratch, you are giving permission to all Scratchers to use your work in their creations, too.',
        image: 'remix-illustration-3.svg'
    },
    {
        section: 'Become a Scratcher - Be honest',
        header: 'Scratchers are honest.',
        body: 'It’s important to be honest and authentic when interacting with others on Scratch, and remember that there is a person behind every Scratch account.',
        image: 'honest-illustration.svg',
        imageLeft: true
    },
    {
        section: 'Become a Scratcher - Keep the site friendly',
        header: 'Scratchers help keep the site friendly.',
        body: 'It’s important to keep your creations and conversations friendly and appropriate for all ages. If you think something on Scratch is mean, insulting, too violent, or otherwise disruptive to the community, click “Report” to let us know about it.',
        image: 'friendly-illustration.svg'
    }
];


const OnboardingHeader = ({user, section, whiteButton}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="header">
            <Modal
                isOpen={showModal}
                showCloseButton
                useStandardSizes
                className="mod-join"
                shouldCloseOnOverlayClick={false}
                onRequestClose={() => setShowModal(false)}
            >
                <div className="finish-later-modal-header">
                    Finish Later
                </div>
                <div className="finish-later-modal-content">
                    <h3>
                        No worries, take your time!
                    </h3>
                    <div>
                        By leaving this page, you will not finish the process to become a Scratcher and will stay as a New Scratcher. If you change your mind later, you can always come back via your profile page. Just click on “★ Become a Scratcher!” below your username.
                    </div>
                    <img
                        className="profile-page-image"
                        src="/images/onboarding/profile-page-become-a-scratcher-button.svg"
                    />
                    <a href={`/users/${user.username}`}>
                        <Button>Back to Profile Page</Button>
                    </a>
                </div>
            </Modal>
            <span>
                <span className="section">{section}</span>
            </span>
            <Button
                onClick={() => setShowModal(true)}
                className={`finish-later ${whiteButton ? 'secondary-finish-later' : ''}`}
            >Finish Later</Button>
        </div>
    );
};

const OnboardingNavigation = ({page, totalDots, onNextPage, onBackPage, nextText}) => {
    const dots = [];

    if (page && totalDots){
        for (let i = 0; i < totalDots - 1; i++){
            dots.push(<div className={`dot ${page === i + 2 && 'active'}`} />);
        }
    }
    
    return (
        
        <div className="navigation">
            { /* eslint-disable react/jsx-no-bind */ }
            <Button onClick={onBackPage}>
                <img
                    className="left-arrow"
                    alt=""
                    src="/images/onboarding/left-arrow.svg"
                />
                <span className="navText">Back</span>
            </Button>
            {(page && totalDots) &&
            <div className="dotRow">
                {dots}
            </div>}
            { /* eslint-disable react/jsx-no-bind */ }
            <Button onClick={onNextPage}>
                <span className="navText">{nextText || 'Next'}</span>
                <img
                    className="right-arrow"
                    alt=""
                    src="/images/onboarding/right-arrow.svg"
                />
            </Button>
        </div>

    );
};


const conffetiPaths = [
    new Path2D('M34.549 3.1361L40.613 15.4191L54.1718 17.3947C58.7918 18.0636 60.6345 23.7378 57.2946 26.9979L47.4788 36.5612L49.7954 50.0668C50.5839 54.6646 45.7557 58.1728 41.6274 56.0024L29.4994 49.6239L17.3714 56.0024C13.2386 58.1728 8.4149 54.6646 9.19893 50.0668L11.52 36.5612L1.70862 26.9979C-1.63567 23.7378 0.20701 18.0636 4.82699 17.3947L18.3902 15.4191L24.4497 3.1361C26.5183 -1.04537 32.4805 -1.04537 34.549 3.1361Z'),
    new Path2D('M58.9044 21.997C57.1803 41.4894 35.1024 56.8198 29.5019 56.8198C23.9015 56.8198 1.81974 41.4894 0.0993974 21.997C0.0496987 21.3611 0 20.7252 0 20.0893C0 10.6382 7.71859 2.9502 17.211 2.9502C22.028 2.9502 26.4053 4.90743 29.5019 8.14029C32.5985 4.90743 36.9758 2.9502 41.7928 2.9502C51.2814 2.9502 59 10.6382 59 20.0893C59 20.7252 58.9503 21.3611 58.9044 21.997Z'),
    new Path2D('M10.9967 45.1305C5.99892 36.9346 5.59074 25.9968 9.99448 17.3259C14.5575 8.00641 22.2367 3.87569 25.3229 2.53264C27.178 1.67111 29.1327 0.999586 31.2366 0.504948L33.3008 0.0594462C34.8174 -0.25175 36.3273 0.68839 36.6558 2.18868C36.9877 3.69225 36.022 5.17289 34.4988 5.50047L32.491 5.93286C30.8218 6.32595 29.2223 6.87628 27.6625 7.6035C25.6349 8.4814 18.9281 11.8783 15.0586 19.786C12.1217 25.5612 11.2456 34.7431 15.8683 42.3199C20.0564 49.6183 28.6315 54.0929 36.7654 53.3395C44.4578 52.7859 51.5164 47.6659 53.992 40.8851C56.5042 34.5072 54.835 27.9688 52.0772 24.2869C48.7553 19.75 44.6204 18.3545 42.9976 17.9647C42.7554 17.8926 37.074 16.186 32.0563 18.6985C29.8959 19.7336 27.1017 22.0627 25.605 25.5612C23.9889 29.1743 24.407 33.8193 26.5973 36.9051C28.8008 40.2136 32.9556 42.0873 36.5297 41.4518C40.0872 40.8917 42.4932 38.2449 43.064 35.9191C43.7343 33.4197 42.7056 31.3068 41.9025 30.5468C40.5386 29.2005 39.3605 29.1776 39.3107 29.1743C38.7532 29.1579 38.4777 29.2005 38.3118 29.2267C37.6746 29.4593 36.772 29.9703 36.5065 30.5075C36.46 30.596 36.3406 30.8384 36.5696 31.4444C37.1171 32.8825 36.3771 34.4908 34.9202 35.0313C33.47 35.5751 31.8373 34.8446 31.2864 33.4033C30.3804 31.0186 30.8815 29.1514 31.4623 28.0049C32.9789 25.0207 36.4999 23.9397 36.8981 23.825C37.0806 23.7693 37.2731 23.7366 37.4623 23.7202C37.8505 23.6612 38.5342 23.5695 39.46 23.6055C41.5806 23.6317 43.9965 24.7389 45.8483 26.5701C48.0352 28.6338 49.7476 32.7809 48.533 37.2883C47.3483 42.1135 42.7952 46.1034 37.4822 46.9387C31.7676 47.9575 25.3329 45.1403 21.9347 40.0334C18.6593 35.431 18.032 28.696 20.4281 23.3533C23.0564 17.2014 28.0773 14.4171 29.5508 13.7095C36.6359 10.1717 44.2089 12.5073 44.5275 12.6056C46.5651 13.0871 52.2299 14.9838 56.6336 21.0013C60.0186 25.5284 62.763 33.9831 59.2752 42.8342C56.0894 51.5575 47.0197 58.1843 37.2399 58.8886C36.4733 58.9607 35.6968 59 34.9236 59C25.4325 59 15.8186 53.5295 10.9967 45.1305Z')
];

const ScratcherOnboarding = ({user, invitedScratcher, scratcher, state}) => {
    // Existing scratchers revisiting this page should just get the congratulations message
    const [page, setPage] = useState(scratcher ? 11 : 0);
    const [hoorayAppear, setHoorayAppear] = useState(false);
    const {width, height} = useWindowSize();
    const dots = 9;

    // const handlePromoteToScratcher = () => {
    //     api({
    //         uri: `/users/${user.username}/promote-to-scratcher/`,
    //         method: 'GET',
    //         withCredentials: true,
    //         useCsrf: true
    //     }, (err, body, res) => {
    //         const error = normalizeError(err, body, res);
    //         if (error) return reject(error);
            
    //         // Note `body` is undefined, this endpoint returns an html fragment
    //         const index = curators.selector(getState()).items
    //             .findIndex(v => v.username === username);
    //         if (index !== -1) dispatch(curators.actions.remove(index));
    //         return resolve();
    //     });
    // };

    useEffect(() => {
        steps.forEach(step => {
            new Image().src = `/images/onboarding/${step.image}`;
        });
    }, []);

    useEffect(() => {
        if (user){
            new Image().src = thumbnailUrl(user.id, 100, 100);
        }
    }, [user]);

    const NextPage = () => {
        setPage(Math.min(page + 1, dots + 4));
    };
    const BackPage = () => {
        setPage(Math.max(page - 1, 0));
    };

    if (page === 11){
        setTimeout(() => {
            setHoorayAppear(true);
        }, 2500);
    }

    // New scratcher who is not invited
    if (false && !invitedScratcher && !scratcher){
        return (<div className="no-invitation">
            <img
                className="profile-page-image"
                src="/images/onboarding/invitation-illustration.svg"
            />
            <h2>
            Whoops! Looks like you haven’t received an invitation to become a Scratcher yet.
            </h2>
            <div>
            To become a Scratcher, you must be active on Scratch for a while, share several projects, and comment constructively in the community. After a few weeks, you will receive a notification inviting you to become a Scratcher. Scratch on!
            </div>
        </div>);
    }

    if (user){
        if (page === 0){
            return (
                <div className="onboarding col">
                    <div className="congratulations-page">
                        <OnboardingHeader user={user} />
                        <div className="congratulations-image">
                            <div className="relative-container">
                            <img
                                className="congrats-banner-image"
                                alt=""
                                src={`/images/onboarding/congratulations-illustration.svg`}
                            />
                            <img
                                className="avatar-position-1"
                                src={thumbnailUrl(user.id, 100, 100)}
                            />
                            </div>
                        </div>
                        <div className="congratulations-text">
                            <div className="center-text">
                                <h1>Congratulations {user.username}! You have shown that you are ready to become a Scratcher.</h1>
                                <div>
                            Scratch is a friendly and welcoming community for everyone, where people create, share, and learn together. We welcome people of all ages, races, ethnicities, religions, abilities, sexual orientations, and gender identities.
                            The next few pages will take you through the community guidelines and explain what this means.
                                </div>
                            </div>
                            <Button onClick={NextPage}>
                            Get started
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
        } else if (page === 1){
            return (
                <div className="onboarding col">
                    <OnboardingHeader user={user} />
                    <div className="content">
                        <div className="opening-text-content">
                            <h1>What does it mean to be a Scratcher?</h1>
                            <div>
                                You might notice on your profile page that you are currently a “New Scratcher”. Now that you have spent some time on Scratch, we invite you to become a “Scratcher”.
                            </div>
                            <br />
                            <b>
                                Scratchers have a bit more experience on Scratch and are excited to both contribute to the community and to make it a supportive and welcoming space for others.
                            </b>
                        </div>
                        <div className="opening-text-content">
                            Here are some things Scratchers do:
                            <div className="labeled-icon">
                                <img
                                    alt=""
                                    src="/images/onboarding/create-studios.svg"
                                />
                                Create studios
                            </div>
                            <div className="labeled-icon">
                                <img
                                    alt=""
                                    src="/images/onboarding/help-out.svg"
                                />
                                Help out in the community
                            </div>
                            Next, we will take you through the community guidelines and explain what these are.
                        </div>
                    </div>
                    <OnboardingNavigation
                        onNextPage={NextPage}
                        onBackPage={BackPage}
                        nextText={'Community Guidelines'}
                    />
                </div>
            );
        } else if (page < 10) {
            const step = steps[page - 2];
            return (
                <div className="onboarding col">
                    <OnboardingHeader
                        user={user}
                        section={step.section}
                    />
                    <div className="content">
                        {step.imageLeft && (
                            <div className="image-content">
                                <img
                                    alt=""
                                    src={`/images/onboarding/${step.image}`}
                                />
                            </div>
                        )}
                        <div className="text-content">
                            <h1>{step.header}</h1>
                            <div>
                                {step.body}
                            </div>
                        </div>
                        {!step.imageLeft && (
                            <div className="image-content">
                                <div className="image-inner-content">
                                    <img
                                        alt=""
                                        src={`/images/onboarding/${step.image}`}
                                    />
                                    {page === 3 && <img
                                        className="avatar-position-2"
                                        src={thumbnailUrl(user.id, 100, 100)}
                                    />}
                                </div>
                            </div>
                        )}
                    </div>
                    <OnboardingNavigation
                        page={page}
                        totalDots={dots}
                        onNextPage={NextPage}
                        onBackPage={BackPage}
                    />
                </div>
            );
        } else if (page === 10) {
            return (<div className="onboarding blue-background col">
                <OnboardingHeader
                    whiteButton
                    user={user}
                />
                <div className="content center-flex">
                    <div className="invitation-card">
                        <div className="row center-flex">
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
                        <h1>{user.username}, we invite you to become a Scratcher.</h1>
                        <div className="content">
                            {'Scratch is a friendly and welcoming community for everyone. If you agree to be respectful, be safe, give helpful feedback, embrace remix culture, be honest, and help keep the site friendly, click “I agree!”'}
                        </div>
                        <div className="content">
                            {'You get to decide if you want to become a Scratcher. If you do not want to be a Scratcher yet, just click “Finish Later” above.'}
                        </div>
                        <div className="invitation-buttons">
                            <Button
                                className="go-back"
                                onClick={BackPage}
                            >Go Back</Button>
                            <Button onClick={NextPage}>I Agree</Button>
                        </div>
                    </div>
                </div>
            </div>);
        } else if (page === 11) {
            return (<div className="onboarding col">
                <div className="hooray-screen">
                    <div className={`hooray-confetti ${hoorayAppear && 'hooray-disappear'}`}>
                        {conffetiPaths.map(confettiPath =>
                            (<Confetti
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
                    <h1>Hooray! You are now officially a Scratcher.</h1>
                    <div className={`hooray-links ${hoorayAppear && 'hooray-appear'}`}>
                        <div>
                            Here are some links that might be helpful for you.
                        </div>
                        <div className="row">
                            <a
                                className="hooray-link"
                                href={hoorayAppear && '/community_guidelines'}
                            >
                                <img
                                    className="profile-page-image"
                                    src="/images/onboarding/community-guidelines.svg"
                                />
                                    Community Guidelines
                            </a>
                            <a
                                className="hooray-link"
                                href={hoorayAppear && '/projects/editor'}
                            >
                                <img
                                    className="profile-page-image"
                                    src="/images/onboarding/create-a-project.svg"
                                />
                                    Create a Project
                            </a>
                        </div>
                        <a href={hoorayAppear && '/'}>
                            <Button>
                                Take me back to Scratch
                            </Button>
                        </a>
                    </div>
                </div>
            </div>);
        }
    }
    return (null);
    
};


const mapStateToProps = state => ({
    user: state.session && state.session.session && state.session.session.user,
    invitedScratcher: state.session && state.session.session && state.session.session.permissions && state.session.session.permissions.invited_scratcher,
    scratcher: state.session && state.session.session && state.session.session.permissions && state.session.session.permissions.scratcher
});

const ConnectedScratcherOnboarding = connect(
    mapStateToProps
)(ScratcherOnboarding);

const IntlConnectedScratchedOnboarding = injectIntl(ConnectedScratcherOnboarding);

// Allow incoming props to override redux-provided props. Used to mock in tests.
const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
    {}, stateProps, dispatchProps, ownProps
);

render(<IntlConnectedScratchedOnboarding />, document.getElementById('app'));
