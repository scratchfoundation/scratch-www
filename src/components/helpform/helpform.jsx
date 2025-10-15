const connect = require('react-redux').connect;
const PropTypes = require('prop-types');
const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;

const HelpForm = ({
    body = '',
    subject = '',
    title = '',
    user = {username: ''}
}) => {
    const prefix = 'https://mitscratch.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&widgetView=yes&screenshot=No&searchArea=No';
    const formTitle = `formTitle=${title}`;
    const username = `helpdesk_ticket[custom_field][cf_scratch_name_40167]=${user.username || ''}`;
    const formSubject = `helpdesk_ticket[subject]=${subject}`;
    const reportLink = `helpdesk_ticket[custom_field][cf_inappropriate_report_link_40167]=${body || ''}`;

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
                height="644px"
                id="freshwidget-embedded-form"
                scrolling="no"
                src={`${prefix}&${formTitle}&${username}&${formSubject}&${reportLink}`}
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

const mapStateToProps = state => ({
    user: state.session.session.user
});

module.exports = connect(mapStateToProps)(HelpForm);
