const classNames = require('classnames');
const connect = require('react-redux').connect;
const PropTypes = require('prop-types');
const React = require('react');

const sessionActions = require('../../redux/session.js');

const TitleBanner = require('../title-banner/title-banner.jsx');
const Button = require('../forms/button.jsx');
const FlexRow = require('../flex-row/flex-row.jsx');

require('./teacher-banner.scss');

const TeacherBanner = props => (
    <TitleBanner className={classNames('teacher-banner', props.className)}>
        <FlexRow className="inner">
            <div className="welcome">
                {props.sessionStatus === sessionActions.Status.FETCHED ? (
                    props.user ? [
                        <h3 key="greeting">
                            {props.messages['teacherbanner.greeting']},{' '}
                            {props.user.username}
                        </h3>,
                        <p
                            className="title-banner-p"
                            key="subgreeting"
                        >
                            {props.messages['teacherbanner.subgreeting']}
                        </p>
                    ] : []
                ) : []}
            </div>
            <FlexRow className="quick-links">
                {props.sessionStatus === sessionActions.Status.FETCHED ? (
                    props.user ? [
                        <a
                            href="/educators/classes"
                            key="classes-button"
                        >
                            <Button>
                                {props.messages['teacherbanner.classesButton']}
                            </Button>
                        </a>,
                        <a
                            href="/info/educators"
                            key="resources-button"
                        >
                            <Button>
                                {props.messages['teacherbanner.resourcesButton']}
                            </Button>
                        </a>,
                        <a
                            href="/educators/faq"
                            key="faq-button"
                        >
                            <Button>
                                {props.messages['teacherbanner.faqButton']}
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
        'teacherbanner.resourcesButton': PropTypes.string,
        'teacherbanner.faqButton': PropTypes.string
    }),
    sessionStatus: PropTypes.string,
    user: PropTypes.shape({
        username: PropTypes.string
    })
};

TeacherBanner.defaultProps = {
    messages: {
        'teacherbanner.greeting': 'Hi',
        'teacherbanner.subgreeting': 'Teacher Account',
        'teacherbanner.classesButton': 'My Classes',
        'teacherbanner.resourcesButton': 'Educator Resources',
        'teacherbanner.faqButton': 'Teacher Account FAQ'
    },
    user: {}
};

const mapStateToProps = state => ({
    sessionStatus: state.session.status,
    user: state.session.session.user
});

const ConnectedTeacherBanner = connect(mapStateToProps)(TeacherBanner);

module.exports = ConnectedTeacherBanner;
