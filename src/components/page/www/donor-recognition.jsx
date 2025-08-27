const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const React = require('react');

const externalLinks = require('../../../lib/external-links.js');

require('./donor-recognition.scss');

const DonorRecognition = () => (
    <div id="donor-text">
        <div>
            <FormattedMessage
                id="footer.donorRecognition"
                values={{
                    donorLink: (
                        <a
                            href={externalLinks.scratchFoundation.supporters}
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
                    donor1: 'Massachusetts Institute of Technology',
                    donor2: 'National Science Foundation',
                    donor3: 'Siegel Family Endowment',
                    donor4: 'LEGO Foundation'
                }}
            />
        </div>
    </div>
);

module.exports = injectIntl(DonorRecognition);
