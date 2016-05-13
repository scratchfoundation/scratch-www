var classNames = require('classnames');
var defaults = require('lodash.defaultsdeep');
var React = require('react');

var render = require('../../lib/render.jsx');

var Button = require('../../components/forms/button.jsx');
var Checkbox = require('../../components/forms/checkbox.jsx');
var CheckboxGroup = require('../../components/forms/checkbox-group.jsx');
var Form = require('../../components/forms/form.jsx');
var formset = require('../../components/forms/formset.jsx');
var FormSet = formset.FormSet;
var FormStep = formset.FormStep;
var Input = require('../../components/forms/input.jsx');
var Page = require('../../components/page/www/page.jsx');
var RadioGroup = require('../../components/forms/radio-group.jsx');
var Select = require('../../components/forms/select.jsx');
var TextArea = require('../../components/forms/textarea.jsx');

var COUNTRIES = require('./countries.json');
require('./teacherregistration.scss');


var UsernameStep = React.createClass({
    render: function () {
        return (
            <FormStep title="Create a Teacher Account"
                      description={
                        <p>
                            Creating a Teacher Account requires additional information
                            for review.
                            <strong>The approval process can take up to 24 hours</strong>
                        </p>}>
                <Form onValidSubmit={this.props.onNextStep}>
                    <Input label="Username"
                           type="text"
                           name="username"
                           validations={{
                               matchRegexp: /^[\w-]*$/,
                               minLength: 3,
                               maxLength: 20
                           }}
                           validationErrors={{
                               matchRegexp: 'Your username may only contain characters and -',
                               minLength: 'Usernames must be at least three characters',
                               maxLength: 'Usernames must be at most 20 characters'
                           }}
                           required />
                    <Input label="Password"
                           type="password"
                           name="password"
                           validations={{
                               minLength: 6,
                               notEquals: 'password',
                               notEqualsField: 'username'
                           }}
                           validationErrors={{
                               minLength: 'Passwords must be at least six characters',
                               notEquals: 'Your password may not be "password"',
                               notEqualsField: 'Your password may not be your username'
                           }}
                           required />
                    <Input label="Confirm Password"
                           type="password"
                           name="passwordConfirmation"
                           validations="equalsField:password"
                           validationError="The passwords do not match"
                           required />
                    <Button type="submit">Next Step</Button>
                </Form>
            </FormStep>
        );
    }
});
var DemographicsStep = React.createClass({
    getInitialState: function () {
        return {otherDisabled: true};
    },
    onChooseGender: function (name, gender) {
        this.setState({otherDisabled: gender !== 'other'});
    },
    render: function () {
        var countryOptions = Object.keys(COUNTRIES).map(function (code) {
            return {value: code, label: COUNTRIES[code]};
        });
        var monthOptions = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ].map(function (label, id) {
            return {value: id+1, label: label};
        });
        var yearOptions = Array.apply(null, Array(100)).map(function (v, id) {
            var year = 2016 - id;
            return {value: year, label: year};
        });
        return (
            <FormStep title="Demographics"
                      description={
                        <p>
                            Your responses to these questions will be kept private.
                            Why do we ask for this information <a onClick={this.handle}>?</a>
                        </p>}>
                <Form onValidSubmit={this.props.onNextStep}>
                    <Select label="Birth Month" name="month" options={monthOptions} required />
                    <Select label="Birth Yeah" name="year" options={yearOptions} required />
                    <RadioGroup label="Gender"
                                name="gender"
                                onChange={this.onChooseGender}
                                options={[
                                    {value: 'female', label: 'Female'},
                                    {value: 'male', label: 'Male'},
                                    {value: 'other', label: 'Other'}
                                ]}
                                required />
                    <Input disabled={this.state.otherDisabled} name="genderOther" type="text" />
                    <Select label="Country"
                            name="country"
                            options={countryOptions}
                            value={countryOptions[0].value}
                            required />
                    <Button type="submit">Next Step</Button>
                </Form>
            </FormStep>
        );
    }
});
var NameStep = React.createClass({
    render: function () {
        return (
            <FormStep title="First &amp; Last Name"
                      description={
                        <p>
                            Your responses to these questions will be kept private.
                            Why do we ask for this information <a onClick={this.handle}>?</a>
                        </p>}>
                <Form onValidSubmit={this.props.onNextStep}>
                    <Input label="First Name" type="text" name="first" required />
                    <Input label="Last Name" type="text" name="last" required />
                    <Button type="submit">Next Step</Button>
                </Form>
            </FormStep>
        );
    }
});
var PhoneNumberStep = React.createClass({
    render: function () {
        return (
            <FormStep title="Phone Number"
                      description={
                        <p>
                            Your responses to these questions will be kept private.
                            Why do we ask for this information <a onClick={this.handle}>?</a>
                        </p>}>
                <Form onValidSubmit={this.props.onNextStep}>
                    <Input label="Phone Number" type="tel" name="phone" required />
                    <Checkbox label={
                                'Yes, I consent to lorem ipsum dolor sit amet, consectetur' +
                                'adipiscing elit.'
                              }
                              name="phoneConsent"
                              required="isFalse"
                              validationErrors={{
                                  isFalse: 'You must consent to lorem ipsum'
                              }} />
                    <Button type="submit">Next Step</Button>
                </Form>
            </FormStep>
        );
    }
});
var OrganizationStep = React.createClass({
    getInitialState: function () {
        return {
            otherDisabled: true
        };
    },
    onChooseOrganization: function (name, values) {
        this.setState({otherDisabled: values.indexOf('Other') === -1});
    },
    render: function () {
        var organizationOptions = [
            'Elementary School', 'Middle School', 'High School', 'University / College',
            'Museum', 'Library', 'Camp', 'Other'
        ].map(function (type) { return {value: type, label: type}; });
        return (
            <FormStep title="Organization"
                      description={
                        <p>
                            Your responses to these questions will be kept private.
                            Why do we ask for this information <a onClick={this.handle}>?</a>
                        </p>}>
                <Form onValidSubmit={this.props.onNextStep}>
                    <Input label="Organization" type="text" name="organization" required />
                    <Input label="Title / Position" type="text" name="title" required />
                    <CheckboxGroup label="Type of Organization"
                                   name="organizationType"
                                   value={[]}
                                   options={organizationOptions}
                                   onChange={this.onChooseOrganization}
                                   required />
                    <Input type="text"
                           name="organizationTypeOther"
                           disabled={this.state.otherDisabled}
                           required={!this.state.otherDisabled} />
                    <Input label="Website URL (not required)" type="url" name="website" />
                    <Button type="submit">Next Step</Button>
                </Form>
            </FormStep>
        );
    }
});
var AddressStep = React.createClass({
    render: function () {
        var countryOptions = Object.keys(COUNTRIES).map(function (code) {
            return {value: code, label: COUNTRIES[code]};
        });
        var stateOptions = ['every','state','in','the','world'].map(function (name) {
            return {value: name, label: name};
        });
        var stateDefault = 'Please select one of...';
        stateOptions = [{label: stateDefault}].concat(stateOptions);
        return (
            <FormStep title="Address"
                      description={
                        <p>
                            Your responses to these questions will be kept private.
                            Why do we ask for this information <a onClick={this.handle}>?</a>
                        </p>}>
                <Form onValidSubmit={this.props.onNextStep}>
                    <Select label="Country" name="addressCountry" options={countryOptions} required />
                    <Input label="Address Line 1" type="text" name="addressLine1" required />
                    <Input label="Address Line 2" type="text" name="addressLine2" />
                    <Input label="City" type="text" name="addressCity" required />
                    <Input label="ZIP Code" type="text" name="addressZip" required />
                    <Select label="State / Province" name="addressState" options={stateOptions} required />
                    <Button type="submit">Next Step</Button>
                </Form>
            </FormStep>
        );
    }
});
var UseScratchStep = React.createClass({
    render: function () {
        return (
            <FormStep title="How do you use Scratch?"
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
            </FormStep>
        );
    }
});
var EmailStep = React.createClass({
    render: function () {
        return (
            <FormStep title="Email Address"
                      description={
                        <p>
                            We will send you a <strong>confirmation email</strong> that will
                            allow you to access your Scratch Teacher Account.
                        </p>}>
                <Form onValidSubmit={this.props.onNextStep}>
                    <Input label="Email"
                           type="text"
                           name="email"
                           validations="isEmail"
                           validationError="Please enter a valid email address"
                           required />
                    <Input label="Confirm Email"
                           type="text"
                           name="confirmEmail"
                           validations="equalsField:email"
                           validationErrors={{
                               equalsField: 'The emails do not match'
                           }}
                           required />
                    <Button type="submit">Next Step</Button>
                </Form>
            </FormStep>
        );
    }
});
var LastStep = React.createClass({
    render: function () {
        return (
            <FormStep title="Almost Done"
                      description={
                        <p>
                            Lorem ipsum dolor sit amet
                        </p>}>
                <div className="confirm">
                    <h2>Confirm Your Email</h2>
                    <p>
                        Click the link in the confirmation email that we
                        sent to the following address:<br />
                        <strong>{this.props.formData.email}</strong>
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
            </FormStep>
        );
    }
});


