var React = require('react');

var api = require('../../lib/api');
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
            return {
                showPassword: false,
                waiting: false
            };
        },
        onChangeShowPassword: function (field, value) {
            this.setState({showPassword: value});
        },
        onValidSubmit: function (formData, reset, invalidate) {
            this.setState({waiting: true});
            api({
                host: '',
                uri: '/accounts/check_username/' + formData.user.username + '/'
            }, function (err, res) {
                var formatMessage = this.props.intl.formatMessage;
                this.setState({waiting: false});
                if (err) return invalidate({all: err});
                res = res[0];
                switch (res.msg) {
                case 'valid username':
                    return this.props.onNextStep();
                case 'username exists':
                    return invalidate({
                        'user.username': formatMessage({id: 'general.validationUsernameExists'})
                    });
                case 'bad username':
                    return invalidate({
                        'user.username': formatMessage({id: 'general.validationUsernameVulgar'})
                    });
                case 'invalid username':
                default:
                    return invalidate({
                        'user.username': formatMessage({id: 'general.validationUsernameInvalid'})
                    });
                }
            }.bind(this));
        },
        render: function () {
            var formatMessage = this.props.intl.formatMessage;
            return (
                <ProgressionStep title={<intl.FormattedMessage id="teacherRegistration.usernameStepTitle" />}
                                 description={
                                    <p><intl.FormattedMessage id="teacherRegistration.usernameStepDescription" /></p>
                                 }
                >
                    <Form onValidSubmit={this.onValidSubmit}>
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
                        <Button type="submit" disabled={this.state.waiting}>
                            {this.state.waiting ?
                                <Spinner /> :
                                <span><intl.FormattedMessage id="teacherRegistration.nextStep" /></span>
                            }
                        </Button>
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
                        <Select label={formatMessage({id: 'general.birthMonth'})}
                                name="user.birth.month"
                                options={this.getMonthOptions()}
                                required />
                        <Select label={formatMessage({id: 'general.birthYear'})}
                                name="user.birth.year"
                                options={this.getYearOptions()} required />
                        <RadioGroup label={formatMessage({id: 'general.gender'})}
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
            return [
                'orgChoiceElementarySchool',
                'orgChoiceMiddleSchool',
                'orgChoiceHighSchool',
                'orgChoiceUniversity',
                'orgChoiceAfterschool',
                'orgChoiceMuseum',
                'orgChoiceLibrary',
                'orgChoiceCamp',
                'orgChoiceOther'
            ].map(function (choice, id) {
                return {
                    value: id,
                    label: this.props.intl.formatMessage({
                        id: 'teacherRegistration.' + choice
                    })
                };
            }.bind(this));
        },
        onChooseOrganization: function (name, values) {
            this.setState({otherDisabled: values.indexOf('Other') === -1});
        },
        render: function () {
            var formatMessage = this.props.intl.formatMessage;
            return (
                <ProgressionStep title={formatMessage({id: 'teacherRegistration.orgStepTitle'})}
                                 description={
                                    <p>
                                        <intl.FormattedMessage id="teacherRegistration.orgStepDescription" />
                                    </p>}>
                    <Form onValidSubmit={this.props.onNextStep}>
                        <Input label={formatMessage({id: 'teacherRegistration.organization'})}
                               type="text"
                               name="organization.name"
                               required />
                        <Input label={formatMessage({id: 'teacherRegistration.orgTitle'})}
                               type="text"
                               name="organization.title"
                               required />
                        <CheckboxGroup label={formatMessage({id: 'teacherRegistration.orgType'})}
                                       help={formatMessage({id: 'teacherRegistration.checkAll'})}
                                       name="organization.type"
                                       value={[]}
                                       options={this.getOrganizationOptions()}
                                       onChange={this.onChooseOrganization}
                                       required />
                        <Input type="text"
                               name="organization.other"
                               disabled={this.state.otherDisabled}
                               required={!this.state.otherDisabled} />
                        <Input label={formatMessage({id: 'general.website'})}
                               help={formatMessage({id: 'general.notRequired'})}
                               type="url"
                               name="organization.url" />
                        <Button type="submit"><intl.FormattedMessage id="teacherRegistration.nextStep" /></Button>
                    </Form>
                </ProgressionStep>
            );
        }
    })),
    AddressStep: intl.injectIntl(React.createClass({
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
                        'all': <FormattedMessage id="teacherRegistration.addressValidationError" />
                    });
                }
            }.bind(this));
        },
        render: function () {
            var formatMessage = this.props.intl.formatMessage;
            var stateOptions = countryData.subdivisionOptions[this.state.countryChoice];
            stateOptions = [{}].concat(stateOptions);
            var countryOptions = countryData.countryOptions.concat({
                label: formatMessage({id: 'teacherRegistration.selectCountry'}),
                disabled: true,
                selected: true
            }).sort(function (a, b) {
                if (a.disabled) return -1;
                if (b.disabled) return 1;
                if (a.value === this.props.defaultCountry) return -1;
                if (b.value === this.props.defaultCountry) return 1;
                return 0;
            }.bind(this));
            return (
                <ProgressionStep title={formatMessage({id: 'teacherRegistration.addressStepTitle'})}
                                 description={
                                    <p>
                                        <intl.FormattedMessage id="teacherRegistration.addressStepDescription" />
                                    </p>}>
                    <Form onValidSubmit={this.onValidSubmit}>
                        <Select label={formatMessage({id: 'general.country'})}
                                name="address.country"
                                options={countryOptions}
                                onChange={this.onChangeCountry}
                                required />
                        <Input label={formatMessage({id: 'teacherRegistration.addressLine1'})}
                               type="text"
                               name="address.line1"
                               required />
                        <Input label={formatMessage({id: 'teacherRegistration.addressLine2'})}
                               type="text"
                               name="address.line2" />
                        <Input label={formatMessage({id: 'teacherRegistration.city'})}
                               type="text"
                               name="address.city"
                               required />
                        {stateOptions.length > 2 ?
                            <Select label={formatMessage({id: 'teacherRegistration.stateProvince'})}
                                    name="address.state"
                                    options={stateOptions}
                                    required /> :
                            []
                        }
                        <Input label={formatMessage({id: 'teacherRegistration.zipCode'})}
                               type="text"
                               name="address.zip"
                               required />
                        <Button type="submit" disabled={this.state.waiting}>
                            {this.state.waiting ?
                                <Spinner /> :
                                <span><intl.FormattedMessage id="teacherRegistration.nextStep" /></span>
                            }
                        </Button>
                    </Form>
                </ProgressionStep>
            );
        }
    })),
    UseScratchStep: intl.injectIntl(React.createClass({
        render: function () {
            var formatMessage = this.props.intl.formatMessage;
            return (
                <ProgressionStep title={formatMessage({id: 'teacherRegistration.useScratchStepTitle'})}
                                 description={
                                    <p>
                                        <intl.FormattedMessage id="teacherRegistration.useScratchStepDescription" />
                                    </p>
                                 }>
                    <Form onValidSubmit={this.props.onNextStep}>
                        <TextArea label={formatMessage({id: 'teacherRegistration.howUseScratch'})}
                                  name="useScratch"
                                  required />
                        <Button type="submit"><intl.FormattedMessage id="teacherRegistration.nextStep" /></Button>
                    </Form>
                </ProgressionStep>
            );
        }
    })),
    EmailStep: intl.injectIntl(React.createClass({
        render: function () {
            var formatMessage = this.props.intl.formatMessage;
            return (
                <ProgressionStep title={formatMessage({id: 'teacherRegistration.emailStepTitle'})}
                                 description={
                                    <p>
                                        <intl.FormattedMessage id="teacherRegistration.emailStepDescription" />
                                    </p>}>
                    <Form onValidSubmit={this.props.onNextStep}>
                        <Input label={formatMessage({id: 'general.emailAddress'})}
                               type="text"
                               name="user.email"
                               validations="isEmail"
                               validationError={formatMessage({id: 'general.validationEmail'})}
                               required />
                        <Input label={formatMessage({id: 'general.confirmEmail'})}
                               type="text"
                               name="confirmEmail"
                               validations="equalsField:user.email"
                               validationErrors={{
                                   equalsField: formatMessage({id: 'general.validationEmailMatch'})
                               }}
                               required />
                        <Button type="submit"><intl.FormattedMessage id="teacherRegistration.nextStep" /></Button>
                    </Form>
                </ProgressionStep>
            );
        }
    })),
    LastStep: intl.injectIntl(React.createClass({
        render: function () {
            var formatMessage = this.props.intl.formatMessage;
            return (
                <ProgressionStep title={formatMessage({id: 'teacherRegistration.lastStepTitle'})}
                                 description={
                                    <p>
                                        <intl.FormattedMessage id="teacherRegistration.lastStepDescription" />
                                    </p>}>
                    <div className="confirm">
                        <h2><intl.FormattedMessage id="teacherRegistration.confirmYourEmail" /></h2>
                        <p>
                            <intl.FormattedMessage id="teacherRegistration.confirmYourEmailDescription" /><br />
                            <strong>{this.props.formData.user && this.props.formData.user.email}</strong>
                        </p>
                    </div>
                    <div className="wait">
                        <h2><intl.FormattedMessage id="teacherRegistration.waitForApproval" /></h2>
                        <p>
                            <intl.FormattedMessage id="teacherRegistration.waitForApprovalDescription" />
                        </p>
                    </div>
                    <div className="resources">
                        <h2><intl.FormattedMessage id="teacherRegistration.checkOutResources" /></h2>
                        <p>
                            <intl.FormattedHTMLMessage id="teacherRegistration.checkOutResourcesDescription" />
                        </p>
                    </div>
                </ProgressionStep>
            );
        }
    }))
};
