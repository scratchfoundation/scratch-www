import classNames from 'classnames';
import {connect} from 'react-redux';
import React from 'react';

import sessionActions from '../../redux/session.js';

import TitleBanner from '../title-banner/title-banner.jsx';
import Button from '../forms/button.jsx';
import FlexRow from '../flex-row/flex-row.jsx';

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
                                <h3 key="greeting">
                                    {this.props.messages['teacherbanner.greeting']},{' '}
                                    {this.props.session.session.user.username}
                                </h3>,
                                <p
                                    key="subgreeting"
                                    className="title-banner-p"
                                >
                                    {this.props.messages['teacherbanner.subgreeting']}
                                </p>
                            ] : []
                        ): []}
                    </div>
                    <FlexRow className="quick-links">
                        {this.props.session.status === sessionActions.Status.FETCHED ? (
                            this.props.session.session.user ? [
                                <a href="/educators/classes" key="classes-button">
                                    <Button>
                                        {this.props.messages['teacherbanner.classesButton']}
                                    </Button>
                                </a>,
                                <a href="/info/educators" key="resources-button">
                                    <Button>
                                        {this.props.messages['teacherbanner.resourcesButton']}
                                    </Button>
                                </a>,
                                <a href="/educators/faq" key="faq-button">
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

var mapStateToProps = function (state) {
    return {
        session: state.session
    };
};

var ConnectedTeacherBanner = connect(mapStateToProps)(TeacherBanner);

export default ConnectedTeacherBanner;
