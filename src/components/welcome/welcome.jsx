var React = require('react');
var ReactIntl = require('react-intl');

var injectIntl = ReactIntl.injectIntl;
var FormattedMessage = ReactIntl.FormattedMessage;

var Box = require('../box/box.jsx');

require('./welcome.scss');

var Welcome = React.createClass({
    type: 'Welcome',
    propTypes: {
        onDismiss: React.PropTypes.func
    },
    render: function () {
        var formatMessage = this.props.intl.formatMessage;
        return (
            <Box title={formatMessage({id: 'welcome.welcomeToScratch', defaultMessage: 'Welcome to Scratch!'})}
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
                            <FormattedMessage
                                id="welcome.learn"
                                defaultMessage="Learn how to make a project in Scratch" />
                        </a>
                    </h4>
                    <a href="/projects/editor/?tip_bar=getStarted">
                        <img src="/images/welcome-learn.png" alt="Get Started" />
                    </a>
                </div>
                <div className="welcome-col green">
                    <h4>
                        <a href="/starter_projects/">
                            <FormattedMessage
                                id="welcome.tryOut"
                                defaultMessage="Try out starter projects" />
                        </a>
                    </h4>
                    <a href="/starter_projects/">
                        <img src="/images/welcome-try.png" alt="Starter Projects" />
                    </a>
                </div>
                <div className="welcome-col pink">
                    <h4>
                        <a href="/studios/146521/">
                            <FormattedMessage
                                id="welcome.connect"
                                defaultMessage="Connect with other Scratchers" />
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

module.exports = injectIntl(Welcome);
