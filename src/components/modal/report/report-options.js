const PropTypes = require('prop-types');

const {
    arrayOf,
    string,
    shape
} = PropTypes;

/**
 * Define both the PropType shape and default value for report options
 * to ensure structure is validated by PropType checking going forward.
 */

const messageShape = shape({
    id: string.isRequired
});

const categoryShape = shape({
    value: string.isRequired,
    label: messageShape.isRequired,
    prompt: messageShape.isRequired
});

const reportOptionsShape = arrayOf(categoryShape);

const REPORT_OPTIONS = [
    {
        value: '',
        label: {id: 'report.reasonPlaceHolder'},
        prompt: {id: 'report.promptPlaceholder'}
    },
    {
        value: '0',
        label: {id: 'report.reasonCopy'},
        prompt: {id: 'report.promptCopy'}
    },
    {
        value: '1',
        label: {id: 'report.reasonUncredited'},
        prompt: {id: 'report.promptUncredited'}
    },
    {
        value: '2',
        label: {id: 'report.reasonScary'},
        prompt: {id: 'report.promptScary'}
    },
    {
        value: '3',
        label: {id: 'report.reasonLanguage'},
        prompt: {id: 'report.promptLanguage'}
    },
    {
        value: '4',
        label: {id: 'report.reasonMusic'},
        prompt: {id: 'report.promptMusic'}
    },
    {
        value: '8',
        label: {id: 'report.reasonImage'},
        prompt: {id: 'report.promptImage'}
    },
    {
        value: '5',
        label: {id: 'report.reasonPersonal'},
        prompt: {id: 'report.promptPersonal'}
    },
    {
        value: '6',
        label: {id: 'general.other'},
        prompt: {id: 'report.promptGuidelines'}
    }
];

module.exports = {
    reportOptionsShape,
    REPORT_OPTIONS
};
