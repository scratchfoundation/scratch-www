import classNames from 'classnames';
import {connect} from 'react-redux';
import React from 'react';
import render from '../../lib/render.jsx';

import Deck from '../../components/deck/deck.jsx';
import {TeacherApprovalStep} from '../../components/registration/steps.jsx';

require('./teacherwaitingroom.scss');

var TeacherWaitingRoom = React.createClass({
    displayName: 'TeacherWaitingRoom',
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.approved) {
            window.location.href = '/educators/classes/';
        }
    },
    render: function () {
        return (
            <Deck className={classNames('teacher-waitingroom', this.props.className)}>
                <TeacherApprovalStep {... this.props} />
            </Deck>
        );
    }
});

var mapStateToProps = function (state) {
    var permissions = state.session.session.permissions || {};
    var user = state.session.session.user || {};
    return {
        approved: permissions && permissions.educator && !permissions.educator_invitee && permissions.social,
        confirmed: permissions && permissions.social,
        invited: permissions && permissions.educator_invitee,
        educator: permissions && permissions.educator,
        email: user && user.email
    };
};

var ConnectedTeacherWaitingRoom = connect(mapStateToProps)(TeacherWaitingRoom);

render(<ConnectedTeacherWaitingRoom />, document.getElementById('app'));
