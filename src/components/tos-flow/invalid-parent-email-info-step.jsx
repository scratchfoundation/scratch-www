const React = require('react');
const PropTypes = require('prop-types');
const {useIntl, FormattedMessage} = require('react-intl');

const TosFlowStep = require('./tos-flow-step.jsx');
require('./tos-flow-step.scss');

const InvalidParentEmailInfoStep = ({onComplete, user}) => {
    const intl = useIntl();
    const description = (
        <div className="tos-step-description-container">
            <div className="tos-step-description">
                <FormattedMessage
                    id="tos.invalidParentEmailInfoStepDescriptionPart1"
                    values={{
                        parentEmail: <b>{user.email}</b>
                    }}
                />
            </div>
            <div className="tos-step-description">
                <FormattedMessage
                    id="tos.invalidParentEmailInfoStepDescriptionPart2"
                    values={{
                        b: chunks => <b>{chunks}</b>
                    }}
                />
            </div>
            <div className="tos-step-description">
                <FormattedMessage
                    id="tos.invalidParentEmailInfoStepDescriptionPart3"
                    values={{
                        b: chunks => <b>{chunks}</b>
                    }}
                />
            </div>
            <div className="tos-step-description">
                <FormattedMessage
                    id="tos.invalidParentEmailInfoStepDescriptionPart4"
                    values={{
                        b: chunks => <b>{chunks}</b>
                    }}
                />
            </div>
        </div>
    );

    return (
        <TosFlowStep
            title={intl.formatMessage({id: 'tos.invalidParentEmailInfoStepTitle'})}
            description={description}
            nextButton={intl.formatMessage({id: 'general.okay'})}
            onSubmit={onComplete}
        />
    );
};

InvalidParentEmailInfoStep.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired
    }),
    onComplete: PropTypes.func.isRequired
};

module.exports = InvalidParentEmailInfoStep;
