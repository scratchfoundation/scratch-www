var defaults = require('lodash.defaultsdeep');
var React = require('react');
var render = require('../../lib/render.jsx');

var api = require('../../lib/api');
var intl = require('../../lib/intl.jsx');

var Deck = require('../../components/deck/deck.jsx');
var Progression = require('../../components/progression/progression.jsx');
var Steps = require('../../components/registration/steps.jsx');

require('./studentregistration.scss');

var StudentRegistration = intl.injectIntl(React.createClass({
    type: 'StudentRegistration',
    getDefaultProps: function () {
        return {
            classroomId: null,
            classroomToken: null
        };
    },
    getInitialState: function () {
        return {
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
    componentDidMount: function () {
        this.setState({waiting: true});
        api({
            uri: '/classrooms/' + this.props.classroomId,
            params: {token: this.props.classroomToken}
        }, function (err, body, res) {
            this.setState({waiting: false});
            if (err) {
                return this.setState({
                    registrationError: this.props.intl.formatMessage({
                        id: 'registration.classroomApiGeneralError'
                    })
                });
            }
            if (res.statusCode === 404) {
                // TODO: Use react-router for this
                return window.location = '/404';
            }
            this.setState({classroom: body});
        }.bind(this));
    },
    register: function (formData) {
        this.setState({waiting: true});
        formData = defaults({}, formData || {}, this.state.formData);
        api({
            host: '',
            uri: '/classes/register_new_student/',
            method: 'post',
            useCsrf: true,
            formData: {
                username: formData.user.username,
                password: formData.user.password,
                birth_month: formData.user.birth.month,
                birth_year: formData.user.birth.year,
                gender: (
                    formData.user.gender === 'other' ?
                    formData.user.genderOther :
                    formData.user.gender
                ),
                country: formData.user.country,
                is_robot: formData.user.isRobot,
                classroom_id: this.props.classroomId,
                classroom_token: this.props.classroomToken
            }
        }, function (err, body, res) {
            this.setState({waiting: false});
            if (err) return this.setState({registrationError: err});
            if (body[0] && body[0].success) return this.advanceStep(formData);
            this.setState({
                registrationError:
                    (body[0] && body[0].msg) ||
                    this.props.intl.formatMessage({id: 'registration.generalError'}) + ' (' + res.statusCode + ')'
            });
        }.bind(this));
    },
    goToClass: function () {
        window.location = '/classes/' + this.props.classroomId + '/';
    },
    render: function () {
        var demographicsDescription = this.props.intl.formatMessage({
            id: 'registration.studentPersonalStepDescription'});
        var usernameTitle = this.props.intl.formatMessage({id: 'registration.studentUsernameStepTitle'});
        var usernameHelp = this.props.intl.formatMessage({id: 'registration.studentUsernameFieldHelpText'});
        var usernameDescription = (
            this.props.intl.formatMessage({id: 'registration.studentUsernameStepDescription'}) + ' ' +
            this.props.intl.formatMessage({id: 'registration.studentUsernameStepHelpText'})
        );
        var usernameTooltip = this.props.intl.formatMessage({id: 'registration.studentUsernameStepTooltip'});
        return (
            <Deck className="student-registration">
                {this.state.registrationError ?
                    <Steps.RegistrationError>
                        {this.state.registrationError}
                    </Steps.RegistrationError>
                :
                    <Progression {... this.state}>
                        <Steps.ClassInviteNewStudentStep classroom={this.state.classroom}
                                                         onNextStep={this.advanceStep}
                                                         waiting={this.state.waiting || !this.state.classroom} />
                        <Steps.UsernameStep onNextStep={this.advanceStep}
                                            title={usernameTitle}
                                            description={usernameDescription}
                                            tooltip={usernameTooltip}
                                            usernameHelp={usernameHelp}
                                            waiting={this.state.waiting} />
                        <Steps.DemographicsStep description={demographicsDescription}
                                                onNextStep={this.register}
                                                waiting={this.state.waiting} />
                        <Steps.ClassWelcomeStep classroom={this.state.classroom}
                                                onNextStep={this.goToClass}
                                                waiting={this.state.waiting || !this.state.classroom} />
                    </Progression>
                }
            </Deck>
        );
    }
}));

var [classroomId, _, classroomToken] = document.location.pathname.split('/')
    .filter(function (p) {
        if (p) return p;
    })
    .slice(-3);

var props = {classroomId, classroomToken};

render(<StudentRegistration {... props} />, document.getElementById('app'));
