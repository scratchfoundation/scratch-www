const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;

const PropTypes = require('prop-types');

const {
    arrayOf,
    node,
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
    prompt: node.isRequired,
    preventSubmission: bool
});

const categoryShape = shape({
    value: string.isRequired,
    label: messageShape.isRequired,
    prompt: node.isRequired,
    subcategories: arrayOf(subcategoryShape)
});

const reportOptionsShape = arrayOf(categoryShape);

const REPORT_OPTIONS = [
    {
        value: '',
        label: {id: 'report.reasonPlaceHolder'},
        prompt: <FormattedMessage id="report.promptPlaceholder" />
    },
    {
        value: '0',
        label: {id: 'report.reasonCopy'},
        prompt: <FormattedMessage id="report.promptCopy" />
    },
    {
        value: '1',
        label: {id: 'report.reasonUncredited'},
        prompt: <FormattedMessage id="report.promptUncredited" />
    },
    {
        value: '2',
        label: {id: 'report.reasonScary'},
        prompt: <FormattedMessage id="report.promptScary" />
    },
    {
        value: '3',
        label: {id: 'report.reasonLanguage'},
        prompt: <FormattedMessage id="report.promptLanguage" />
    },
    {
        value: '4',
        label: {id: 'report.reasonMusic'},
        prompt: <FormattedMessage id="report.promptMusic" />
    },
    {
        value: '8',
        label: {id: 'report.reasonImage'},
        prompt: <FormattedMessage id="report.promptImage" />
    },
    {
        value: '5',
        label: {id: 'report.reasonPersonal'},
        prompt: <FormattedMessage id="report.promptPersonal" />
    },
    {
        value: '6',
        label: {id: 'general.other'},
        prompt: <FormattedMessage id="report.promptGuidelines" />,
        subcategories: [
            {
                value: '',
                label: {id: 'report.reasonPlaceHolder'},
                prompt: <FormattedMessage id="report.promptPlaceholder" />
            },
            {
                value: 'report.reasonDontLikeIt',
                label: {id: 'report.reasonDontLikeIt'},
                prompt: (
                    <div>
                        <p><FormattedMessage id="report.promptDontLikeIt" /></p>
                        <p><FormattedMessage id="report.promptTips" /></p>
                        <ul>
                            <li><FormattedMessage id="report.tipsSupportive" /></li>
                            <li><FormattedMessage id="report.tipsConstructive" /></li>
                            <li><FormattedMessage id="report.tipsSpecific" /></li>
                        </ul>
                    </div>
                ),
                preventSubmission: true
            },
            {
                value: 'report.reasonDoesntWork',
                label: {id: 'report.reasonDoesntWork'},
                prompt: (
                    <div>
                        <p><FormattedMessage id="report.promptDoesntWork" /></p>
                        <p><FormattedMessage id="report.promptDoesntWorkTips" /></p>
                    </div>
                ),
                preventSubmission: true
            },
            {
                value: 'report.reasonCouldImprove',
                label: {id: 'report.reasonCouldImprove'},
                prompt: (
                    <div>
                        <p><FormattedMessage id="report.promptDontLikeIt" /></p>
                        <p><FormattedMessage id="report.promptTips" /></p>
                        <ul>
                            <li><FormattedMessage id="report.tipsSupportive" /></li>
                            <li><FormattedMessage id="report.tipsConstructive" /></li>
                            <li><FormattedMessage id="report.tipsSpecific" /></li>
                        </ul>
                    </div>
                ),
                preventSubmission: true
            },
            {
                value: 'report.reasonTooHard',
                label: {id: 'report.reasonTooHard'},
                prompt: <FormattedMessage id="report.promptTooHard" />,
                preventSubmission: true
            },
            {
                value: '9',
                label: {id: 'report.reasonMisleading'},
                prompt: <FormattedMessage id="report.promptMisleading" />
            },
            {
                value: '10',
                label: {id: 'report.reasonFaceReveal'},
                prompt: <FormattedMessage id="report.promptFaceReveal" />
            },
            {
                value: '11',
                label: {id: 'report.reasonNoRemixingAllowed'},
                prompt: <FormattedMessage id="report.promptNoRemixingAllowed" />
            },
            {
                value: '12',
                label: {id: 'report.reasonCreatorsSafety'},
                prompt: <FormattedMessage id="report.promptCreatorsSafety" />
            },
            {
                value: '13',
                label: {id: 'report.reasonSomethingElse'},
                prompt: (
                    <FormattedMessage
                        id={`report.promptSomethingElse`}
                        values={{
                            CommunityGuidelinesLink: (
                                <a href="/community_guidelines">
                                    <FormattedMessage id="report.CommunityGuidelinesLinkText" />
                                </a>
                            )
                        }}
                    />
                )
            }
        ]


    }
];

module.exports = {
    reportOptionsShape,
    REPORT_OPTIONS
};
