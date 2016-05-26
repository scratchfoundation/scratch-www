var classNames = require('classnames');
var FormattedMessage = require('react-intl').FormattedMessage;
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
                        <h1>
                            <FormattedMessage id='cnbanner.makeItFly' />
                        </h1>
                        <p>
                            <FormattedMessage id='cnbanner.flyDescription' />
                        </p>
                        <div className="button-row">
                            <a href="/studios/2050750/">
                                <Button>
                                    <FormattedMessage id='cnbanner.seeExamples' />
                                </Button>
                            </a>
                            <a href="/fly/">
                                <Button>
                                    <FormattedMessage id='cnbanner.makeYourOwn' />
                                </Button>
                            </a>
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
