const React = require('react');

const injectIntl = require('react-intl').injectIntl;

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Button = require('../../components/forms/button.jsx');

require('./ev3.scss');

const EV3 = () => (
    <div className="ev3">
        <FlexRow className="extension-header">
            <FlexRow className="column extension-info">
                <FlexRow className="column extension-copy">
                    <h2>Lego Mindstorms EV3</h2>
                    <span>
                        The LEGO® Mindstorms EV3 is an invention kit with motors and sensors
                        you can use to build interactive robotic creations.
                        Connecting it to Scratch expands the possibilities:
                        build a robotic puppet and tell stories,
                        make your own musical instruments and game controllers,
                        or whatever else you can imagine.
                    </span>
                </FlexRow>
                <FlexRow className="column extension-requirements-container">
                    <span>Requirements</span>
                    <FlexRow className="extension-requirements">
                        <span>Windows 10+</span>
                        <span>macOS 10.11+</span>
                        <span>Bluetooth</span>
                        <span>ScratchLink</span>
                    </FlexRow>
                </FlexRow>
            </FlexRow>
            <img
                className="extension-image"
                src="/images/ev3/ev3-illustration.png"
            />
        </FlexRow>
        <FlexRow className="os-chooser">
            <span>Choose your OS</span>
            <Button>Windows</Button>
            <Button className="active">macOS</Button>
        </FlexRow>
        <FlexRow className="column blue install-scratch-link">
            <h2>Install Scratch Link</h2>
            <FlexRow className="steps" />
        </FlexRow>
        <FlexRow className="column getting-started">
            <h2>Getting Started</h2>
            <FlexRow className="column connecting-ev3">
                <h3>Connecting EV3 to Scratch</h3>
                <FlexRow className="steps">
                    <div className="step">
                        <div className="step-top-row">
                            <div className="step-number">1</div>
                        </div>
                        <div className="step-content" />
                    </div>
                </FlexRow>
                <div className="tip-box">
                    <h4>First time connecting your EV3?</h4>
                    <FlexRow />
                </div>
            </FlexRow>
        </FlexRow>
        <FlexRow className="column blue things-to-try">
            <h2>Things to Try</h2>
        </FlexRow>
        <FlexRow className="faq">
            <div className="faq-content">
                <h2>FAQ / Troubleshooting</h2>
            </div>
            <div className="faq-links" />
        </FlexRow>
    </div>
);

const WrappedEV3 = injectIntl(EV3);

render(<Page><WrappedEV3 /></Page>, document.getElementById('app'));
