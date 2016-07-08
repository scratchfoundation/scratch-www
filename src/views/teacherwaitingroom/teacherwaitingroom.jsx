var classNames = require('classnames');
var connect = require('react-redux').connect;
var React = require('react');
var render = require('../../lib/render.jsx');

var Deck = require ('../../components/deck/deck.jsx');
var TeacherApprovalStep = require('../../components/registration/steps.jsx').TeacherApprovalStep;

require('./teacherwaitingroom.scss');

var TeacherWaitingRoom = React.createClass({
    displayName: 'TeacherWaitingRoom',
    render: function () {
        var permissions = this.props.session.permissions || {};
        var user = this.props.session.user || {};
        return (
            <Deck className={classNames('teacher-waitingroom', this.props.className)}>
                <TeacherApprovalStep confirmed={permissions.social}
                                     invited={permissions.educator_invitee}
                                     educator={permissions.educator}
                                     email={user.email} />
            </Deck>
        );
    }
});

var mapStateToProps = function (state) {
    return {
        session: state.session.session
    };
};

var ConnectedTeacherWaitingRoom = connect(mapStateToProps)(TeacherWaitingRoom);

render(<ConnectedTeacherWaitingRoom />, document.getElementById('app'));
