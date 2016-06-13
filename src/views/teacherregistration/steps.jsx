var React = require('react');

var countryData = require('../../lib/country-data');
var intl = require('../../lib/intl.jsx');
var log = require('../../lib/log');
var smartyStreets = require('../../lib/smarty-streets');

var Button = require('../../components/forms/button.jsx');
var Checkbox = require('../../components/forms/checkbox.jsx');
var CheckboxGroup = require('../../components/forms/checkbox-group.jsx');
var Form = require('../../components/forms/form.jsx');
var Input = require('../../components/forms/input.jsx');
var PhoneInput = require('../../components/forms/phone-input.jsx');
var ProgressionStep = require('../../components/progression-step/progression-step.jsx');
var RadioGroup = require('../../components/forms/radio-group.jsx');
var Select = require('../../components/forms/select.jsx');
var Spinner = require('../../components/spinner/spinner.jsx');
var TextArea = require('../../components/forms/textarea.jsx');

var DEFAULT_COUNTRY = 'us';

module.exports = {
    UsernameStep: intl.injectIntl(React.createClass({
        getInitialState: function () {
            return {showPassword: false};
        },
        onChangeShowPassword: function (field, value) {
            this.setState({showPassword: value});
        },
        render: function () {
            var formatMessage = this.props.intl.formatMessage;
            return (
                <ProgressionStep title={<intl.FormattedMessage id="teacherRegistration.usernameStepTitle" />}
                                 description={
                                    <p><intl.FormattedMessage id="teacherRegistration.usernameStepDescription" /></p>
                                 }
                >
                    <Form onValidSubmit={this.props.onNextStep}>
                        <Input label={formatMessage({id: 'general.username'})}
                               type="text"
                               name="user.username"
                               validations={{
                                   matchRegexp: /^[\w-]*$/,
                                   minLength: 3,
                                   maxLength: 20
                               }}
                               validationErrors={{
                                   matchRegexp: formatMessage({id: 'teacherRegistration.validationUsernameRegexp'}),
                                   minLength: formatMessage({id: 'teacherRegistration.validationUsernameMinLength'}),
                                   maxLength: formatMessage({id: 'teacherRegistration.validationUsernameMaxLength'})
                               }}
                               required />
                        <Input label={formatMessage({id: 'general.password'})}
                               type={this.state.showPassword ? 'text' : 'password'}
                               name="user.password"
                               validations={{
                                   minLength: 6,
                                   notEquals: 'password',
                                   notEqualsField: 'user.username'
                               }}
                               validationErrors={{
                                   minLength: formatMessage({
                                       id: 'teacherRegistration.validationPasswordLength'
                                   }),
                                   notEquals: formatMessage({
                                       id: 'teacherRegistration.validationPasswordNotEquals'
                                   }),
                                   notEqualsField: formatMessage({
                                       id: 'teacherRegistration.validationPasswordNotUsername'
                                   })
                               }}
                               required />
                        <Checkbox label={formatMessage({id: 'teacherRegistration.showPassword'})}
                                  value={this.state.showPassword}
                                  onChange={this.onChangeShowPassword}
                                  help={null}
                                  name="showPassword" />
                        <Button type="submit">Next Step</Button>
                    </Form>
                </ProgressionStep>
            );
        }
    })),
    DemographicsStep: intl.injectIntl(React.createClass({
        getDefaultProps: function () {
            return {defaultCountry: DEFAULT_COUNTRY};
        },
        getInitialState: function () {
            return {otherDisabled: true};
        },
        getMonthOptions: function () {
            return [
                'January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'
            ].map(function (label, id) {
                return {
                    value: id+1,
                    label: this.props.intl.formatMessage({id: 'general.month' + label})};
            }.bind(this));
        },
        getYearOptions: function () {
            return Array.apply(null, Array(100)).map(function (v, id) {
                var year = 2016 - id;
                return {value: year, label: year};
            });
        },
        onChooseGender: function (name, gender) {
            this.setState({otherDisabled: gender !== 'other'});
        },
        render: function () {
            var formatMessage = this.props.intl.formatMessage;
            return (
                <ProgressionStep title={<intl.FormattedMessage id="teacherRegistration.personalStepTitle" />}
                          description={
                            <p>
                                <intl.FormattedMessage id="teacherRegistration.personalStepDescription" />
                            </p>}>
                    <Form onValidSubmit={this.props.onNextStep}>
                        <Select label="Birth Month" name="user.birth.month" options={this.getMonthOptions()} required />
                        <Select label="Birth Yeah" name="user.birth.year" options={this.getYearOptions()} required />
                        <RadioGroup label="Gender"
                                    name="user.gender"
                                    onChange={this.onChooseGender}
                                    options={[
                                        {value: 'female', label: formatMessage({id: 'general.female'})},
                                        {value: 'male', label: formatMessage({id: 'general.male'})},
                                        {value: 'other', label: formatMessage({id: 'general.other'})}
                                    ]}
                                    required />
                        <Input name="user.genderOther"
                               type="text"
                               disabled={this.state.otherDisabled}
                               required={!this.state.otherDisabled}
                               help={null} />
                        <Select label={formatMessage({id: 'general.country'})}
                                name="user.country"
                                options={countryData.countryOptions}
                                value={this.props.defaultCountry}
                                required />
                         <Checkbox className="demographics-checkbox-is-robot"
                                   label="I'm a robot!"
                                   name="user.isRobot" />
                        <Button type="submit"><intl.FormattedMessage id="teacherRegistration.nextStep" /></Button>
                    </Form>
                </ProgressionStep>
            );
        }
    })),
    NameStep: intl.injectIntl(React.createClass({
        render: function () {
            var formatMessage = this.props.intl.formatMessage;
            return (
                <ProgressionStep title={formatMessage({id: 'teacherRegistration.nameStepTitle'})}
                                 description={
                                     <p>
                                        <intl.FormattedMessage id="teacherRegistration.nameStepDescription" />
                                     </p>
                                 }
                >
                    <Form onValidSubmit={this.props.onNextStep}>
                        <Input label={formatMessage({id: 'teacherRegistration.firstName'})}
                               type="text"
                               name="user.name.first"
                               required />
                        <Input label={formatMessage({id: 'teacherRegistration.lastName'})}
                               type="text"
                               name="user.name.last"
                               required />
                        <Button type="submit"><intl.FormattedMessage id="teacherRegistration.nextStep" /></Button>
                    </Form>
                </ProgressionStep>
            );
        }
    })),
    PhoneNumberStep: intl.injectIntl(React.createClass({
        getDefaultProps: function () {
            return {defaultCountry: DEFAULT_COUNTRY};
        },
        render: function () {
            var formatMessage = this.props.intl.formatMessage;
            return (
                <ProgressionStep title={formatMessage({id: 'teacherRegistration.phoneStepTitle'})}
                                 description={
                                    <p>
                                        <intl.FormattedMessage id="teacherRegistration.phoneStepDescription" />
                                    </p>
                                 }
                >
                    <Form onValidSubmit={this.props.onNextStep}>
                        <PhoneInput label={formatMessage({id: 'teacherRegistration.phoneNumber'})}
                                    name="phone"
                                    defaultCountry={
                                        (this.props.formData.user && this.props.formData.user.country) ||
                                        this.props.defaultCountry
                                    }
                                    required />
                        <Checkbox label={formatMessage({id: 'teacherRegistration.phoneConsent'})}
                                  name="phoneConsent"
                                  required="isFalse"
                                  validationErrors={{
                                      isFalse: formatMessage({id: 'teacherRegistration.validationPhoneConsent'})
                                  }} />
                        <Button type="submit"><intl.FormattedMessage id="teacherRegistration.nextStep" /></Button>
                    </Form>
                </ProgressionStep>
            );
        }
    })),
    OrganizationStep: intl.injectIntl(React.createClass({
        getInitialState: function () {
            return {
                otherDisabled: true
            };
        },
        getOrganizationOptions: function () {
            var choices = {
                ElementarySchool: 'Elementary School',
                MiddleSchool: 'Middle School',
                HighSchool: 'High School',
                University: 'University / College',
                Museum: 'Museum',
                Library: 'Library',
                Camp: 'Camp',
                Other: 'Other'
            };
            return Object.keys(choices).map(function (key) {
                return {
                    value: choices[key],
                    label: this.props.intl.formatMessage({
                        id: 'teacherRegistration.organizationChoice' + key
                    })
                };
            }.bind(this));
        },
        onChooseOrganization: function (name, values) {
            this.setState({otherDisabled: values.indexOf('Other') === -1});
        },
        render: function () {
            return (
                <ProgressionStep title="Organization"
                          description={
                            <p>
                                Your responses to these questions will be kept private.
                                Why do we ask for this information <a onClick={this.handle}>?</a>
                            </p>}>
                    <Form onValidSubmit={this.props.onNextStep}>
                        <Input label="Organization" type="text" name="organization.name" required />
                        <Input label="Title / Position" type="text" name="organization.title" required />
                        <CheckboxGroup label="Type of Organization"
                                       name="organization.type"
                                       value={[]}
                                       options={this.getOrganizationOptions()}
                                       onChange={this.onChooseOrganization}
                                       required />
                        <Input type="text"
                               name="organization.other"
                               disabled={this.state.otherDisabled}
                               required={!this.state.otherDisabled} />
                        <Input label="Website URL (not required)" type="url" name="organization.url" />
                        <Button type="submit">Next Step</Button>
                    </Form>
                </ProgressionStep>
            );
        }
    })),
    AddressStep: React.createClass({
        getDefaultProps: function () {
            return {defaultCountry: DEFAULT_COUNTRY};
        },
        getInitialState: function () {
            return {
                countryChoice: (
                    (this.props.formData.user && this.props.formData.user.country) ||
                    this.props.defaultCountry
                ),
                waiting: false
            };
        },
        onChangeCountry: function (field, choice) {
            this.setState({countryChoice: choice});
        },
        onValidSubmit: function (formData, reset, invalidate) {
            if (formData.address.country !== 'us') {
                return this.props.onNextStep(formData);
            }
            this.setState({waiting: true});
            var address = {
                street: formData.address.line1,
                secondary: formData.address.line2 || '',
                city: formData.address.city,
                state: formData.address.state,
                zipcode: formData.address.zip
            };
            smartyStreets(address, function (err, res) {
                this.setState({waiting: false});
                if (err) {
                    // We don't want to prevent registration because
                    // address validation isn't working. Log it and
                    // move on.
                    log.error(err);
                    return this.props.onNextStep(formData);
                }
                if (res && res.length > 0) {
                    return this.props.onNextStep(formData);
                } else {
                    return invalidate({
                        'all': 'This doesn\'t look like a real address'
                    });
                }
            }.bind(this));
        },
        render: function () {
            var stateOptions = countryData.subdivisionOptions[this.state.countryChoice];
            var stateDefault = 'Please select...';
            stateOptions = [{label: stateDefault}].concat(stateOptions);
            return (
                <ProgressionStep title="Address"
                          description={
                            <p>
                                Your responses to these questions will be kept private.
                                Why do we ask for this information <a onClick={this.handle}>?</a>
                            </p>}>
                    <Form onValidSubmit={this.onValidSubmit}>
                        <Select label="Country"
                                name="address.country"
                                options={countryData.countryOptions}
                                onChange={this.onChangeCountry}
                                value={this.state.countryChoice}
                                required />
                        <Input label="Address Line 1" type="text" name="address.line1" required />
                        <Input label="Address Line 2" type="text" name="address.line2" />
                        <Input label="City" type="text" name="address.city" required />
                        {stateOptions.length > 2 ?
                            <Select label="State / Province" name="address.state" options={stateOptions} required /> :
                            []
                        }
                        <Input label="ZIP Code" type="text" name="address.zip" required />
                        <Button type="submit" disabled={this.state.waiting}>
                            {this.state.waiting ?
                                <Spinner /> :
                                <span>Next Step</span>
                            }
                        </Button>
                    </Form>
                </ProgressionStep>
            );
        }
    }),
    UseScratchStep: React.createClass({
        render: function () {
            return (
                <ProgressionStep title="How do you use Scratch?"
                          description={
                            <p>
                                Tell us a little how you plan to use Scratch.
                                Why do we ask for this information <a onClick={this.handle}>?</a>
                            </p>
                          }>
                    <Form onValidSubmit={this.props.onNextStep}>
                        <TextArea label="How do you use Scratch?" name="useScratch" required />
                        <Button type="submit">Next Step</Button>
                    </Form>
                </ProgressionStep>
            );
        }
    }),
    EmailStep: React.createClass({
        render: function () {
            return (
                <ProgressionStep title="Email Address"
                          description={
                            <p>
                                We will send you a <strong>confirmation email</strong> that will
                                allow you to access your Scratch Teacher Account.
                            </p>}>
                    <Form onValidSubmit={this.props.onNextStep}>
                        <Input label="Email"
                               type="text"
                               name="user.email"
                               validations="isEmail"
                               validationError="Please enter a valid email address"
                               required />
                        <Input label="Confirm Email"
                               type="text"
                               name="confirmEmail"
                               validations="equalsField:user.email"
                               validationErrors={{
                                   equalsField: 'The emails do not match'
                               }}
                               required />
                        <Button type="submit">Next Step</Button>
                    </Form>
                </ProgressionStep>
            );
        }
    }),
    LastStep: React.createClass({
        render: function () {
            return (
                <ProgressionStep title="Almost Done"
                          description={
                            <p>
                                Lorem ipsum dolor sit amet
                            </p>}>
                    <div className="confirm">
                        <h2>Confirm Your Email</h2>
                        <p>
                            Click the link in the confirmation email that we
                            sent to the following address:<br />
                            <strong>{this.props.formData.user.email}</strong>
                        </p>
                        <div className="box-footer">
                            <a onClick="">Wrong email?</a>
                            <a onClick="">Having trouble?</a>
                        </div>
                    </div>
                    <div className="wait">
                        <h2>Wait for Approval</h2>
                        <p>
                            Your information is being reviewed. Please be
                            patient, the approval process can take up to 24hrs.
                        </p>
                    </div>
                </ProgressionStep>
            );
        }
    })
};
