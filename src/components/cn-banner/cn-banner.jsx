var classNames = require('classnames');
var React = require('react');

var TitleBanner = require('../title-banner/title-banner.jsx');
var Button = require('../forms/button.jsx');
var FlexRow = require('../flex-row/flex-row.jsx');

require('./cn-banner.scss');

/**
 * Homepage banner for Cartoon Network collaboration
 */
var CNBanner = React.createClass({
    type: 'CNBanner',
    render: function () {
        var classes = classNames(
            'cn-banner',
            this.props.className
        );
        return (
            <TitleBanner className={classes}>
                <FlexRow className="inner">
                    <div className="cta">
                        <h1>Make It Fly</h1>
                        <p>
                            With Scratch, you can program anything to fly. Animate the Scratch Cat, a cartoon character,
                            or even a taco!
                        </p>
                        <div className="button-row">
                            <a><Button>See examples</Button></a>
                            <a><Button>Make your own</Button></a>
                        </div>
                    </div>
                    <div className="flying">
                        <img src="/svgs/flying.svg" alt="" />
                    </div>
                </FlexRow>
            </TitleBanner>
        );
    }
});

module.exports = CNBanner;
