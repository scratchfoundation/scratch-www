var classNames = require('classnames');
var React = require('react');
var TitleBanner = require('../../components/title-banner/title-banner.jsx');

require('./informationpage.scss');

/**
 * Container for a table of contents
 * alongside a long body of text
 */
var InformationPage = React.createClass({
    type: 'InformationPage',
    propTypes: {
        title: React.PropTypes.string.isRequired
    },
    render: function () {
        var classes = classNames(
            'info-outer',
            'inner',
            this.props.className
        );
        return (
            <div className="information-page">
                <TitleBanner className="masthead">
                    <div className="inner">
                        <h1>{this.props.title}</h1>
                    </div>
                </TitleBanner>
                <div className={classes}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = InformationPage;
