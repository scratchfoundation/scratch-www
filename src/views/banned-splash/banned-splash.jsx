/* eslint-disable */
const injectIntl = require('react-intl').injectIntl;
// const intlShape = require('react-intl').intlShape;
// const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');
import {connect} from 'react-redux';
import {selectBannedUser, selectHasFetchedSession} from '../../redux/session';
const messageActions = require('../../redux/messages.js');
const JoinFlowStep = require('../../components/join-flow/join-flow-step.jsx');
const FormikInput = require('../../components/formik-forms/formik-input.jsx');
import {Formik} from 'formik';
const PropTypes = require('prop-types');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');
import bannedIcon from './blocked-account.svg';

require('../../components/extension-landing/extension-landing.scss');
require('./banned-splash.scss');

const validateUsernameConfirm = (username, usernameConfirm) => {
    if (!usernameConfirm) {
        // return 'Username is required';
    } else if (username !== usernameConfirm) {
        return "Usernames don't match";
    }
};

const BannedSplash = ({hasSession, user, adminMessages, getAdminMessages}) => {

    React.useEffect(() => {
        if (user && user.username && user.token){
            getAdminMessages(user.username, user.token);
        }
    }, [user]);

    if (hasSession && (!user || !user.banned)){
        window.location = '/';
    }

    if (user && user.banned){
        return (<div id="banned-splash">
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
                            <h1 className="inline">Account Blocked</h1>
                        </span>
                        <h3>To recover access to your account, change your username.</h3>
                        <p>Your scratch account <b>{user && user.username}</b> has been temporarily blocked because your usernamed appears to contain personal information.</p>
                        <p>This is a serious privacy issue.  When you share information like this, it is visible to everyone on the internet, so please be careful what you share</p>
                        <p>When creating an username, please remember to avoid using last names, school names, or other private information in your username.</p>
                    </div>
                    <div className="col">
                        <Formik
                            initialValues={{
                                newUsername: '',
                                newUsernameConfirm: ''
                            }}
                            // validate={this.validateForm}
                            validateOnBlur={false}
                            validateOnChange={false}
                        // onSubmit={this.handleValidSubmit}
                        >
                            {({
                                    errors,
                                    // handleSubmit,
                                    // isSubmitting,
                                    setFieldError,
                                    setFieldTouched,
                                    setFieldValue,
                                    // touched,
                                    validateField,
                                    values
                                }) => {
                                return (
                                    <JoinFlowStep
                                        description={<span>Make sure the username you chose is aligned with <a href="/community_guidelines">Scratch's Community Guidelines</a></span>}
                                        innerClassName="change-username-inner"
                                        outerClassName="change-username-outer"
                                        title={'Change your Username'}
                                        // waiting={isSubmitting}
                                        // onSubmit={handleSubmit}
                                        nextButton={'Change'}
                                    >
                                        <div>
                                            <FormikInput
                                                autoCapitalize="off"
                                                autoComplete="off"
                                                autoCorrect="off"
                                                // className={'join-flow-input'}
                                                error={errors.newUsername}
                                                id="newUsername"
                                                name="newUsername"
                                                placeholder={'Type your new username'}
                                                spellCheck={false}
                                                // toolTip={this.state.focused === 'username' && !touched.username &&
                                                //                     this.props.intl.formatMessage({id: 'registration.usernameAdviceShort'})}
                                                /* eslint-disable react/jsx-no-bind */
                                                // validate={newUsername => validateUsername(newUsername)}
                                                validationClassName="validation-left validation-full-width-input"
                                                /* eslint-disable react/jsx-no-bind */
                                                onBlur={() => validateField('newUsername')}
                                                onChange={e => {
                                                    setFieldValue('newUsername', e.target.value.substring(0, 30));
                                                    setFieldTouched('newUsername');
                                                    setFieldError('newUsername', null);
                                                }}
                                            // onFocus={() => this.handleFocused('username')}
                                            /* eslint-enable react/jsx-no-bind */
                                            // onSetRef={this.handleSetUsernameRef}
                                            />
                                            <FormikInput
                                                autoCapitalize="off"
                                                autoComplete="off"
                                                autoCorrect="off"
                                                className={'join-flow-input'}
                                                error={errors.newUsernameConfirm}
                                                id="newUsernameConfirm"
                                                name="newUsernameConfirm"
                                                placeholder={'Type your new username again'}
                                                spellCheck={false}
                                                // toolTip={this.state.focused === 'username' && !touched.username &&
                                                //                     this.props.intl.formatMessage({id: 'registration.usernameAdviceShort'})}
                                                /* eslint-disable react/jsx-no-bind */
                                                validate={newUsernameConfirm => validateUsernameConfirm(values.newUsername, newUsernameConfirm)}
                                                validationClassName="validation-left validation-full-width-input"
                                                onBlur={() => {
                                                    validateField('newUsernameConfirm');
                                                }}
                                                onChange={e => {
                                                    setFieldValue('newUsernameConfirm', e.target.value.substring(0, 30));
                                                    setFieldTouched('newUsernameConfirm');
                                                    setFieldError('newUsernameConfirm', null);
                                                }}
                                            /* eslint-enable react/jsx-no-bind */
                                            // onSetRef={this.handleSetUsernameRef}
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
                    <b>Here are your past admin notifications</b>
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


// LET SESSION MAKE BANNED BE A STRING THAT SAYS THE KIND OF BANNED
// THIS IS AN API CHANGE ON THE SESSION
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
