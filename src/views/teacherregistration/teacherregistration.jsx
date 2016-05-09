var classNames = require('classnames');
var React = require('react');

var render = require('../../lib/render.jsx');

var Button = require('../../components/forms/button.jsx');
var formset = require('../../components/forms/formset.jsx');
var FormSet = formset.FormSet;
var FormStep = formset.FormStep;
var Input = require('../../components/forms/input.jsx');
var Label = require('../../components/forms/label.jsx');
var Page = require('../../components/page/www/page.jsx');
var Select = require('../../components/forms/select.jsx');
var TextArea = require('../../components/forms/textarea.jsx');

require('./teacherregistration.scss');

var TeacherRegistration = React.createClass({
    type: 'TeacherRegistration',
    getInitialState: function () {
        return {
            step: 0
        };
    },
    setStep: function (step) {
        this.setState({step: step});
    },
    render: function () {
        var months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'];
        var countries = require('./countries.json');
        var classes = classNames(
            'teacher-registration',
            'inner',
            this.props.className);
        return (
            <div {...this.props} className={classes}>
                <FormSet {... this.props}
                         step={this.state.step}
                         onSetStep={this.setStep}>
                    <FormStep title="Create a Teacher Account"
                              description={
                                <p>
                                    Creating a Teacher Account requires additional information
                                    for review.
                                    <strong>The approval process can take up to 24 hours</strong>
                                </p>}
                              key="step1">
                        <form>
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" name="username" />
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" name="password" />
                            <Label htmlFor="passwordConfirmation">Confirm Password</Label>
                            <Input type="password" name="passwordConfirmation" />
                            <Button type="submit">Next Step</Button>
                        </form>
                    </FormStep>
                    <FormStep title="Demographics"
                              description={
                                <p>
                                    Your responses to these questions will be kept private.
                                    Why do we ask for this information <a onClick={this.handle}>?</a>
                                </p>}
                              key="step2">
                        <form>
                            <Label htmlFor="month">Birth Month</Label>
                            <Select name="month">
                                {months.map(function (name, id) {
                                    return (<option value={id+1} key={id}>{name}</option>);
                                })}
                            </Select>
                            <Label htmlFor="year">Birth Yeah</Label>
                            <Select name="year">
                                {Array.apply(null, Array(100)).map(function (v, id) {
                                    return (<option value={2016-id} key={id}>{2016-id}</option>);
                                })}
                            </Select>
                            <Label>Gender</Label>
                            <Input type="radio" name="gender" id="genderFemale" value="female" />
                            <Label htmlFor="genderFemale">Female</Label>
                            <Input type="radio" name="gender" id="genderMale" value="male" />
                            <Label htmlFor="genderMale">Male</Label>
                            <Input type="radio" name="gender" value="genderOther" />
                            <Input name="genderOther" type="text" />
                            <Label htmlFor="country">Country</Label>
                            <Select name="country">
                                {Object.keys(countries).map(function (code, id) {
                                    return (<option value={code} key={id}>{countries[code]}</option>);
                                })}
                            </Select>
                            <Button type="submit">Next Step</Button>
                        </form>
                    </FormStep>
                    <FormStep title="First &amp; Last Name"
                              description={
                                <p>
                                    Your responses to these questions will be kept private.
                                    Why do we ask for this information <a onClick={this.handle}>?</a>
                                </p>}
                              key="step3">
                        <form>
                            <Label htmlFor="first">First Name</Label>
                            <Input type="text" name="first" />
                            <Label htmlFor="last">Last Name</Label>
                            <Input type="text" name="last" />
                            <Button type="submit">Next Step</Button>
                        </form>
                    </FormStep>
                    <FormStep title="Phone Number"
                              description={
                                <p>
                                    Your responses to these questions will be kept private.
                                    Why do we ask for this information <a onClick={this.handle}>?</a>
                                </p>}
                              key="step4">
                        <form>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input type="tel" name="phone" />
                            <Input type="checkbox" name="phoneConsent" />
                            <Label htmlFor="phoneConsent">
                                Yes, I consent to lorem ipsum dolor sit amet,
                                consectetur adipiscing elit.
                            </Label>
                            <Button type="submit">Next Step</Button>
                        </form>
                    </FormStep>
                    <FormStep title="Organization"
                              description={
                                <p>
                                    Your responses to these questions will be kept private.
                                    Why do we ask for this information <a onClick={this.handle}>?</a>
                                </p>}
                              key="step5">
                        <form>
                            <Label htmlFor="organization">Organization</Label>
                            <Input type="text" name="organization" />
                            <Label htmlFor="title">Title / Position</Label>
                            <Input type="text" name="title" />
                            <Label>Type of Organization</Label>
                            {['Elementary School', 'Middle School',
                              'High School', 'University / College',
                              'Museum', 'Library', 'Camp'].map(function (type, id) {
                                var typeId = 'organizationType' + id;
                                return [
                                    <Input type="checkbox"
                                           name="organizationType"
                                           id={typeId}
                                           value={type} />,
                                    <Label htmlFor={typeId}>{type}</Label>
                                ];
                            })}
                            <Input type="checkbox" name="organizationType" value="other" />
                            <Input type="text" name="organizationTypeOther" />
                            <Label htmlFor="website">Website URL (not required)</Label>
                            <Input type="url" name="website" />
                            <Button type="submit">Next Step</Button>
                        </form>
                    </FormStep>
                    <FormStep title="Address"
                              description={
                                <p>
                                    Your responses to these questions will be kept private.
                                    Why do we ask for this information <a onClick={this.handle}>?</a>
                                </p>}
                              key="step6">
                        <form>
                            <Label htmlFor="addressCountry">Country</Label>
                            <Select name="addressCountry">
                                {Object.keys(countries).map(function (code, id) {
                                    return (<option value={code} key={id}>{countries[code]}</option>);
                                })}
                            </Select>
                            <Label htmlFor="addressLine1">Address Line 1</Label>
                            <Input type="text" name="addressLine1" />
                            <Label htmlFor="addressLine2">Address Line 2</Label>
                            <Input type="text" name="addressLine2" />
                            <Label htmlFor="addressCity">City</Label>
                            <Input type="text" name="addressCity" />
                            <Label htmlFor="addressZip">Zip Code</Label>
                            <Input type="text" name="addressZip" />
                            <Label htmlFor="addressState">State / Province</Label>
                            <Select name="addressState">
                                {['every','state','in','the','world'].map(function (name, id) {
                                    return <option value={name} key={id}>{name}</option>;
                                })}
                            </Select>
                            <Button type="submit">Next Step</Button>
                        </form>
                    </FormStep>
                    <FormStep title="How do you use Scratch?"
                              description={
                                <p>
                                    Tell us a little how you plan to use Scratch.
                                    Why do we ask for this information <a onClick={this.handle}>?</a>
                                </p>}
                              key="step7">
                        <form>
                            <Label htmlFor="useScratch">How do you use Scratch?</Label>
                            <TextArea name="useScratch" />
                            <Button type="submit">Next Step</Button>
                        </form>
                    </FormStep>
                    <FormStep title="Email Address"
                              description={
                                <p>
                                    We will send you a <strong>confirmation email</strong> that will
                                    allow you to access your Scratch Teacher Account.
                                </p>}
                              key="step8">
                        <form>
                            <Label htmlFor="email">Email</Label>
                            <Input type="text" name="email" />
                            <Label htmlFor="confirmEmail">Confirm Email</Label>
                            <Input type="text" name="confirmEmail" />
                            <Button type="submit">Next Step</Button>
                        </form>
                    </FormStep>
                    <FormStep title="Almost Done"
                              description={
                                <p>
                                    Lorem ipsum dolor sit amet
                                </p>}
                              key="step8">
                        <div className="confirm">
                            <h2>Confirm Your Email</h2>
                            <p>
                                Click the link in the confirmation email that we
                                sent to the following address:<br />
                                <strong>{this.state.email}</strong>
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
                </FormSet>
            </div>
        );
    }
});

render(<Page><TeacherRegistration /></Page>, document.getElementById('app'));
