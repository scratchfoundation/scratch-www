const omit = require('lodash.omit');
const React = require('react');
const PropTypes = require('prop-types');
const injectIntl = require('react-intl').injectIntl;

const intl = require('../../lib/intl.jsx');
const Spinner = require('../../components/spinner/spinner.jsx');
const ModalTitle = require('../modal/base/modal-title.jsx');

require('./next-step-button.scss');

const NextStepButton = props => (
    <button
        className="modal-flush-bottom-button"
        disabled={props.waiting}
        type="submit"
        {...omit(props, ['intl', 'text', 'waiting'])}
    >
        {props.waiting ?
            <Spinner /> : (
                <ModalTitle
                    className="modal-title-large"
                    title={props.text ? props.text : props.intl.formatMessage({id: 'registration.nextStep'})}
                />
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
