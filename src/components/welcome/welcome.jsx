var React = require('react');

var Box = require('../box/box.jsx');

require('./welcome.scss');

var Welcome = React.createClass({
    type: 'Welcome',
    propTypes: {
        onDismiss: React.PropTypes.func
    },
    getDefaultProps: function () {
        return {
            messages: {
                'welcome.welcomeToScratch': 'Welcome to Scratch!',
                'welcome.learn': 'Learn how to make a project in Scratch',
                'welcome.tryOut': 'Try out starter projects',
                'welcome.connect': 'Connect with other Scratchers'
            }
        };
    },
    render: function () {
        return (
            <Box title={this.props.messages['welcome.welcomeToScratch']}
                 className="welcome"
                 moreTitle="x"
                 moreHref="#"
                 moreProps={{
                     className: 'close',
                     title: 'Dismiss',
                     onClick: this.props.onDismiss
                 }}>

                <div className="welcome-col blue">
                    <h4>
                        <a href="/projects/editor/?tip_bar=getStarted">
                            {this.props.messages['welcome.learn']}
                        </a>
                    </h4>
                    <a href="/projects/editor/?tip_bar=getStarted">
                        <img src="/images/welcome-learn.png" alt="Get Started" />
                    </a>
                </div>
                <div className="welcome-col green">
                    <h4>
                        <a href="/starter_projects/">
                            {this.props.messages['welcome.tryOut']}
                        </a>
                    </h4>
                    <a href="/starter_projects/">
                        <img src="/images/welcome-try.png" alt="Starter Projects" />
                    </a>
                </div>
                <div className="welcome-col pink">
                    <h4>
                        <a href="/studios/146521/">
                            {this.props.messages['welcome.connect']}
                        </a>
                    </h4>
                    <a href="/studios/146521/">
                        <img src="/images/welcome-connect.png" alt="Connect" />
                    </a>
                </div>
            </Box>
        );
    }
});

module.exports = Welcome;
