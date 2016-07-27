var connect = require('react-redux').connect;
var defaults = require('lodash.defaultsdeep');
var React = require('react');
var render = require('../../lib/render.jsx');

var sessionStatus = require('../../redux/session').Status;
var api = require('../../lib/api');
var intl = require('../../lib/intl.jsx');
var log = require('../../lib/log.js');

var Deck = require('../../components/deck/deck.jsx');
var Progression = require('../../components/progression/progression.jsx');
var Spinner = require('../../components/spinner/spinner.jsx');
var Steps = require('../../components/registration/steps.jsx');

require('./studentcompleteregistration.scss');

var StudentCompleteRegistration = intl.injectIntl(React.createClass({
    type: 'StudentCompleteRegistration',
    getInitialState: function () {
        return {
            classroom: null,
            formData: {},
            registrationErrors: null,
            step: 0,
            waiting: false
        };
    },
    advanceStep: function (formData) {
        formData = formData || {};
        this.setState({
            step: this.state.step + 1,
            formData: defaults({}, formData, this.state.formData)
        });
    },
    componentDidUpdate: function (prevProps) {
        if (prevProps.session.session !== this.props.session.session &&
            this.props.session.session.permissions &&
            this.props.session.session.permissions.student) {
            var classroomId = this.props.session.session.user.classroomId;
            this.setState({waiting: true});
            api({
                uri: '/classrooms/' + classroomId
            }, function (err, body, res) {
                this.setState({waiting: false});
                if (err || res.statusCode !== 200) {
                    return this.setState({
                        registrationErrors: {
                            __all__: this.props.intl.formatMessage({id: 'studentRegistration.classroomApiGeneralError'})
                        }
                    });
                }
                this.setState({classroom: body});
            }.bind(this));
        }
    },
    handleLogOut: function (e) {
        e.preventDefault();
        api({
            host: '',
            method: 'post',
            uri: '/accounts/logout/',
            useCsrf: true
        }, function (err) {
            if (err) return log.error(err);
            window.location = '/';
        }.bind(this));
    },
    register: function (formData) {
        this.setState({waiting: true});
        formData = defaults({}, formData || {}, this.state.formData);
        var submittedData = {
            birth_month: formData.user.birth.month,
            birth_year: formData.user.birth.year,
            gender: (
                formData.user.gender === 'other' ?
                formData.user.genderOther :
                formData.user.gender
            ),
            country: formData.user.country,
            is_robot: formData.user.isRobot
        };
        if (this.props.session.session.flags.must_reset_password) {
            submittedData.password = formData.user.password;
        }
        api({
            host: '',
            uri: '/classes/student_update_registration/',
            method: 'post',
            useCsrf: true,
            formData: submittedData
        }, function (err, body) {
            this.setState({waiting: false});
            if (err) return this.setState({registrationError: err});
            if (body.success) return this.advanceStep(formData);
            this.setState({registrationErrors: body.errors});
        }.bind(this));
    },
    goToClass: function () {
        window.location = '/classes/' + this.state.classroom.id + '/';
    },
    render: function () {
        var demographicsDescription = this.props.intl.formatMessage({
            id: 'registration.studentPersonalStepDescription'});
        var registrationErrors = this.state.registrationErrors;
        if (this.props.session.status === sessionStatus.FETCHED && !(
                this.props.session.session.permissions &&
                this.props.session.session.permissions.student &&
                this.props.session.session.flags.must_complete_registration)
        ) {
            registrationErrors = {
                __all__: this.props.intl.formatMessage({id: 'registration.mustBeNewStudent'})
            };
        }
        return (
            <Deck className="student-registration">
                {registrationErrors ? (
                    <Steps.RegistrationError>
                        <ul>
                            {Object.keys(registrationErrors).map(function (field) {
                                var label = field + ': ';
                                if (field === '__all__') {
                                    label = '';
                                }
                                return (<li>{label}{registrationErrors[field]}</li>);
                            })}
                        </ul>
                    </Steps.RegistrationError>
                ) : (
                    this.state.waiting || !this.state.classroom ? (
                        <Spinner />
                    ) : (
                        <Progression {... this.state}>
                            <Steps.ClassInviteStep classroom={this.state.classroom}
                                                   onHandleLogOut={this.handleLogOut}
                                                   onNextStep={this.advanceStep}
                                                   studentUsername={this.props.session.session.user.username}
                                                   waiting={this.state.waiting} />
                            {this.props.session.session.flags.must_reset_password ?
                                <Steps.ChoosePasswordStep onNextStep={this.advanceStep}
                                                          showPassword={true}
                                                          waiting={this.state.waiting} />
                            :
                                []
                            }
                            <Steps.DemographicsStep description={demographicsDescription}
                                                    onNextStep={this.register}
                                                    waiting={this.state.waiting} />
                            <Steps.ClassWelcomeStep classroom={this.state.classroom}
                                                    onNextStep={this.goToClass}
                                                    waiting={this.state.waiting} />
                        </Progression>
                    )
                )}
            </Deck>
        );
    }
}));

var mapStateToProps = function (state) {
    return {
        session: state.session
    };
};

var ConnectedStudentCompleteRegistration = connect(mapStateToProps)(StudentCompleteRegistration);

render(<ConnectedStudentCompleteRegistration />, document.getElementById('app'));
