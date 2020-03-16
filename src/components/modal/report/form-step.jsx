const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const classNames = require('classnames');

const Form = require('../../forms/form.jsx');
const Button = require('../../forms/button.jsx');
const Spinner = require('../../spinner/spinner.jsx');
const FlexRow = require('../../flex-row/flex-row.jsx');
require('../../forms/button.scss');

/**
 * Step to be used in a form progression. Provides wrapping form element,
 * renders children input elements, then provides a next button row
 * that responds to form validation and submission spinner.
 */
class FormStep extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            valid: false
        };
        bindAll(this, [
            'handleValid',
            'handleInvalid'
        ]);
    }
    handleValid () {
        this.setState({valid: true});
    }
    handleInvalid () {
        this.setState({valid: false});
    }
    render () {
        const {onNext, children, isWaiting, nextLabel} = this.props;
        // Submit button is enabled if form isn't already submitting, and either the form passes validation,
        // or the submitEnabled prop is true. This lets submitEnabled prop override validation.
        const submitEnabled = (this.props.submitEnabled || this.state.valid) && !isWaiting;
        const submitDisabledParam = submitEnabled ? {} : {disabled: 'disabled'};
        return (
            <Form
                onInvalid={this.handleInvalid}
                onValid={this.handleValid}
                onValidSubmit={onNext}
            >
                {children}
                <FlexRow className="action-buttons">
                    <Button
                        className={classNames(
                            'action-button',
                            'submit-button',
                            {disabled: !submitEnabled}
                        )}
                        {...submitDisabledParam}
                        key="submitButton"
                        type="submit"
                    >
                        {isWaiting ? (
                            <div className="action-button-text">
                                <Spinner />
                                <FormattedMessage id="report.sending" />
                            </div>
                        ) : (
                            <div className="action-button-text">
                                <FormattedMessage {...nextLabel} />
                            </div>
                        )}
                    </Button>
                </FlexRow>
            </Form>
        );
    }
}

FormStep.propTypes = {
    children: PropTypes.node.isRequired,
    isWaiting: PropTypes.bool,
    nextLabel: PropTypes.shape({id: PropTypes.string.isRequired}).isRequired,
    onNext: PropTypes.func.isRequired,
    submitEnabled: PropTypes.bool
};

FormStep.defaultProps = {
    isWaiting: false,
    submitEnabled: false
};

module.exports = FormStep;
