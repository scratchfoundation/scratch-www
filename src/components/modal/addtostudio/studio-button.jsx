const PropTypes = require('prop-types');
const React = require('react');
const classNames = require('classnames');

const Spinner = require('../../spinner/spinner.jsx');
const AnimateHOC = require('./animate-hoc.jsx');

require('./modal.scss');

const StudioButton = ({
    canAdd,
    canRemove,
    hasRequestOutstanding,
    includesProject,
    title,
    onClick,
    wasClicked
}) => {
    const checkmark = (
        <img
            alt="checkmark-icon"
            className={classNames(
                'studio-status-icon-checkmark-img',
                {'studio-status-icon-with-animation': wasClicked}
            )}
            src="/svgs/modal/confirm.svg"
        />
    );
    const plus = (
        <img
            alt="plus-icon"
            className={classNames(
                'studio-status-icon-plus-img',
                {'studio-status-icon-with-animation': wasClicked}
            )}
            src="/svgs/modal/add.svg"
        />
    );
    return (
        <div
            className={classNames(
                'studio-selector-button',
                {
                    'studio-selector-button-waiting': hasRequestOutstanding,
                    'studio-selector-button-selected': includesProject && !hasRequestOutstanding,
                    'studio-selector-button-enabled': includesProject ? canRemove : canAdd,
                    'studio-selector-button-disabled': includesProject ? !canRemove : !canAdd
                }
            )}
            onClick={onClick}
        >
            <div
                className={classNames(
                    'studio-selector-button-text',
                    {'studio-selector-button-text-selected': includesProject || hasRequestOutstanding},
                    {'studio-selector-button-text-unselected': !includesProject && !hasRequestOutstanding}
                )}
                title={title}
            >
                {title}
            </div>
            <div
                className={classNames(
                    'studio-status-icon',
                    {'studio-status-icon-unselected': !includesProject && !hasRequestOutstanding}
                )}
            >
                {(hasRequestOutstanding ?
                    <Spinner /> :
                    (includesProject ? checkmark : plus))}
            </div>
        </div>
    );
};

StudioButton.propTypes = {
    canAdd: PropTypes.bool,
    canRemove: PropTypes.bool,
    hasRequestOutstanding: PropTypes.bool,
    includesProject: PropTypes.bool,
    onClick: PropTypes.func,
    title: PropTypes.string,
    wasClicked: PropTypes.bool
};

module.exports = AnimateHOC(StudioButton);
