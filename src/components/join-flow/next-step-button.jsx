const React = require('react');
const PropTypes = require('prop-types');
const injectIntl = require('react-intl').injectIntl;

const intlShape = require('../../lib/intl-shape');
const Spinner = require('../../components/spinner/spinner.jsx');
const ModalTitle = require('../modal/base/modal-title.jsx');

require('./next-step-button.scss');

const NextStepButton = ({
    content,
    intl,
    waiting = false,
    ...restProps
} = {}) => (
    <button
        className="modal-flush-bottom-button"
        disabled={waiting}
        type="submit"
        {...restProps}
    >
        {waiting ? (
            <Spinner className="next-step-spinner" />
        ) : (
            <ModalTitle
                className="next-step-title"
                title={content ? content : intl.formatMessage({id: 'general.next'})}
            />
        )}
    </button>
);

NextStepButton.propTypes = {
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    intl: intlShape,
    waiting: PropTypes.bool
};

module.exports = injectIntl(NextStepButton);
