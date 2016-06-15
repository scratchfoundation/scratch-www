var defaults = require('lodash.defaultsdeep');
var React = require('react');
var render = require('../../lib/render.jsx');

var Deck = require('../../components/deck/deck.jsx');
var Progression = require('../../components/progression/progression.jsx');
var Steps = require('./steps.jsx');

require('./teacherregistration.scss');


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
        return (
            <Deck className="teacher-registration">
                <Progression step={this.state.step}>
                    <Steps.UsernameStep formData={this.state.formData} onNextStep={this.advanceStep} />
                    <Steps.DemographicsStep formData={this.state.formData} onNextStep={this.advanceStep} />
                    <Steps.NameStep formData={this.state.formData} onNextStep={this.advanceStep} />
                    <Steps.PhoneNumberStep formData={this.state.formData} onNextStep={this.advanceStep} />
                    <Steps.OrganizationStep formData={this.state.formData} onNextStep={this.advanceStep} />
                    <Steps.AddressStep formData={this.state.formData} onNextStep={this.advanceStep} />
                    <Steps.UseScratchStep formData={this.state.formData} onNextStep={this.advanceStep} />
                    <Steps.EmailStep formData={this.state.formData} onNextStep={this.advanceStep} />
                    <Steps.LastStep formData={this.state.formData} />
                </Progression>
            </Deck>
        );
    }
});

render(<TeacherRegistration />, document.getElementById('app'));
