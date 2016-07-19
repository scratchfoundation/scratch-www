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
        api({
            uri: '/classrooms/' + this.props.classroomId + '/' + this.props.classroomToken
        }, function (err, body, res) {
            if (err) {
                return this.setState({
                    registrationError: this.props.intl.formatMessage({
                        id: 'studentRegistration.classroomApiGeneralError',
                        defaultMessage: 'Sorry, we could not find the registration information for this class'
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
        }, function (err, res) {
            this.setState({waiting: false});
            if (err) return this.setState({registrationError: err});
            if (res[0].success) return this.advanceStep(formData);
            this.setState({registrationError: res[0].msg});
        }.bind(this));
    },
    goToClass: function () {
        window.location = '/classes/' + this.props.classroomId + '/';
    },
    render: function () {
        return (
            <Deck className="student-registration">
                {this.state.registrationError ?
                    <Steps.RegistrationError {... this.state} />
                :
                    <Progression {... this.state}>
                        <Steps.ClassInviteStep classroom={this.state.classroom}
                                               messages={this.props.messages}
                                               onNextStep={this.advanceStep}
                                               waiting={this.state.waiting} />
                        <Steps.UsernameStep onNextStep={this.advanceStep}
                                            waiting={this.state.waiting} />
                        <Steps.DemographicsStep onNextStep={this.register}
                                                waiting={this.state.waiting} />
                        <Steps.ClassWelcomeStep classroom={this.state.classroom}
                                                messages={this.props.messages}
                                                onNextStep={this.goToClass}
                                                waiting={this.state.waiting} />
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
