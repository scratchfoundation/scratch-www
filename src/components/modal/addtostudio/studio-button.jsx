const truncateAtWordBoundary = require('../../../lib/truncate').truncateAtWordBoundary;
const PropTypes = require('prop-types');
const React = require('react');
const classNames = require('classnames');
const Spinner = require('../../spinner/spinner.jsx');

require('./modal.scss');

const StudioButton = ({
    hasRequestOutstanding,
    id,
    includesProject,
    title,
    onToggleStudio
}) => {
    const checkmark = (
        <img
            alt="checkmark-icon"
            className="studio-status-icon-checkmark-img"
            src="/svgs/modal/confirm.svg"
        />
    );
    const plus = (
        <img
            alt="plus-icon"
            className="studio-status-icon-plus-img"
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
            onClick={onToggleStudio}
        >
            <div
                className={classNames(
                    'studio-selector-button-text',
                    {'studio-selector-button-text-selected': includesProject},
                    {'studio-selector-button-text-unselected': !includesProject}
                )}
            >
                {truncateAtWordBoundary(title, 25)}
            </div>
            <div
                className={classNames(
                    'studio-status-icon',
                    {'studio-status-icon-unselected': !includesProject}
                )}
            >
                {(hasRequestOutstanding ?
                    (<Spinner mode="smooth" />) :
                    (includesProject ? checkmark : plus))}
            </div>
        </div>
    );
};

StudioButton.propTypes = {
    hasRequestOutstanding: PropTypes.bool,
    id: PropTypes.number,
    includesProject: PropTypes.bool,
    onToggleStudio: PropTypes.func,
    title: PropTypes.string
};

module.exports = StudioButton;
