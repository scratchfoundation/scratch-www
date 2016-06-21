var classNames = require('classnames');
var React = require('react');

var sessionActions = require('../../../../redux/session.js');

var TitleBanner = require('../../../../components/title-banner/title-banner.jsx');
var Button = require('../../../../components/forms/button.jsx');
var FlexRow = require('../../../../components/flex-row/flex-row.jsx');

require('./teacher-banner.scss');

var TeacherBanner = React.createClass({
    type: 'TeacherBanner',
    getDefaultProps: function () {
        return {
            messages: {
                'teacherbanner.greeting': 'Hi',
                'teacherbanner.subgreeting': 'Teacher Account',
                'teacherbanner.classesButton': 'My Classes',
                'teacherbanner.resourcesButton': 'Educator Resources',
                'teacherbanner.faqButton': 'Teacher Account FAQ'
            },
            session: {}
        };
    },
    render: function () {
        var classes = classNames(
            'teacher-banner',
            this.props.className
        );
        return (
            <TitleBanner className={classes}>
                <FlexRow className="inner">
                    <div className="welcome">
                        {this.props.session.status === sessionActions.Status.FETCHED ? (
                            this.props.session.session.user ? [
                                <h3>
                                    {this.props.messages['teacherbanner.greeting']},{' '}
                                    {this.props.session.session.user.username}
                                </h3>,
                                <p>
                                    {this.props.messages['teacherbanner.subgreeting']}
                                </p>
                            ] : []
                        ): []}
                    </div>
                    <FlexRow className="quick-links">
                        {this.props.session.status === sessionActions.Status.FETCHED ? (
                            this.props.session.session.user ? [
                                <a href="/educators/classes">
                                    <Button>
                                        {this.props.messages['teacherbanner.classesButton']}
                                    </Button>
                                </a>,
                                <a href="/info/educators">
                                    <Button>
                                        {this.props.messages['teacherbanner.resourcesButton']}
                                    </Button>
                                </a>,
                                <a href="/info/educators/faq">
                                    <Button>
                                        {this.props.messages['teacherbanner.faqButton']}
                                    </Button>
                                </a>
                            ] : []
                        ): []}
                    </FlexRow>
                </FlexRow>
            </TitleBanner>
        );
    }
});

module.exports = TeacherBanner;
