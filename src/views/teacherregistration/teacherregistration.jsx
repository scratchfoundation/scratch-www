var classNames = require('classnames');
var React = require('react');

var render = require('../../lib/render.jsx');

var Button = require('../../components/forms/button.jsx');
var formset = require('../../components/forms/formset.jsx');
    var FormSet = formset.FormSet;
    var FormStep = formset.FormStep;
var Input = require('../../components/forms/input.jsx');
var Page = require('../../components/page/www/page.jsx');
var Select = require('../../components/forms/select.jsx');
var TextArea = require('../../components/forms/textarea.jsx');

var TeacherRegistration = React.createClass({
    type: 'TeacherRegistration',
    getInitialState: function () {
        return {
            step: 0
        }
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
            this.props.className);
        return (
            <FormSet {... this.props}
                     className={classes}
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
                        <label htmlFor="username">Username</label>
                        <Input type="text" name="username" />
                        <label htmlFor="password">Password</label>
                        <Input type="password" name="password" />
                        <label htmlFor="passwordConfirmation">Confirm Password</label>
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
                        <label htmlFor="month">Birth Month</label>
                        <Select name="month">
                            {months.map(function (name, id) {
                                return (<option value={id+1} key={id}>{name}</option>);
                              })}
                        </Select>
                        <label htmlFor="year">Birth Yeah</label>
                        <Select name="year">
                            {Array.apply(null, Array(100)).map(function (v, id) {
                                return (<option value={2016-id} key={id}>{2016-id}</option>);
                            })}
                        </Select>
                        <label>Gender</label>
                        <Input type="radio" name="gender" id="genderFemale" value="female" />
                        <label htmlFor="genderFemale">Female</label>
                        <Input type="radio" name="gender" id="genderMale" value="male" />
                        <label htmlFor="genderMale">Male</label>
                        <Input type="radio" name="gender" value="genderOther" />
                        <Input name="genderOther" type="text" />
                        <label htmlFor="country">Country</label>
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
                        <label htmlFor="first">First Name</label>
                        <Input type="text" name="first" />
                        <label htmlFor="last">Last Name</label>
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
                        <label htmlFor="phone">Phone Number</label>
                        <Input type="tel" name="phone" />
                        <Input type="checkbox" name="phoneConsent" />
                        <label htmlFor="phoneConsent">
                            Yes, I consent to lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                        </label>
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
                        <label htmlFor="organization">Organization</label>
                        <Input type="text" name="organization" />
                        <label htmlFor="title">Title / Position</label>
                        <Input type="text" name="title" />
                        <label>Type of Organization</label>
                        {['Elementary School', 'Middle School',
                          'High School', 'University / College',
                          'Museum', 'Library', 'Camp'].map(function (type, id) {
                            var typeId = 'organizationType' + id;
                            return [
                                <Input type="checkbox"
                                       name="organizationType"
                                       id={typeId}
                                       value={type} />,
                                <label htmlFor={typeId}>{type}</label>
                            ];
                          })}
                        <Input type="checkbox" name="organizationType" value="other" />
                        <Input type="text" name="organizationTypeOther" />
                        <label htmlFor="website">Website URL (not required)</label>
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
                        <label htmlFor="addressCountry">Country</label>
                        <Select name="addressCountry">
                            {Object.keys(countries).map(function (code, id) {
                                return (<option value={code} key={id}>{countries[code]}</option>);
                              })}
                        </Select>
                        <label htmlFor="addressLine1">Address Line 1</label>
                        <Input type="text" name="addressLine1" />
                        <label htmlFor="addressLine2">Address Line 2</label>
                        <Input type="text" name="addressLine2" />
                        <label htmlFor="addressCity">City</label>
                        <Input type="text" name="addressCity" />
                        <label htmlFor="addressZip">Zip Code</label>
                        <Input type="text" name="addressZip" />
                        <label htmlFor="addressState">State / Province</label>
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
                        <label htmlFor="useScratch">How do you use Scratch?</label>
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
                        <label htmlFor="email">Email</label>
                        <Input type="text" name="email" />
                        <label htmlFor="confirmEmail">Confirm Email</label>
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
        );
    }
});

render(<Page><TeacherRegistration /></Page>, document.getElementById('app'));
