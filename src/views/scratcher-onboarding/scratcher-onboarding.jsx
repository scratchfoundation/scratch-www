import React, {useState} from 'react';
const FormattedMessage = require('react-intl').FormattedMessage;
const render = require('../../lib/render.jsx');

const Button = require('../../components/forms/button.jsx');
const Page = require('../../components/page/www/page.jsx');
const Video = require('../../components/video/video.jsx');

require('./scratcher-onboarding.scss');

const OnboardingNavigation = ({page, totalPages}) => {
    const dots = [];

    for (let i = 1; i < totalPages; i++){
        dots.push(<div className={`dot ${page === i ? 'active' : ''}`} />);
    }

    return (
        <div>
            {dots}
        </div>
    );
};

const ScratcherOnboarding = ({name}) => {
    const [page, setPage] = useState(1);
    const totalPages = 9;

    const NextPage = () => {
        setPage(Math.min(page + 1, totalPages));
    };
    const BackPage = () => {
        setPage(Math.max(page - 1, 1));
    };

    if (page === 1){
        return (
            <div className="onboarding">
                <div className="left-art">
                    test
                </div>
                <div className="right-content">
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
        );
    } else if (page < 8) {
    
        return (
            <div className="onboarding">
                <div className="left-art">
                    test
                </div>
                <div className="right-content">
                    <h1>Congratulations {name}! You have shown that you are ready to become a Scratcher.</h1>
                    <div>
                    Scratch is a friendly and welcoming community for everyone, where people create, share, and learn together. We welcome people of all ages, races, ethnicities, religions, abilities, sexual orientations, and gender identities.
                    The next few pages will take you through the community guidelines and explain what this means.
                    </div>
                </div>
                <div className="navigation">
                    { /* eslint-disable react/jsx-no-bind */ }
                    <Button onClick={BackPage}>
                        Back
                    </Button>
                    <OnboardingNavigation
                        page={page}
                        totalPages={totalPages}
                    />
                    { /* eslint-disable react/jsx-no-bind */ }
                    <Button onClick={NextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }
    return (null);
    
};

render(<ScratcherOnboarding />, document.getElementById('app'));
