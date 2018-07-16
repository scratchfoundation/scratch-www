const React = require('react');

const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const EV3 = () => (
    <div className="ev3">
        <FlexRow className="extension-header">
            <FlexRow className="column extension-info">
                <FlexRow className="column extension-copy" />
                <FlexRow className="extension-requirements" />
            </FlexRow>
            <img className="extension-image" />
        </FlexRow>
        <FlexRow className="os-chooser" />
        <FlexRow className="column install-scratch-link">
            <h1>Install Scratch Link</h1>
            <FlexRow className="steps" />
        </FlexRow>
        <FlexRow className="getting-started" />
        <FlexRow className="things-to-try" />
        <FlexRow className="faq" />
    </div>
);

render(<Page><EV3 /></Page>, document.getElementById('app'));
