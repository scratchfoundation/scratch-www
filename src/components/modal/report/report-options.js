const PropTypes = require('prop-types');

const {
    arrayOf,
    string,
    shape,
    bool
} = PropTypes;

/**
 * Define both the PropType shape and default value for report options
 * to ensure structure is validated by PropType checking going forward.
 */

const messageShape = shape({
    id: string.isRequired
});

const subcategoryShape = shape({
    value: string.isRequired,
    label: messageShape.isRequired,
    prompt: messageShape.isRequired,
    prompt2: messageShape,
    list: arrayOf(messageShape),
    preventSubmission: bool
});

const categoryShape = shape({
    value: string.isRequired,
    label: messageShape.isRequired,
    prompt: messageShape.isRequired,
    subcategories: arrayOf(subcategoryShape)
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
        prompt: {id: 'report.promptGuidelines'},
        subcategories: [
            {
                value: '',
                label: {id: 'report.reasonPlaceHolder'},
                prompt: {id: 'report.promptPlaceholder'}
            },
            {
                value: 'report.reasonDontLikeIt',
                label: {id: 'report.reasonDontLikeIt'},
                prompt: {id: 'report.promptDontLikeIt'},
                prompt2: {id: 'report.promptDontLikeIt'},
                list: [
                    {id: 'report.itemSupportive'},
                    {id: 'report.itemConstructive'},
                    {id: 'report.itemSpecific'}
                ],
                preventSubmission: true
            },
            {
                value: 'report.reasonDoesntWork',
                label: {id: 'report.reasonDoesntWork'},
                prompt: {id: 'report.promptDoesntWork'},
                preventSubmission: true
            },
            {
                value: 'report.reasonCouldImprove',
                label: {id: 'report.reasonCouldImprove'},
                prompt: {id: 'report.promptCouldImprove'},
                preventSubmission: true
            },
            {
                value: 'report.reasonTooHard',
                label: {id: 'report.reasonTooHard'},
                prompt: {id: 'report.promptTooHard'},
                preventSubmission: true
            },
            {
                value: '9',
                label: {id: 'report.reasonMisleading'},
                prompt: {id: 'report.promptMisleading'}
            },
            {
                value: '10',
                label: {id: 'report.reasonFaceReveal'},
                prompt: {id: 'report.promptFaceReveal'}
            },
            {
                value: '11',
                label: {id: 'report.reasonNoRemixingAllowed'},
                prompt: {id: 'report.promptNoRemixingAllowed'}
            },
            {
                value: '12',
                label: {id: 'report.reasonCreatorsSafety'},
                prompt: {id: 'report.promptCreatorsSafety'}
            },
            {
                value: '13',
                label: {id: 'report.reasonSomethingElse'},
                prompt: {id: 'report.promptSomethingElse'}
            }
        ]


    }
];

module.exports = {
    reportOptionsShape,
    REPORT_OPTIONS
};
