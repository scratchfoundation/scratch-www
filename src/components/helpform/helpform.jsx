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
    const formSubject = `helpdesk_ticket[subject]=${props.subject}`;
    const formDescription = `helpdesk_ticket[description]=${props.body}`;
    return (
        <div>
            <script
                async
                defer
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
                height="744px"
                id="freshwidget-embedded-form"
                scrolling="no"
                src={`${prefix}&${title}&${username}&${browser}&${formSubject}&${formDescription}`}
                title={<FormattedMessage id="contactUs.questionsForum" />}
                width="100%"
            />
        </div>
    );
};


HelpForm.propTypes = {
    body: PropTypes.string,
    subject: PropTypes.string,
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
        classroomId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        thumbnailUrl: PropTypes.string,
        username: PropTypes.string
    })
};

HelpForm.defaultProps = {
    body: '',
    subject: '',
    title: '',
    user: {username: ''}
};

const mapStateToProps = state => ({
    user: state.session.session.user
});

module.exports = connect(mapStateToProps)(HelpForm);
