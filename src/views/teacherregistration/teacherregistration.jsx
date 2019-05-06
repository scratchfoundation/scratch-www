const bindAll = require('lodash.bindall');
const connect = require('react-redux').connect;
const defaults = require('lodash.defaultsdeep');
const PropTypes = require('prop-types');
const React = require('react');

const api = require('../../lib/api');
const injectIntl = require('../../lib/intl.jsx').injectIntl;
const intlShape = require('../../lib/intl.jsx').intlShape;
const sessionActions = require('../../redux/session.js');

const Deck = require('../../components/deck/deck.jsx');
const Progression = require('../../components/progression/progression.jsx');
const Steps = require('../../components/registration/steps.jsx');

const render = require('../../lib/render.jsx');

require('./teacherregistration.scss');


class TeacherRegistration extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleAdvanceStep',
            'handleRegister'
        ]);
        this.state = {
            formData: {},
            registrationError: null,
            step: 0,
            waiting: false
        };
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
        api({
            host: '',
            uri: '/classes/register_educator/',
            method: 'post',
            useCsrf: true,
            formData: {
                username: this.state.formData.user.username,
                email: formData.user.email,
                password: this.state.formData.user.password,
                birth_month: this.state.formData.user.birth.month,
                birth_year: this.state.formData.user.birth.year,
                gender: (
                    this.state.formData.user.gender === 'other' ?
                        this.state.formData.user.genderOther :
                        this.state.formData.user.gender
                ),
                country: this.state.formData.user.country,
                subscribe: formData.subscribe,
                is_robot: this.state.formData.user.isRobot,
                first_name: this.state.formData.user.name.first,
                last_name: this.state.formData.user.name.last,
                phone_number: this.state.formData.phone.national_number,
                organization_name: this.state.formData.organization.name,
                organization_title: this.state.formData.organization.title,
                organization_type: this.state.formData.organization.type,
                organization_other: this.state.formData.organization.other,
                organization_url: this.state.formData.organization.url,
                address_country: this.state.formData.address.country,
                address_line1: this.state.formData.address.line1,
                address_line2: this.state.formData.address.line2,
                address_city: this.state.formData.address.city,
                address_state: this.state.formData.address.state,
                address_zip: this.state.formData.address.zip,
                how_use_scratch: this.state.formData.useScratch
            }
        }, (err, body, res) => {
            this.setState({waiting: false});
            if (err) return this.setState({registrationError: err});
            if (res.statusCode === 500) return this.setState({registrationError: err});
            if (body[0] && body[0].success) {
                this.props.dispatch(sessionActions.refreshSession());
                return this.handleAdvanceStep(formData);
            }
            this.setState({
                registrationError:
                    (body[0] && body[0].msg) ||
                    `${this.props.intl.formatMessage({id: 'registration.generalError'})} (${res.statusCode})`
            });
        });
    }
    render () {
        const permissions = this.props.session.permissions || {};

        return (
            <Deck className="teacher-registration">
                {this.state.registrationError ?
                    <Steps.RegistrationError>
                        {this.state.registrationError}
                    </Steps.RegistrationError> :
                    <Progression step={this.state.step}>
                        <Steps.UsernameStep
                            waiting={this.state.waiting}
                            onNextStep={this.handleAdvanceStep}
                        />
                        <Steps.DemographicsStep
                            birthOffset={16}
                            waiting={this.state.waiting}
                            onNextStep={this.handleAdvanceStep}
                        />
                        <Steps.NameStep
                            waiting={this.state.waiting}
                            onNextStep={this.handleAdvanceStep}
                        />
                        <Steps.PhoneNumberStep
                            defaultCountry={
                                this.state.formData.user && this.state.formData.user.country
                            }
                            waiting={this.state.waiting}
                            onNextStep={this.handleAdvanceStep}
                        />
                        <Steps.OrganizationStep
                            waiting={this.state.waiting}
                            onNextStep={this.handleAdvanceStep}
                        />
                        <Steps.AddressStep
                            defaultCountry={
                                this.state.formData.user && this.state.formData.user.country
                            }
                            waiting={this.state.waiting}
                            onNextStep={this.handleAdvanceStep}
                        />
                        <Steps.UseScratchStep
                            waiting={this.state.waiting}
                            onNextStep={this.handleAdvanceStep}
                        />
                        <Steps.EmailStep
                            waiting={this.state.waiting}
                            onNextStep={this.handleRegister}
                        />
                        <Steps.TeacherApprovalStep
                            confirmed={permissions.social}
                            educator={permissions.educator}
                            email={this.state.formData.user && this.state.formData.user.email}
                            invited={permissions.educator_invitee}
                        />
                    </Progression>
                }
            </Deck>
        );
    }
}

TeacherRegistration.propTypes = {
    dispatch: PropTypes.func,
    intl: intlShape,
    session: PropTypes.shape({
        user: PropTypes.shape({
            classroomId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            thumbnailUrl: PropTypes.string,
            username: PropTypes.string
        }),
        permissions: PropTypes.shape({
            admin: PropTypes.bool,
            social: PropTypes.bool,
            educator: PropTypes.bool,
            educator_invitee: PropTypes.bool,
            student: PropTypes.bool
        })
    })
};

const IntlTeacherRegistration = injectIntl(TeacherRegistration);

const mapStateToProps = state => ({
    session: state.session.session
});

const ConnectedTeacherRegistration = connect(mapStateToProps)(IntlTeacherRegistration);

render(<ConnectedTeacherRegistration />, document.getElementById('app'));
