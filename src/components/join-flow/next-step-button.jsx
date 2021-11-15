const intl = require('react-intl');
const omit = require('lodash.omit');
const React = require('react');
const PropTypes = require('prop-types');

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
        {props.waiting ? (
            <Spinner className="next-step-spinner" />
        ) : (
            <ModalTitle
                className="next-step-title"
                title={props.content ? props.content : props.intl.formatMessage({id: 'general.next'})}
            />
        )}
    </button>
);

NextStepButton.propTypes = {
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    intl: intl.IntlShape,
    waiting: PropTypes.bool
};

NextStepButton.defaultProps = {
    waiting: false
};

module.exports = intl.injectIntl(NextStepButton);
