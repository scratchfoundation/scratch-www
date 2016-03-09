var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
var FormattedMessage = require('react-intl').FormattedMessage;
var React = require('react');
var render = require('../../lib/render.jsx');

require('./wedo2.scss');

var Wedo2 = React.createClass({
    type: 'wedo2',
    render: function () {
        return (
            <div>
                <div className="top-banner">
                    <div className="inner">
                        <div className="columns2">
                            <div className="banner-text">
                                <h2>LEGO WeDo 2.0 & Scratch</h2>
                                <p className="intro">
                                    <FormattedMessage
                                        id='wedo2.intro'
                                        defaultMessage={
                                            'The LEGO® Education WeDo 2.0 is an introductory invention kit ' +
                                            'can use to build your own interactive machines. You can snap together ' +
                                            'Scratch programming blocks to interact with your LEGO WeDo creations ' +
                                            'and add animations on the screen.'
                                        } />
                                </p>
                            </div>
                            <div className="banner-photo">
                                <img src="/images/wedo/wedo-milo.png" />
                            </div>
                        </div>
                     </div>
                </div>

                <div className="inner">
                    <section id="getting-started">
                        <h3>
                            <FormattedMessage
                                id='wedo2.getStarted'
                                defaultMessage={'Getting Started with LEGO WeDo 2.0'} />
                        </h3>
                        <p className="callout">
                            <FormattedMessage
                                id='wedo2.requirement'
                                defaultMessage={
                                'The LEGO WeDo 2.0 extension is currently only available for Mac OSX. ' +
                                'We plan to release a Windows version later in 2016.'
                                } />
                        </p>
                        <div className="columns3">
                            <div className="column">
                                <img src="/images/wedo/download-device-manager.png" />
                                <h4>
                                    <FormattedMessage
                                        id='wedo2.installTitle'
                                        defaultMessage={
                                            '1. Install Device Manager'
                                        } />
                                </h4>
                                <p>
                                    The Device Manager lets you connect WeDo 2.0 to Scratch using
                                    Bluetooth <a href="#">Download Here</a>
                                </p>
                            </div>
                            <div className="column">
                                <img src="/images/wedo/set-up.png" />
                                <h4>
                                    <FormattedHTMLMessage
                                        id='wedo2.setupTitle'
                                        defaultMessage={
                                            '2. Setup &amp; Help'
                                        } />
                                </h4>
                                <p>
                                    Connect your WeDo 2.0 by following the steps
                                    in the <a href="#">Tips Window</a>
                                </p>
                            </div>
                            <div className="column">
                                <img src="/images/wedo/create-and-share.png" />
                                <h4>
                                    <FormattedMessage
                                        id='wedo2.createTitle'
                                        defaultMessage={
                                            '3. Create'
                                        } />
                                </h4>
                                <p>
                                    <FormattedMessage
                                        id='wedo2.createText'
                                        defaultMessage={
                                            'Use the WeDo extension blocks to turn on lights, control motors, ' +
                                            'and make your project interactive'
                                        } />
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="banner">
                    <div className="inner" id="starter-projects">
                        <h3>
                            <FormattedMessage
                                id='wedo2.starterProjects'
                                defaultMessage={
                                    'WeDo 2.0 Starter Projects'
                                } />
                        </h3>
                        <div className="project-list">
                            <a href="#">
                                <div className="project-card">
                                    <img src="/images/wedo/motor.png" alt="" />
                                    <p>
                                        <FormattedMessage
                                            id='wedo2.starterMotor'
                                            defaultMessage={
                                                'Motor'
                                            } />
                                    </p>
                                </div>
                            </a>
                            <a href="#">
                                <div className="project-card">
                                    <img src="/images/wedo/distance.png" alt="" />
                                    <p>
                                        <FormattedMessage
                                            id='wedo2.starterDistance'
                                            defaultMessage={
                                                'Distance Sensor'
                                            } />
                                    </p>
                                </div>
                            </a>
                            <a href="#">
                                <div className="project-card">
                                    <img src="/images/wedo/tilt.png" alt="" />
                                    <p>
                                        <FormattedMessage
                                            id='wedo2.starterTilt'
                                            defaultMessage={
                                                'Tilt Sensor'
                                            } />
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="inner">
                    <section>
                        <h3>
                            <FormattedMessage
                                id='wedo2.versionTitle'
                                defaultMessage={
                                    'Which version do you have?'
                                } />
                        </h3>
                        <p>
                            <FormattedMessage
                                id='wedo2.versionText'
                                defaultMessage={
                                    'You can also use Scratch to program the original LEGO WeDo (LEGO WeDo 1.0).'
                                } />
                        </p>
                        <div className="device-card">
                            <h4>LEGO WeDo 1.0 Hub</h4>
                            <img src="/images/wedo/wedo1.png" alt="LEGO WeDo 1.0 Hub" />
                            <a href="#">
                                <FormattedMessage
                                id='wedo1.setupInstructions'
                                defaultMessage={
                                    'Wedo 1.0 Setup Instructions'
                                } />
                            </a>
                        </div>
                        <div className="device-card">
                            <h4>LEGO WeDo 2.0 Hub</h4>
                            <img src="/images/wedo/wedo2.png" alt="LEGO WeDo 2.0 Hub" />
                            <a href="#">
                                <FormattedMessage
                                id='wedo2.setupInstructions'
                                defaultMessage={
                                    'Wedo 2.0 Setup Instructions'
                                } />
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
});

render(<Wedo2 />, document.getElementById('view'));
