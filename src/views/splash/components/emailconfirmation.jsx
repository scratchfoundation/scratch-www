var React = require('react');

var Modal = require('../../../components/modal/modal.jsx');
var DropdownBanner = require('../../../components/dropdown-banner/banner.jsx');

var omit = require('lodash.omit');


require('./splash.scss');

var ConfirmEmail = React.createClass({
    type: 'ConfirmEmail',
    render: function () {
        return (
            <div>
                <DropdownBanner key="confirmedEmail"
                        className="warning"
                        onRequestDismiss={this.props.handleDismiss.bind(this.props.self, 'confirmed_email')}>
                    <a href="#" onClick={this.props.showEmailConfirmationModal}>Confirm your email</a>
                    {' '}to enable sharing.{' '}
                    <a href="/info/faq/#accounts">Having trouble?</a>
                </DropdownBanner>,
                <Modal key="emailConfirmationModal"
                       isOpen={this.props.emailConfirmationModalOpen}
                       onRequestClose={this.props.hideEmailConfirmationModal}
                       style={{content: this.props.emailConfirmationStyle}}>
                    <iframe ref="emailConfirmationiFrame"
                            src="/accounts/email_resend_standalone/"
                            {...omit(this.props.emailConfirmationStyle, 'padding')} />
                </Modal>
            </div>
        );
    }
});

module.exports = ConfirmEmail;
