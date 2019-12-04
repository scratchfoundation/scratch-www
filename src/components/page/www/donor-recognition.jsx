const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const React = require('react');

require('./donor-recognition.scss');

const DonorRecognition = () => (
    <div id="donor-text">
        <div>
            <FormattedMessage
                id="footer.donorRecognition"
                values={{
                    donorLink: (
                        <a
                            href="/credits#donors"
                        >
                            <FormattedMessage id="footer.donors" />
                        </a>
                    )
                }}
            />
        </div>
        <div>
            <FormattedMessage
                id="footer.donorList"
                values={{
                    donor1: 'Massachusetts Institue of Technology',
                    donor2: 'National Science Foundation',
                    donor3: 'Siegel Family Endowment'
                }}
            />
        </div>
    </div>
);

module.exports = injectIntl(DonorRecognition);
