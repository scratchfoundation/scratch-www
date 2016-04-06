var classNames = require('classnames');
var React = require('react');

var render = require('../../lib/render.jsx');

var formset = require('../../components/formset/formset.jsx');
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
                        Lipsum 
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
                        Lipsum 
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
                        Lipsum 
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
                        Lipsum 
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
                        Lipsum 
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
                        Lipsum 
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
                        Lipsum 
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