var TeacherRegistration = React.createClass({
    type: 'TeacherRegistration',
    getInitialState: function () {
        return {
            step: 0,
            formData: {}
        };
    },
    setStep: function (step) {
        this.setState({step: step});
    },
    advanceStep: function (formData) {
        formData = formData || {};
        this.setState({
            step: this.state.step + 1,
            formData: defaults({}, formData, this.state.formData)
        });
    },
    render: function () {
        var classes = classNames(
            'teacher-registration',
            'inner',
            this.props.className);
        return (
            <div {...this.props} className={classes}>
                <FormSet {... this.props}
                         step={this.state.step}>
                    <UsernameStep formData={this.state.formData} onNextStep={this.advanceStep} />
                    <DemographicsStep formData={this.state.formData} onNextStep={this.advanceStep} />
                    <NameStep formData={this.state.formData} onNextStep={this.advanceStep} />
                    <PhoneNumberStep formData={this.state.formData} onNextStep={this.advanceStep} />
                    <OrganizationStep formData={this.state.formData} onNextStep={this.advanceStep} />
                    <AddressStep formData={this.state.formData} onNextStep={this.advanceStep} />
                    <UseScratchStep formData={this.state.formData} onNextStep={this.advanceStep} />
                    <EmailStep formData={this.state.formData} onNextStep={this.advanceStep} />
                    <LastStep formData={this.state.formData} />
                </FormSet>
            </div>
        );
    }
});

render(<Page><TeacherRegistration /></Page>, document.getElementById('app'));
