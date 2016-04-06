var classNames = require('classnames');
var React = require('react');

var render = require('../../lib/render.jsx');

var formset = require('../../components/forms/formset.jsx');
    var FormSet = formset.FormSet;
    var FormStep = formset.FormStep;
var Page = require('../../components/page/www/page.jsx');

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
                        <input type="text" name="username" />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" />
                        <label htmlFor="passwordConfirmation">Confirm Password</label>
                        <input type="password" name="passwordConfirmation" />
                        <input type="submit" value="Next Step" />
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
                        <select name="month">
                            {months.map(function (name, id) {
                                return (<option value={id+1} key={id}>{name}</option>);
                              })}
                        </select>
                        <label htmlFor="year">Birth Yeah</label>
                        <select name="year">
                            {Array.apply(null, Array(100)).map(function (v, id) {
                                return (<option value={2016-id} key={id}>{2016-id}</option>);
                            })}
                        </select>
                        <label htmlFor="gender">Gender</label>
                        <radio name="gender" value="female" />
                        <radio name="gender" value="male" />
                        <radio name="gender" />
                        <input name="gender" type="text" />
                        <label htmlFor="country">Country</label>
                        <select name="country">
                            {Object.keys(countries).map(function (code, id) {
                                return (<option value={code} key={id}>{countries[code]}</option>);
                              })}
                        </select>
                        <input type="submit" value="Next Step" />
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
                        <input type="text" name="first" />
                        <label htmlFor="last">Last Name</label>
                        <input type="text" name="last" />
                        <input type="submit" value="Next Step" />
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
                        <input type="tel" name="phone" />
                        <checkbox name="phoneConsent" />
                        <label htmlFor="phoneConsent">
                            Yes, I consent to lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                        </label>
                        <input type="submit" value="Next Step" /> 
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
                        <input type="text" name="organization" />
                        <label htmlFor="title">Title / Position</label>
                        <input type="text" name="title" />
                        <label>Type of Organization</label>
                        {['Elementary School', 'Middle School',
                          'High School', 'University / College',
                          'Museum', 'Library', 'Camp'].map(function (type, id) {
                            var typeId = 'organizationType' + id;
                            return [
                                <input type="checkbox"
                                       name="organizationType"
                                       id={typeId}
                                       value={type} />,
                                <label htmlFor={typeId}>{type}</label>
                            ];
                          })}
                        <input type="checkbox" name="organizationType" value="other" />
                        <input type="text" name="organizationTypeOther" />
                        <label htmlFor="website">Website URL (not required)</label>
                        <input type="url" name="website" />
                        <input type="submit" value="Next Step" />
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
                        <label for="addressCountry">Country</label>
                        <select name="addressCountry">
                            {Object.keys(countries).map(function (code, id) {
                                return (<option value={code} key={id}>{countries[code]}</option>);
                              })}
                        </select>
                        <label for="addressLine1">Address Line 1</label>
                        <input type="text" name="addressLine1" />
                        <label for="addressLine2">Address Line 2</label>
                        <input type="text" name="addressLine2" />
                        <label for="addressCity">City</label>
                        <input type="text" name="addressCity" />
                        <label for="addressZip">Zip Code</label>
                        <input type="text" name="addressZip" />
                        <label for="addressState">State / Province</label>
                        <select name="addressState">
                            {['every','state','in','the','world'].map(function (name, id) {
                                return <option value={name} key={id}>{name}</option>;
                            })}
                        </select>
                        <input type="submit" value="Next Step" />
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
                        <input type="submit" value="Next Step" />
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
                        <label for="useScratch">How do you use Scratch?</label>
                        <textarea name="useScratch" />
                        <input type="submit" value="Next Step" />
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
