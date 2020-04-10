const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const bindAll = require('lodash.bindall');
const connect = require('react-redux').connect;
const PropTypes = require('prop-types');
const React = require('react');

const Button = require('../forms/button.jsx');
/**
 * Footer link that opens Freshdesk help widger
 */
class HelpWidget extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleOpenWidget',
            'openPopup'
        ]);
    }
    componentDidMount () {
        // don't add the script to the page more than once
        if (document.getElementById('helpwidgetscript') === null) {
            const script = document.createElement('script');
            script.id = 'helpwidgetscript';
            script.src = 'https://widget.freshworks.com/widgets/4000000089.js';
            script.async = true;
            script.defer = true;
            script.onload = () => this.scriptLoaded();

            document.body.appendChild(script);
            window.fwSettings = {
                widget_id: 4000000089,
                locale: this.props.intl.locale
            };
        }
    }
    scriptLoaded () {
        // freshdesk widget embed code
        /* eslint-disable */
        !(function(){if("function"!=typeof window.FreshworksWidget){var n=function(){n.q.push(arguments)};n.q=[],window.FreshworksWidget=n}}())
        /* eslint-enable */
        // don't show the Freshdesk button
        window.FreshworksWidget('hide', 'launcher');
        window.FreshworksWidget('setLabels', {
            fr: {
                banner: 'Bienvenue a Support',
                contact_form: {
                    title: this.props.intl.formatMessage({id: 'contactUs.contactScratch'})
                }
            }
        });
        if (this.props.subject !== '') {
            // open the popup already on the form if passed Inappropriate content params
            this.openPopup(true);
        }
    }
    handleOpenWidget (e) {
        e.preventDefault();
        this.openPopup();
    }
    openPopup (formOpen) {
        if (typeof window.FreshworksWidget === 'function') {
            window.FreshworksWidget('prefill', 'ticketForm', {
                subject: this.props.subject,
                description: this.props.body,
                custom_fields: {
                    cf_scratch_name: this.props.user.username
                }
            });
            if (formOpen) {
                window.FreshworksWidget('open', 'ticketForm');
            } else {
                window.FreshworksWidget('open');
            }
        }
    }
    render () {
        return (
            <a
                href="#"
                onClick={this.handleOpenWidget}
            >
                {this.props.button ? (
                    <Button className="gethelp-button">
                        <FormattedMessage id="general.getHelp" />
                    </Button>
                ) : (<FormattedMessage id="general.getHelp" />)
                }
            </a>
        );
    }
}

HelpWidget.propTypes = {
    body: PropTypes.string,
    button: PropTypes.bool,
    intl: intlShape,
    subject: PropTypes.string,
    user: PropTypes.shape({
        classroomId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        thumbnailUrl: PropTypes.string,
        username: PropTypes.string
    })
};

HelpWidget.defaultProps = {
    body: '',
    button: false,
    subject: '',
    user: {username: ''}
};

const mapStateToProps = state => ({
    user: state.session.session.user
});

const ConnectedHelpWidget = connect(mapStateToProps)(HelpWidget);
module.exports = injectIntl(ConnectedHelpWidget);
