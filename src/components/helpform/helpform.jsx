const connect = require('react-redux').connect;
const PropTypes = require('prop-types');
const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;

const HelpForm = props => {
    const prefix = 'https://mitscratch.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&widgetView=yes&screenshot=No&searchArea=No&captcha=yes';
    const title = `formTitle=${props.title}`;
    const username = `helpdesk_ticket[custom_field][cf_scratch_name_40167]=${props.user.username || ''}`;
    const agentText = encodeURI(window.navigator.userAgent.replace(';', ' -'));
    const browser = `helpdesk_ticket[custom_field][cf_browser_40167]=${agentText}`;
    return (
        <div>
            <script
                src="https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.js"
                type="text/javascript"
            />
            <style
                media="screen, projection"
                type="text/css"
            >
                @import url(https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.css);
            </style>
            <iframe
                className="freshwidget-embedded-form"
                frameBorder="0"
                height="505px"
                id="freshwidget-embedded-form"
                scrolling="no"
                src={`${prefix}&${title}&${username}&${browser}`}
                title={<FormattedMessage id="contactUs.questionsForum" />}
                width="100%"
            />
        </div>
    );
};


HelpForm.propTypes = {
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
        classroomId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        thumbnailUrl: PropTypes.string,
        username: PropTypes.string
    })
};

HelpForm.defaultProps = {
    title: '',
    user: {username: ''}
};

const mapStateToProps = state => ({
    user: state.session.session.user
});

module.exports = connect(mapStateToProps)(HelpForm);
