var connect = require('react-redux').connect;
var defaults = require('lodash.defaultsdeep');
var React = require('react');
var render = require('../../lib/render.jsx');

var sessionStatus = require('../../redux/session').Status;
var api = require('../../lib/api');
var intl = require('../../lib/intl.jsx');

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
            registrationError: null,
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
            api({
                uri: '/classrooms/' + classroomId
            }, function (err, body, res) {
                if (err || res.statusCode === 404) {
                    return this.setState({
                        registrationError: this.props.intl.formatMessage({
                            id: 'studentRegistration.classroomApiGeneralError'
                        })
                    });
                }
                this.setState({classroom: body});
            }.bind(this));
        }
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
            this.setState({registrationError: (
                <ul>
                    {Object.keys(body.errors).map(function (field) {
                        var label = field + ': ';
                        if (field === '__all__') {
                            label = '';
                        }
                        return (<li>{label}{body.errors[field]}</li>);
                    })}
                </ul>
            )});
        }.bind(this));
    },
    goToClass: function () {
        window.location = '/classes/' + this.state.classroom.id + '/';
    },
    render: function () {
        var demographicsDescription = this.props.intl.formatMessage({
            id: 'registration.studentPersonalStepDescription'});
        var registrationError = this.state.registrationError;
        var sessionFetched = this.props.session.status === sessionStatus.FETCHED;
        if (sessionFetched &&
            !(this.props.session.session.permissions.student &&
              this.props.session.session.flags.must_complete_registration)) {
            registrationError = this.props.intl.formatMessage({id: 'registration.mustBeNewStudent'});
        }
        return (
            <Deck className="student-registration">
                {sessionFetched && this.state.classroom ?
                    (registrationError ?
                        <Steps.RegistrationError registrationError={registrationError} />
                    :
                        <Progression {... this.state}>
                            <Steps.ClassInviteStep classroom={this.state.classroom}
                                                   messages={this.props.messages}
                                                   onNextStep={this.advanceStep}
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
                :
                    <Spinner />
                }
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
