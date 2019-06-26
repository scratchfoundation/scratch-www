const omit = require('lodash.omit');
const React = require('react');
const PropTypes = require('prop-types');
const injectIntl = require('react-intl').injectIntl;

const intl = require('../../lib/intl.jsx');
const Spinner = require('../../components/spinner/spinner.jsx');

const NextStepButton = props => (
    <button
        disabled={props.waiting}
        type="submit"
        {...omit(props, ['text', 'waiting'])}
    >
        {props.waiting ?
            <Spinner /> :
            (props.text ?
                props.text : (
                    <intl.FormattedMessage id="registration.nextStep" />
                )
            )
        }
    </button>
);

NextStepButton.propTypes = {
    intl: intl.intlShape,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    waiting: PropTypes.bool
};

NextStepButton.defaultProps = {
    waiting: false
};

module.exports = injectIntl(NextStepButton);
