var React = require('react');

var Box = require('../box/box.jsx');

require('./welcome.scss');

var Welcome = React.createClass({
    type: 'Welcome',
    propTypes: {
        onDismiss: React.PropTypes.func
    },
    render: function () {
        return (
            <Box title="Welcome to Scratch!"
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
                            Learn how to make a project in Scratch
                        </a>
                    </h4>
                    <a href="/projects/editor/?tip_bar=getStarted">
                        <img src="/images/welcome-learn.png" />
                    </a>
                </div>
                <div className="welcome-col green">
                    <h4>
                        <a href="/starter_projects/">
                            Try out starter projects
                        </a>
                    </h4>
                    <a href="/starter_projects/">
                        <img src="/images/welcome-try.png" />
                    </a>
                </div>
                <div className="welcome-col pink">
                    <h4>
                        <a href="/studios/146521/">
                            Connect with other Scratchers
                        </a>
                    </h4>
                    <a href="/studios/146521/">
                        <img src="/images/welcome-connect.png" />
                    </a>
                </div>
            </Box>
        );
    }
});

module.exports = Welcome;
