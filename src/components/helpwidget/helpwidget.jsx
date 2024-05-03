const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const bindAll = require('lodash.bindall');
const connect = require('react-redux').connect;
const PropTypes = require('prop-types');
const React = require('react');

const intlShape = require('../../lib/intl-shape');
const Button = require('../forms/button.jsx');
const Spinner = require('../spinner/spinner.jsx');

require('./helpwidget.scss');

// map Scratch locale to supported Freshdesk locale
const freshdeskLocale = locale => {
    // most locales in Scratch and Freshdesk use the two letter code. Define exceptions:
    const localeMap = {
        'es-419': 'es-LA',
        'ja': 'ja-JP',
        'ja-Hira': 'ja-JP',
        'lv': 'lv-LV',
        'nb': 'nb-NO',
        'nn': 'nb-NO',
        'pt': 'pt-PT',
        'pt-br': 'pt-BR',
        'ru': 'ru-RU',
        'sv': 'sv-SE',
        'zh-cn': 'zh-CN',
        'zh-tw': 'zh-TW'
    };
    if (Object.prototype.hasOwnProperty.call(localeMap, locale)) {
        return localeMap[locale];
    }
    // locale will either be supported by Freshdesk, or will default to English if not
    return locale;
};
/**
 * Button or link that opens the Freshdesk Help widget
 * see https://developers.freshdesk.com/widget-api/
 */
class HelpWidget extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleOpenWidget',
            'openPopup'
        ]);
        this.state = {
            waiting: false
        };
    }
    componentDidMount () {
        if (this.props.subject !== '') {
            // if passed Inappropriate content params load the script and open the popup
            this.loadScript();
        }
    }
    componentWillUnmount () {
        window.FreshworksWidget('destroy');
        document.getElementById('helpwidgetscript').remove();
    }
    loadScript () {
        // don't add the script to the page more than once
        if (document.getElementById('helpwidgetscript') === null) {
            const script = document.createElement('script');
            script.id = 'helpwidgetscript';
            script.src = 'https://widget.freshworks.com/widgets/4000000089.js';
            script.async = true;
            script.defer = true;
            script.onload = () => this.scriptLoaded();

            window.fwSettings = {
                widget_id: 4000000089,
                locale: freshdeskLocale(this.props.intl.locale)
            };
            document.body.appendChild(script);
        }
    }
    scriptLoaded () {
        // freshdesk widget embed code
        /* eslint-disable */
        !(function(){if("function"!=typeof window.FreshworksWidget){var n=function(){n.q.push(arguments)};n.q=[],window.FreshworksWidget=n}}())
        /* eslint-enable */
        // don't show the Freshdesk button
        window.FreshworksWidget('hide', 'launcher');

        const labels = {};
        labels[freshdeskLocale(this.props.intl.locale)] = {
            banner: this.props.intl.formatMessage({id: 'helpWidget.banner'}),
            contact_form: {
                title: this.props.intl.formatMessage({id: 'general.contactUs'}),
                submit: this.props.intl.formatMessage({id: 'helpWidget.submit'}),
                confirmation: this.props.intl.formatMessage({id: 'helpWidget.confirmation'})
            }
        };
        window.FreshworksWidget('setLabels', labels);

        window.FreshworksWidget('disable', 'ticketForm', ['custom_fields.cf_inappropriate_report_link']);
        window.FreshworksWidget('hide', 'ticketForm', ['custom_fields.cf_inappropriate_report_link']);

        // open the popup already on the form if passed Inappropriate content param
        this.openPopup(this.props.subject !== '');
    }
    handleOpenWidget (e) {
        this.setState({waiting: true});
        e.preventDefault();
        // if the Widget is already defined, just open, otherwise load the widget script
        if (typeof window.FreshworksWidget === 'function') {
            this.openPopup();
        } else {
            this.loadScript();
        }
    }
    openPopup (formOpen) {
        window.FreshworksWidget('prefill', 'ticketForm', {
            subject: this.props.subject,
            custom_fields: {
                cf_scratch_name: this.props.user.username,
                cf_inappropriate_report_link: this.props.body
            }
        });
        if (formOpen) {
            window.FreshworksWidget('open', 'ticketForm');
        } else {
            window.FreshworksWidget('open');
        }
        // there may still be a little delay before the widget is visible, but there's
        // no callback to attach this to.
        this.setState({waiting: false});
    }
    render () {
        return (
            <a
                href="#"
                onClick={this.handleOpenWidget}
            >
                {this.props.button ? (
                    this.state.waiting ? (
                        <Button className="gethelp-button">
                            <Spinner
                                className="spinner"
                            />
                            <FormattedMessage id="general.getHelp" />
                        </Button>
                    ) : (
                        <Button className="gethelp-button">
                            <FormattedMessage id="general.getHelp" />
                        </Button>
                    )

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
