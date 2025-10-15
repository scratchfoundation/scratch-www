const classNames = require('classnames');
const connect = require('react-redux').connect;
const PropTypes = require('prop-types');
const React = require('react');

const sessionActions = require('../../redux/session.js');

const externalLinks = require('../../lib/external-links.js');
const TitleBanner = require('../title-banner/title-banner.jsx');
const Button = require('../forms/button.jsx');
const FlexRow = require('../flex-row/flex-row.jsx');

require('./teacher-banner.scss');

const TeacherBanner = ({
    className,
    messages = {
        'teacherbanner.greeting': 'Hi',
        'teacherbanner.subgreeting': 'Teacher Account',
        'teacherbanner.classesButton': 'My Classes',
        'teacherbanner.resourcesButton': 'Educator Resources'
    },
    sessionStatus,
    user = {}
}) => (
    <TitleBanner className={classNames('teacher-banner', className)}>
        <FlexRow className="inner">
            <div className="welcome">
                {sessionStatus === sessionActions.Status.FETCHED ? (
                    user ? [
                        <h3 key="greeting">
                            {messages['teacherbanner.greeting']},{' '}
                            {user.username}
                        </h3>,
                        <p
                            className="title-banner-p"
                            key="subgreeting"
                        >
                            {messages['teacherbanner.subgreeting']}
                        </p>
                    ] : []
                ) : []}
            </div>
            <FlexRow className="quick-links">
                {sessionStatus === sessionActions.Status.FETCHED ? (
                    user ? [
                        <a
                            href="/educators/classes"
                            key="classes-button"
                        >
                            <Button>
                                {messages['teacherbanner.classesButton']}
                            </Button>
                        </a>,
                        <a
                            href={externalLinks.scratchFoundation.forEducators}
                            key="resources-button"
                        >
                            <Button>
                                {messages['teacherbanner.resourcesButton']}
                            </Button>
                        </a>
                    ] : []
                ) : []}
            </FlexRow>
        </FlexRow>
    </TitleBanner>
);

TeacherBanner.propTypes = {
    className: PropTypes.string,
    messages: PropTypes.shape({
        'teacherbanner.greeting': PropTypes.string,
        'teacherbanner.subgreeting': PropTypes.string,
        'teacherbanner.classesButton': PropTypes.string,
        'teacherbanner.resourcesButton': PropTypes.string
    }),
    sessionStatus: PropTypes.string,
    user: PropTypes.shape({
        username: PropTypes.string
    })
};

const mapStateToProps = state => ({
    sessionStatus: state.session.status,
    user: state.session.session.user || {}
});

const ConnectedTeacherBanner = connect(mapStateToProps)(TeacherBanner);

module.exports = ConnectedTeacherBanner;
