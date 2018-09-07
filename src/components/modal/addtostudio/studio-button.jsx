const PropTypes = require('prop-types');
const React = require('react');
const classNames = require('classnames');

const AnimateHOC = require('./animate-hoc.jsx');

require('./modal.scss');

const StudioButton = ({
    hasRequestOutstanding,
    id,
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
    const spinner = (
        <img
            alt="loading animation"
            className="studio-status-icon-spinner"
            src="/svgs/modal/spinner.svg"
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
                {'studio-selector-button-waiting': hasRequestOutstanding},
                {'studio-selector-button-selected':
                    includesProject && !hasRequestOutstanding}
            )}
            data-id={id}
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
                {title}{wasClicked}
            </div>
            <div
                className={classNames(
                    'studio-status-icon',
                    {'studio-status-icon-unselected': !includesProject && !hasRequestOutstanding}
                )}
            >
                {(hasRequestOutstanding ?
                    spinner :
                    (includesProject ? checkmark : plus))}
            </div>
        </div>
    );
};

StudioButton.propTypes = {
    hasRequestOutstanding: PropTypes.bool,
    id: PropTypes.number,
    includesProject: PropTypes.bool,
    onClick: PropTypes.func,
    title: PropTypes.string,
    wasClicked: PropTypes.bool
};

module.exports = AnimateHOC(StudioButton);
