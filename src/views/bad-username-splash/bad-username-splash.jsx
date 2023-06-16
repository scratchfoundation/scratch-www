/* eslint-disable */
const injectIntl = require('react-intl').injectIntl;
// const intlShape = require('react-intl').intlShape;
// const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
import {connect} from 'react-redux';
import {selectBannedUser, selectHasFetchedSession} from '../../redux/session';
const messageActions = require('../../redux/messages.js');
const JoinFlowStep = require('../../components/join-flow/join-flow-step.jsx');
const FormikInput = require('../../components/formik-forms/formik-input.jsx');
import {Formik} from 'formik';
const PropTypes = require('prop-types');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');
const api = require('../../lib/api');
import bannedIcon from './blocked-account.svg';

require('../../components/extension-landing/extension-landing.scss');
require('./bad-username-splash.scss');

const BannedSplash = ({hasSession, user, adminMessages, getAdminMessages}) => {

    const [unauthorizedError, setUnauthorizedError] = React.useState(false)
    const [badUsernameError, setBadUsernameError] = React.useState(false)
    const [apiError, setAPIError] = React.useState(false)


    React.useEffect(() => {
        if (user && user.username && user.token){
            getAdminMessages(user.username, user.token);
        }
    }, [user]);

    const handleUpdateUsernameUnbanSubmit = (formData, formikBag) => {
        setUnauthorizedError(false)
        setBadUsernameError(false)
        setAPIError(false)
        formikBag.setSubmitting(false); // formik makes us do this ourselves
        
        console.log("attempting submit!")
        api({
            host: '',
            uri: '/accounts/update_username/',
            method: 'post',
            useCsrf: true,
            json: {
                new_username: formData.newUsername,
                username: formData.username,
                password: formData.password
            }
        }, (err, body, res) => {
            if(res.body.error === "Unauthorized"){
                setUnauthorizedError("error message for unauthorized access")
            }
            else if(res.body.error === "Invalid username"){
                setBadUsernameError("error message for invalid username")
            }
            else if(res.body.error){
                setAPIError("error message for API error")
            } else{
                window.location = '/';
            }
        });
    }

    if (hasSession && (!user || !user.banned)){
        window.location = '/';
    }
    
    if (user && user.banned){
        return (<div id="bad-username-splash">
            <div id="force-account-rename">
                <div id="force-account-rename-inner">
                    <div
                        id="force-account-rename-text"
                        className="col"
                    >
                        <span>
                            <img
                                className="banned-icon"
                                src={bannedIcon}
                            />
                            <h1 className="inline"><FormattedMessage id="renameAccount.accountBlocked"/></h1>
                        </span>
                        <h3><FormattedMessage id="renameAccount.toRecover"/></h3>
                        <p><FormattedMessage id="renameAccount.yourScratchAccount"/></p>
                        <p><FormattedMessage id="renameAccount.privacyIssue"/></p>
                        <p><FormattedMessage id="renameAccount.thingsToAvoid"/></p>
                    </div>
                    <div className="col">
                        <Formik
                            initialValues={{
                                newUsername: '',
                                newUsernameConfirm: '',
                                username: user.username,
                                password: ''
                            }}
                            validateOnBlur={true}
                            validateOnChange={false}
                            onSubmit={handleUpdateUsernameUnbanSubmit}
                        >
                            {({
                                    errors,
                                    handleSubmit,
                                    isSubmitting,
                                    setFieldError,
                                    setFieldTouched,
                                    setFieldValue,
                                    // touched,
                                    validateField,
                                    values
                                }) => {
                                return (
                                    <JoinFlowStep
                                        description={<FormattedMessage id="renameAccount.makeSure"/>}
                                        innerClassName="change-username-inner"
                                        outerClassName="change-username-outer"
                                        title={<FormattedMessage id="renameAccount.changeYourUsername" values={{communityGuidelinesLink: <a href="/community_guidelines"><FormattedMessage id="renameAccount.communityGuidelines"/></a>}}/>}
                                        waiting={isSubmitting}
                                        onSubmit={handleSubmit}
                                        nextButton={<FormattedMessage id="renameAccount.change"/>}
                                    >
                                        <div>
                                            <FormikInput
                                                autoCapitalize="off"
                                                autoComplete="off"
                                                autoCorrect="off"
                                                error={errors.newUsername}
                                                id="newUsername"
                                                name="newUsername"
                                                placeholder={'Type your new username'}
                                                spellCheck={false}
                                                // toolTip={this.state.focused === 'username' && !touched.username &&
                                                //                     this.props.intl.formatMessage({id: 'registration.usernameAdviceShort'})}
                                                /* eslint-disable react/jsx-no-bind */
                                                validate={validateUsername}
                                                validationClassName="validation-left validation-full-width-input"
                                                /* eslint-disable react/jsx-no-bind */
                                                onBlur={() => validateField('newUsername')}
                                                onChange={e => {
                                                    setFieldValue('newUsername', e.target.value.substring(0, 30));
                                                    setFieldTouched('newUsername');
                                                    setFieldError('newUsername', null);
                                                }}
                                            />
                                            <FormikInput
                                                autoCapitalize="off"
                                                autoComplete="off"
                                                autoCorrect="off"
                                                className={'join-flow-input'}
                                                error={errors.newUsernameConfirm || badUsernameError}
                                                id="newUsernameConfirm"
                                                name="newUsernameConfirm"
                                                placeholder={'Type your new username again'}
                                                spellCheck={false}
                                                validationClassName="validation-left validation-full-width-input"
                                                onChange={e => {
                                                    setFieldValue('newUsernameConfirm', e.target.value.substring(0, 30));
                                                    setFieldTouched('newUsernameConfirm');
                                                    setFieldError('newUsernameConfirm', null);
                                                }}
                                            />
                                            <FormikInput
                                                autoCapitalize="off"
                                                autoComplete="off"
                                                autoCorrect="off"
                                                className={'join-flow-input'}
                                                id="password"
                                                name="password"
                                                placeholder={'Enter your password'}
                                                spellCheck={false}
                                                error={unauthorizedError || apiError}
                                                validationClassName="validation-left validation-full-width-input"
                                                onChange={e => {
                                                    setFieldValue('password', e.target.value);
                                                    setFieldTouched('password');
                                                    setFieldError('password', null);
                                                }}
                                            />
                                        </div>
                                    </JoinFlowStep>);
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
            <div id="admin-message-list">
                <div id="admin-message-list-title">
                    <b><FormattedMessage id="renameAccount.pastNotifications"/></b>
                </div>
                {adminMessages.map(message => (
                    <div
                        className="admin-message"
                        key={message.id}
                    >
                        <div className="admin-message-date">
                            {new Date(message.datetime_created).toDateString()}
                        </div>
                        {/* // eslint-disable-next-line react/no-danger */}
                        <div dangerouslySetInnerHTML={{__html: message.message}} />
                    </div>
                ))}
            </div>
        </div>
        );
    }
    return <div />;
};

BannedSplash.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string,
        banned: PropTypes.bool,
        token: PropTypes.string
    }),
    hasSession: PropTypes.bool,
    adminMessages: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        datetimeCreated: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired
    })),
    getAdminMessages: PropTypes.func
};

const ConnectedBannedSplash = connect(
    state => ({
        user: selectBannedUser(state),
        hasSession: selectHasFetchedSession(state),
        adminMessages: state.messages.messages && state.messages.messages.admin
    }),
    dispatch => ({
        getAdminMessages: (username, token) => {
            dispatch(messageActions.getAdminMessages(
                username, token, 0
            ));
        }
    })
)(BannedSplash);


const WrappedBannedSplash = injectIntl(ConnectedBannedSplash);

render(<Page><WrappedBannedSplash /></Page>, document.getElementById('app'),
    {messages: messageActions.messagesReducer});
