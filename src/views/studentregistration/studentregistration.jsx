const bindAll = require('lodash.bindall');
const defaults = require('lodash.defaultsdeep');
const PropTypes = require('prop-types');
const React = require('react');

const api = require('../../lib/api');
const injectIntl = require('../../lib/intl.jsx').injectIntl;
const intlShape = require('../../lib/intl.jsx').intlShape;
const route = require('../../lib/route');

const Deck = require('../../components/deck/deck.jsx');
const Progression = require('../../components/progression/progression.jsx');
const Steps = require('../../components/registration/steps.jsx');

const render = require('../../lib/render.jsx');

require('./studentregistration.scss');

class StudentRegistration extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleRegister',
            'handleAdvanceStep',
            'handleGoToClass'
        ]);
        this.state = {
            formData: {},
            registrationError: null,
            step: 0,
            waiting: false
        };
    }
    componentDidMount () {
        this.setState({waiting: true}); // eslint-disable-line react/no-did-mount-set-state

        api({
            uri: `/classtoken/${this.props.classroomToken}`
        }, (err, body, res) => {
            this.setState({waiting: false});
            if (err) {
                return this.setState({
                    registrationError: this.props.intl.formatMessage({
                        id: 'registration.classroomApiGeneralError'
                    })
                });
            }
            if (res.statusCode >= 400) {
                // TODO: Use react-router for this
                window.location = '/404';
            }
            this.setState({
                classroom: body
            });
        });
    }
    handleRegister (formData) {
        this.setState({
            waiting: true
        });
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
                gender: (formData.user.gender === 'other' ?
                    formData.user.genderOther :
                    formData.user.gender
                ),
                country: formData.user.country,
                is_robot: formData.user.isRobot,
                classroom_id: this.state.classroom.id,
                classroom_token: this.props.classroomToken
            }
        }, (err, body, res) => {
            this.setState({
                waiting: false
            });
            if (err) return this.setState({registrationError: err});
            if (res.statusCode === 500) return this.setState({registrationError: err});
            if (body[0] && body[0].success) return this.handleAdvanceStep(formData);
            this.setState({
                registrationError:
                    (body[0] && body[0].msg) ||
                    `${this.props.intl.formatMessage({id: 'registration.generalError'})} (${res.statusCode})`
            });
        });
    }
    handleAdvanceStep (formData) {
        formData = formData || {};
        this.setState({
            step: this.state.step + 1,
            formData: defaults({}, formData, this.state.formData)
        });
    }
    handleGoToClass () {
        window.location = `/classes/${this.state.classroom.id}/`;
    }
    render () {
        const usernameDescription = this.props.intl.formatMessage({id: 'registration.studentUsernameStepDescription'});
        const usernameHelp = this.props.intl.formatMessage({id: 'registration.studentUsernameStepHelpText'});
        return (
            <Deck className="student-registration">
                {this.state.registrationError ?
                    <Steps.RegistrationError>
                        {this.state.registrationError}
                    </Steps.RegistrationError> :
                    <Progression step={this.state.step}>
                        <Steps.ClassInviteNewStudentStep
                            classroom={this.state.classroom}
                            waiting={this.state.waiting || !this.state.classroom}
                            onNextStep={this.handleAdvanceStep}
                        />
                        <Steps.UsernameStep
                            description={`${usernameDescription} ${usernameHelp}`}
                            title={this.props.intl.formatMessage({
                                id: 'registration.usernameStepTitleScratcher'
                            })}
                            tooltip={this.props.intl.formatMessage({
                                id: 'registration.studentUsernameStepTooltip'
                            })}
                            usernameHelp={this.props.intl.formatMessage({
                                id: 'registration.studentUsernameSuggestion'
                            })}
                            waiting={this.state.waiting}
                            onNextStep={this.handleAdvanceStep}
                        />
                        <Steps.DemographicsStep
                            countryName={this.state.classroom && this.state.classroom.educator &&
                                this.state.classroom.educator.profile && this.state.classroom.educator.profile.country}
                            description={this.props.intl.formatMessage({
                                id: 'registration.studentPersonalStepDescription'
                            })}
                            waiting={this.state.waiting}
                            onNextStep={this.handleRegister}
                        />
                        <Steps.ClassWelcomeStep
                            classroom={this.state.classroom}
                            waiting={this.state.waiting || !this.state.classroom}
                            onNextStep={this.handleGoToClass}
                        />
                    </Progression>
                }
            </Deck>
        );
    }
}

StudentRegistration.propTypes = {
    classroomToken: PropTypes.string.isRequired,
    intl: intlShape
};

StudentRegistration.defaultProps = {
    classroomToken: null
};

const IntlStudentRegistration = injectIntl(StudentRegistration);

// parse either format of student registration url:
// "class register": http://scratch.mit.edu/classes/3/register/c0256654e1be
// "signup token": http://scratch.mit.edu/signup/c025r54ebe
const props = {classroomToken: route.getURIClassroomToken(document.location.pathname)};

render(<IntlStudentRegistration {...props} />, document.getElementById('app'));
