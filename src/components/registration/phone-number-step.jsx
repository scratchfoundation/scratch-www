/* eslint-disable react/no-multi-comp */
const bindAll = require('lodash.bindall');
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const PropTypes = require('prop-types');
const React = require('react');

const intl = require('../../lib/intl.jsx');

const Card = require('../../components/card/card.jsx');
const Checkbox = require('../../components/forms/checkbox.jsx');
const Form = require('../../components/forms/form.jsx');
const PhoneInput = require('../../components/forms/phone-input.jsx');
const Slide = require('../../components/slide/slide.jsx');
const StepNavigation = require('../../components/stepnavigation/stepnavigation.jsx');
const Tooltip = require('../../components/tooltip/tooltip.jsx');

require('./steps.scss');

/*
 * This step is separate from the other steps because it includes a large library
 * for phone number validation. 
 */
class PhoneNumberStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleValidSubmit'
        ]);
    }
    handleValidSubmit(formData, reset, invalidate) {
        if (!formData.phone || formData.phone.national_number === '+') {
            return invalidate({
                phone: this.props.intl.formatMessage({id: 'form.validationRequired'})
            });
        }
        return this.props.onNextStep(formData);
    }
    render() {
        return (
            <Slide className="registration-step phone-step">
                <h2>
                    <intl.FormattedMessage id="teacherRegistration.phoneNumber" />
                </h2>
                <p className="description">
                    <intl.FormattedMessage id="teacherRegistration.phoneStepDescription" />
                    <Tooltip
                        tipContent={
                            this.props.intl.formatMessage({id: 'registration.nameStepTooltip'})
                        }
                        title={'?'}
                    />
                </p>
                <Card>
                    <Form onValidSubmit={this.handleValidSubmit}>
                        <PhoneInput
                            required
                            defaultCountry={this.props.defaultCountry}
                            label={
                                this.props.intl.formatMessage({id: 'teacherRegistration.phoneNumber'})
                            }
                            name="phone"
                        />
                        <Checkbox
                            name="phoneConsent"
                            required="isFalse"
                            validationErrors={{
                                isFalse: this.props.intl.formatMessage({
                                    id: 'teacherRegistration.validationPhoneConsent'
                                })
                            }}
                            valueLabel={
                                this.props.intl.formatMessage({id: 'teacherRegistration.phoneConsent'})
                            }
                        />
                        <NextStepButton
                            text={<intl.FormattedMessage id="registration.nextStep" />}
                            waiting={this.props.waiting}
                        />
                    </Form>
                </Card>
                <StepNavigation
                    active={this.props.activeStep}
                    steps={this.props.totalSteps - 1}
                />
            </Slide>
        );
    }
}

PhoneNumberStep.propTypes = {
    activeStep: PropTypes.number,
    defaultCountry: PropTypes.string,
    intl: intlShape,
    onNextStep: PropTypes.func,
    totalSteps: PropTypes.number,
    waiting: PropTypes.bool
};

PhoneNumberStep.defaultProps = {
    defaultCountry: DEFAULT_COUNTRY,
    waiting: false
};

const IntlPhoneNumberStep = injectIntl(PhoneNumberStep);

module.exports = IntlPhoneNumberStep;