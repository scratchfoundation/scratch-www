const bindAll = require('lodash.bindall');
const connect = require('react-redux').connect;
const defaults = require('lodash.defaultsdeep');
const PropTypes = require('prop-types');
const React = require('react');

const api = require('../../lib/api');
const injectIntl = require('../../lib/intl.jsx').injectIntl;
const intlShape = require('../../lib/intl.jsx').intlShape;
const sessionStatus = require('../../redux/session').Status;
const navigationActions = require('../../redux/navigation.js');

const Deck = require('../../components/deck/deck.jsx');
const Progression = require('../../components/progression/progression.jsx');
const Spinner = require('../../components/spinner/spinner.jsx');
const Steps = require('../../components/registration/steps.jsx');

const render = require('../../lib/render.jsx');

require('./studentcompleteregistration.scss');

class StudentCompleteRegistration extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleAdvanceStep',
            'handleRegister',
            'handleGoToClass'
        ]);
        this.state = {
            classroom: null,
            formData: {},
            registrationErrors: null,
            step: 0,
            waiting: false
        };
    }
    componentDidUpdate (prevProps) {
        if (prevProps.studentUsername !== this.props.studentUsername && this.props.newStudent) {
            this.setState({waiting: true}); // eslint-disable-line react/no-did-update-set-state
            api({
                uri: `/classrooms/${this.props.classroomId}`
            }, (err, body, res) => {
                this.setState({waiting: false});
                if (err || res.statusCode !== 200) {
                    return this.setState({
                        registrationErrors: {
                            __all__: this.props.intl.formatMessage({id: 'registration.classroomApiGeneralError'})
                        }
                    });
                }
                this.setState({classroom: body});
            });
        }
    }
    handleAdvanceStep (formData) {
        formData = formData || {};
        this.setState({
            step: this.state.step + 1,
            formData: defaults({}, formData, this.state.formData)
        });
    }
    handleRegister (formData) {
        this.setState({waiting: true});

        formData = defaults({}, formData || {}, this.state.formData);
        const submittedData = {
            birth_month: formData.user.birth.month,
            birth_year: formData.user.birth.year,
            gender: (formData.user.gender === 'other' ? formData.user.genderOther : formData.user.gender),
            country: formData.user.country,
            is_robot: formData.user.isRobot
        };
        if (this.props.must_reset_password) {
            submittedData.password = formData.user.password;
        }

        api({
            host: '',
            uri: '/classes/student_update_registration/',
            method: 'post',
            useCsrf: true,
            formData: submittedData
        }, (err, body, res) => {
            this.setState({waiting: false});
            if (err) return this.setState({registrationError: err});
            if (body.success) return this.handleAdvanceStep(formData);
            this.setState({
                registrationErrors: body.errors || {
                    __all__:
                        `${this.props.intl.formatMessage({id: 'registration.generalError'})} (${res.statusCode})`
                }
            });
        });
    }
    handleGoToClass () {
        window.location = `/classes/${this.state.classroom.id}/`;
    }
    render () {
        const demographicsDescription = this.props.intl.formatMessage({
            id: 'registration.studentPersonalStepDescription'
        });
        let registrationErrors = this.state.registrationErrors;
        if (!this.props.newStudent) {
            registrationErrors = {
                __all__: this.props.intl.formatMessage({id: 'registration.mustBeNewStudent'})
            };
        }

        return (
            <Deck className="student-registration">
                {registrationErrors ? (
                    <Steps.RegistrationError>
                        <ul>
                            {Object.keys(registrationErrors).map(field => {
                                let label = `${field}: `;
                                if (field === '__all__') {
                                    label = '';
                                }
                                return (
                                    <li key={field}>
                                        {label}{registrationErrors[field]}
                                    </li>
                                );
                            })}
                        </ul>
                    </Steps.RegistrationError>
                ) : (
                    this.state.waiting || !this.state.classroom ? (
                        <Spinner />
                    ) : (
                        <Progression {... this.state}>
                            <Steps.ClassInviteExistingStudentStep
                                classroom={this.state.classroom}
                                studentUsername={this.props.studentUsername}
                                waiting={this.state.waiting}
                                onHandleLogOut={this.props.handleLogOut}
                                onNextStep={this.handleAdvanceStep}
                            />
                            {this.props.must_reset_password ?
                                <Steps.ChoosePasswordStep
                                    showPassword
                                    username={this.props.studentUsername}
                                    waiting={this.state.waiting}
                                    onNextStep={this.handleAdvanceStep}
                                /> : []
                            }
                            <Steps.DemographicsStep
                                description={demographicsDescription}
                                waiting={this.state.waiting}
                                onNextStep={this.handleRegister}
                            />
                            <Steps.ClassWelcomeStep
                                classroom={this.state.classroom}
                                waiting={this.state.waiting}
                                onNextStep={this.handleGoToClass}
                            />
                        </Progression>
                    )
                )}
            </Deck>
        );
    }
}

StudentCompleteRegistration.propTypes = {
    classroomId: PropTypes.number.isRequired,
    handleLogOut: PropTypes.func,
    intl: intlShape,
    must_reset_password: PropTypes.bool.isRequired,
    newStudent: PropTypes.bool.isRequired,
    sessionFetched: PropTypes.bool.isRequired,
    studentUsername: PropTypes.string.isRequired
};

const IntlStudentCompleteRegistration = injectIntl(StudentCompleteRegistration);

const mapStateToProps = state => ({
    classroomId: state.session.session.user && state.session.session.user.classroomId,
    must_reset_password: state.session.session.flags && state.session.session.flags.must_reset_password,
    newStudent: (
        state.session.session.permissions &&
        state.session.session.permissions.student &&
        state.session.session.flags.must_complete_registration
    ),
    sessionFetched: state.session.status === sessionStatus.FETCHED,
    studentUsername: state.session.session.user && state.session.session.user.username
});

const mapDispatchToProps = dispatch => ({
    handleLogOut: event => {
        event.preventDefault();
        dispatch(navigationActions.handleLogOut());
    }
});

const ConnectedStudentCompleteRegistration = connect(
    mapStateToProps,
    mapDispatchToProps
)(IntlStudentCompleteRegistration);

render(<ConnectedStudentCompleteRegistration />, document.getElementById('app'));
