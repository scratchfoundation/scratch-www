const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

const TitleBanner = require('../../components/title-banner/title-banner.jsx');

require('./informationpage.scss');

/*
 * Container for a table of contents
 * alongside a long body of text
 */
const InformationPage = props => (
    <div className="information-page">
        <TitleBanner className="masthead">
            <div className="inner">
                <h1 className="title-banner-h1">
                    {props.title}
                </h1>
            </div>
        </TitleBanner>
        <div className={classNames('info-outer', 'inner', props.className)}>
            {props.children}
        </div>
    </div>
);

InformationPage.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    title: PropTypes.string.isRequired
};

module.exports = InformationPage;
