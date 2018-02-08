const classNames = require('classnames');
const connect = require('react-redux').connect;
const PropTypes = require('prop-types');
const React = require('react');

const Deck = require('../../components/deck/deck.jsx');
const TeacherApprovalStep = require('../../components/registration/steps.jsx').TeacherApprovalStep;

const render = require('../../lib/render.jsx');

require('./teacherwaitingroom.scss');

class TeacherWaitingRoom extends React.Component {
    componentWillReceiveProps (nextProps) {
        if (nextProps.approved) {
            window.location.href = '/educators/classes/';
        }
    }
    render () {
        return (
            <Deck className={classNames('teacher-waitingroom', this.props.className)}>
                <TeacherApprovalStep {...this.props} />
            </Deck>
        );
    }
}

TeacherWaitingRoom.propTypes = {
    approved: PropTypes.bool,
    className: PropTypes.string
};

const mapStateToProps = state => {
    const permissions = state.session.session.permissions || {};
    const user = state.session.session.user || {};
    return {
        approved: permissions && permissions.educator && !permissions.educator_invitee && permissions.social,
        confirmed: permissions && permissions.social,
        invited: permissions && permissions.educator_invitee,
        educator: permissions && permissions.educator,
        email: user && user.email
    };
};

const ConnectedTeacherWaitingRoom = connect(mapStateToProps)(TeacherWaitingRoom);

render(<ConnectedTeacherWaitingRoom />, document.getElementById('app'));
