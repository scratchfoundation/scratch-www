import React, {useState} from 'react';
const FormattedMessage = require('react-intl').FormattedMessage;
const render = require('../../lib/render.jsx');
const injectIntl = require('react-intl').injectIntl;
const connect = require('react-redux').connect;
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

const Button = require('../../components/forms/button.jsx');

require('./scratcher-onboarding.scss');

const steps = [
    {
        section: 'Treat everyone with respect',
        header: 'Scratchers treat everyone with respect.',
        body: 'Everyone on Scratch is encouraged to share things that excite them and are important to them—we hope that you find ways to celebrate your own identity on Scratch, and allow others to do the same.',
        image: 'respect-illustration.svg',
        imageLeft: true
    },
    {
        section: 'Be safe',
        header: 'Scratchers are safe: we keep personal and contact information private.',
        body: 'This includes not sharing real last names, phone numbers, addresses, hometowns, school names, email addresses, usernames or links to social media sites, video chatting applications, or websites with private chat functionality.',
        image: 'safe-illustration.svg'
    },
    {
        section: 'Give helpful feedback',
        header: 'Scratchers give helpful feedback.',
        body: 'When commenting on a project, remember to say something you like about it, offer suggestions, and be kind, not critical.',
        image: 'feedback-illustration.svg',
        imageLeft: true
    },
    {
        section: 'Embrace remix culture',
        header: 'Scratchers embrace remix culture.',
        body: 'Remixing is when you build upon someone else’s projects, code, ideas, images, or anything else they share on Scratch to make your own unique creation.',
        image: 'remix-illustration-1.svg'
    },
    {
        section: 'Embrace remix culture',
        header: 'Remixing is a great way to collaborate and connect with other Scratchers.',
        body: 'You are encouraged to use anything you find on Scratch in your own creations, as long as you provide credit to everyone whose work you used and make a meaningful change to it. ',
        image: 'remix-illustration-2.svg'
    },
    {
        section: 'Embrace remix culture',
        header: 'Remixing means sharing with others.',
        body: 'When you share something on Scratch, you are giving permission to all Scratchers to use your work in their creations, too.',
        image: 'remix-illustration-3.svg'
    },
    {
        section: 'Be honest',
        header: 'Scratchers are honest.',
        body: 'It’s important to be honest and authentic when interacting with others on Scratch, and remember that there is a person behind every Scratch account.',
        image: 'honest-illustration.svg',
        imageLeft: true
    },
    {
        section: 'Keep the site friendly',
        header: 'Scratchers help keep the site friendly.',
        body: 'It’s important to keep your creations and conversations friendly and appropriate for all ages. If you think something on Scratch is mean, insulting, too violent, or otherwise disruptive to the community, click “Report” to let us know about it.',
        image: 'friendly-illustration.svg'
    }
];

const OnboardingNavigation = ({page, totalPages, onNextPage, onBackPage}) => {
    const dots = [];

    for (let i = 0; i < totalPages; i++){
        dots.push(<div className="dot">
            {page === i-2 && <div className="active" />}
        </div>);
    }
    
    return (
        
        <div className="navigation">
            { /* eslint-disable react/jsx-no-bind */ }
            <Button onClick={onBackPage}>
                <img
                    className="leftArrow"
                    alt=""
                    src="/images/onboarding/left-arrow.svg"
                />
                <span className="navText">Back</span>
            </Button>
            {(page > 1 && page < 9) &&
            <div className="dotRow">
                {dots}
            </div>}
            { /* eslint-disable react/jsx-no-bind */ }
            <Button onClick={onNextPage}>
                <span className="navText">Next</span>
                <img
                    className="rightArrow"
                    alt=""
                    src="/images/onboarding/right-arrow.svg"
                />
            </Button>
        </div>

    );
};

const OnboardingHeader = ({section}) => (
    <div className="header">
        <span>
            Become a Scratcher
            <span className="section">{section && ` - ${section}`}</span>
        </span>
        <Button className="white secondary">Finish Later</Button>
    </div>
);

const ScratcherOnboarding = ({user}) => {
    const [page, setPage] = useState(3);
    const {width, height} = useWindowSize();
    const totalPages = 9;

    const NextPage = () => {
        setPage(Math.min(page + 1, totalPages));
    };
    const BackPage = () => {
        setPage(Math.max(page - 1, 0));
    };

    if (user){
        if (page === 0){
            return (
                <div className="onboarding col">
                    <div className="content">
                        <OnboardingHeader />
                        <div className="art-content-1">
                            <div className="blue-background" />
                            <img
                                alt=""
                                src={`/images/onboarding/friendly-illustration.svg`}
                            />
                        </div>
                        <div className="text-content">
                            <h1>Congratulations {user.username}! You have shown that you are ready to become a Scratcher.</h1>
                            <div>
                        Scratch is a friendly and welcoming community for everyone, where people create, share, and learn together. We welcome people of all ages, races, ethnicities, religions, abilities, sexual orientations, and gender identities.
                        The next few pages will take you through the community guidelines and explain what this means.
                            </div>
                            { /* eslint-disable react/jsx-no-bind */ }
                            <Button onClick={NextPage}>
                            Get started
                            </Button>
                        </div>
                    </div>
                </div>
            );
        } else if (page === 1){
            return (
                <div className="onboarding col">
                    <OnboardingHeader />
                    <div className="content">
                        <div className="art-content-1">
                        test
                        </div>
                        <div className="text-content">
                            <h1>Congratulations {name}! You have shown that you are ready to become a Scratcher.</h1>
                            <div>
                        Scratch is a friendly and welcoming community for everyone, where people create, share, and learn together. We welcome people of all ages, races, ethnicities, religions, abilities, sexual orientations, and gender identities.
                        The next few pages will take you through the community guidelines and explain what this means.
                            </div>
                            { /* eslint-disable react/jsx-no-bind */ }
                            <Button onClick={NextPage}>
                            Get started
                            </Button>
                        </div>
                    </div>
                    <OnboardingNavigation
                        page={page}
                        totalPages={totalPages}
                        onNextPage={NextPage}
                        onBackPage={BackPage}
                    />
                </div>
            );
        } else if (page < 10) {
            const step = steps[page - 2];
            return (
                <div className="onboarding col">
                    <OnboardingHeader section={step.section} />
                    <div className="content">
                        {step.imageLeft && (
                            <div className="art-content">
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
                            <div className="art-content">
                                <div className="art-inner-content">
                                    <img
                                        alt=""
                                        src={`/images/onboarding/${step.image}`}
                                    />
                                    {page === 3 && <img
                                        className="avatar"
                                        src={`//cdn2.scratch.mit.edu${user.thumbnailUrl}`}
                                    />}
                                </div>
                            </div>
                        )}
                    </div>
                    <OnboardingNavigation
                        page={page}
                        totalPages={totalPages}
                        onNextPage={NextPage}
                        onBackPage={BackPage}
                    />
                </div>
            );
        } else if (page == 10) {
            return (<div className="onboarding col">
                <Confetti
                    width={width}
                    height={height}
                />
                <OnboardingHeader />
                <div className="content" />
                <OnboardingNavigation
                    page={page}
                    totalPages={totalPages}
                    onNextPage={NextPage}
                    onBackPage={BackPage}
                />
            </div>);
        }
    }
    return (null);
    
};


const mapStateToProps = state => ({
    user: state.session && state.session.session && state.session.session.user
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
