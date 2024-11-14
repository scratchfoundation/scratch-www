const PropTypes = require('prop-types');
const React = require('react');
const {shouldDisplayOnboarding} = require('../../lib/onboarding.js');

const Box = require('../box/box.jsx');

require('./welcome.scss');

const Welcome = props => (
    <Box
        className="welcome"
        moreHref="#"
        moreProps={{
            className: 'close',
            title: 'Dismiss',
            onClick: props.onDismiss
        }}
        moreTitle="x"
        title={props.messages['welcome.welcomeToScratch']}
    >
        <div className="welcome-col blue">
            <h4>
                <a
                    href={
                        shouldDisplayOnboarding(props.user, props.permissions) ?
                            '/projects/editor/' :
                            '/projects/editor/?tutorial=getStarted'
                    }
                >
                    {props.messages['welcome.learn']}
                </a>
            </h4>
            <a
                href={
                    shouldDisplayOnboarding(props.user, props.permissions) ?
                        '/projects/editor/' :
                        '/projects/editor/?tutorial=getStarted'
                }
            >
                <img
                    alt="Get Started"
                    src="/images/welcome-learn.png"
                />
            </a>
        </div>
        <div className="welcome-col green">
            <h4>
                <a href="/starter_projects/">
                    {props.messages['welcome.tryOut']}
                </a>
            </h4>
            <a href="/starter_projects/">
                <img
                    alt="Starter Projects"
                    src="/images/welcome-try.png"
                />
            </a>
        </div>
        <div className="welcome-col pink">
            <h4>
                <a href="/studios/146521/">
                    {props.messages['welcome.connect']}
                </a>
            </h4>
            <a href="/studios/146521/">
                <img
                    alt="Connect"
                    src="/images/welcome-connect.png"
                />
            </a>
        </div>
    </Box>
);

Welcome.propTypes = {
    messages: PropTypes.shape({
        'welcome.welcomeToScratch': PropTypes.string,
        'welcome.learn': PropTypes.string,
        'welcome.tryOut': PropTypes.string,
        'welcome.connect': PropTypes.string
    }),
    onDismiss: PropTypes.func,
    permissions: PropTypes.object,
    user: PropTypes.object
};

Welcome.defaultProps = {
    messages: {
        'welcome.welcomeToScratch': 'Welcome to Scratch!',
        'welcome.learn': 'Learn how to make a project in Scratch',
        'welcome.tryOut': 'Try out starter projects',
        'welcome.connect': 'Connect with other Scratchers'
    }
};

module.exports = Welcome;
