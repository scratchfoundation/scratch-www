const keyMirror = require('keymirror');
const defaults = require('lodash.defaults');

const api = require('../lib/api');
const jar = require('../lib/jar');
const log = require('../lib/log.js');
const sessionActions = require('./session.js');

const Types = keyMirror({
    SET_SEARCH_TERM: null,
    SET_ACCOUNT_NAV_OPEN: null,
    TOGGLE_ACCOUNT_NAV_OPEN: null,
    SET_LOGIN_ERROR: null,
    SET_LOGIN_OPEN: null,
    TOGGLE_LOGIN_OPEN: null,
    SET_CANCELED_DELETION_OPEN: null,
    SET_REGISTRATION_OPEN: null,
    HANDLE_REGISTRATION_REQUESTED: null,
    HANDLE_REGISTRATION_COMPLETED: null,
    REVIEW_COMMUNITY_GUIDELINES: null
});

module.exports.getInitialState = () => ({
    useScratch3Registration: true,
    accountNavOpen: false,
    canceledDeletionOpen: false,
    loginError: null,
    loginOpen: false,
    registrationOpen: false,
    // This is set shortly before changing the window.location (hence refreshing the page)
    // We need something more durable than redux state in that case -> so we use `localStorage`
    shouldReviewCommunityGuidelines: localStorage.getItem('shouldReviewCommunityGuidelines') === 'true',
    searchTerm: ''
});


module.exports.navigationReducer = (state, action) => {
    if (typeof state === 'undefined') {
        state = module.exports.getInitialState();
    }
    switch (action.type) {
    case Types.SET_SEARCH_TERM:
        return defaults({searchTerm: action.searchTerm}, state);
    case Types.SET_ACCOUNT_NAV_OPEN:
        return defaults({accountNavOpen: action.isOpen}, state);
    case Types.TOGGLE_ACCOUNT_NAV_OPEN:
        return defaults({accountNavOpen: !state.accountNavOpen}, state);
    case Types.SET_LOGIN_ERROR:
        return defaults({loginError: action.loginError}, state);
    case Types.SET_LOGIN_OPEN:
        return defaults({loginOpen: action.isOpen}, state);
    case Types.TOGGLE_LOGIN_OPEN:
        return defaults({loginOpen: !state.loginOpen}, state);
    case Types.SET_CANCELED_DELETION_OPEN:
        return defaults({canceledDeletionOpen: action.isOpen}, state);
    case Types.SET_REGISTRATION_OPEN:
        return defaults({registrationOpen: action.isOpen}, state);
    case Types.HANDLE_REGISTRATION_REQUESTED:
        if (state.useScratch3Registration) {
            window.location.assign('/join');
            return state;
        }
        return defaults({registrationOpen: true}, state);
    case Types.HANDLE_REGISTRATION_COMPLETED:
        localStorage.setItem('shouldReviewCommunityGuidelines', 'true');
        return defaults({shouldReviewCommunityGuidelines: true}, state);
    case Types.REVIEW_COMMUNITY_GUIDELINES:
        localStorage.setItem('shouldReviewCommunityGuidelines', 'false');
        return defaults({shouldReviewCommunityGuidelines: false}, state);
    default:
        return state;
    }
};

module.exports.setAccountNavOpen = isOpen => ({
    type: Types.SET_ACCOUNT_NAV_OPEN,
    isOpen: isOpen
});

module.exports.handleToggleAccountNav = () => ({
    type: Types.TOGGLE_ACCOUNT_NAV_OPEN
});

module.exports.setCanceledDeletionOpen = isOpen => ({
    type: Types.SET_CANCELED_DELETION_OPEN,
    isOpen: isOpen
});

module.exports.setLoginError = loginError => ({
    type: Types.SET_LOGIN_ERROR,
    loginError: loginError
});

module.exports.setLoginOpen = isOpen => ({
    type: Types.SET_LOGIN_OPEN,
    isOpen: isOpen
});

module.exports.toggleLoginOpen = () => ({
    type: Types.TOGGLE_LOGIN_OPEN
});

module.exports.setRegistrationOpen = isOpen => ({
    type: Types.SET_REGISTRATION_OPEN,
    isOpen: isOpen
});

module.exports.setSearchTerm = searchTerm => ({
    type: Types.SET_SEARCH_TERM,
    searchTerm: searchTerm
});

module.exports.handleRegistrationRequested = () => ({
    type: Types.HANDLE_REGISTRATION_REQUESTED
});

module.exports.handleRegistrationCompleted = () => ({
    type: Types.HANDLE_REGISTRATION_COMPLETED
});

module.exports.reviewCommunityGuidelines = () => ({
    type: Types.REVIEW_COMMUNITY_GUIDELINES
});

module.exports.handleCompleteRegistration = createProject => (dispatch => {
    if (createProject) {
        // TODO: Ideally this would take you to the editor with the getting started
        // tutorial open. We need to do some extra work to wait for the user
        // to be logged in before we try creating a project due to replication lag.
        window.location = '/';
    } else {
        dispatch(sessionActions.refreshSessionWithRetry()).then(
            dispatch(module.exports.setRegistrationOpen(false))
        );
    }
    dispatch(module.exports.handleRegistrationCompleted());
});

module.exports.handleLogIn = (formData, callback) => (dispatch => {
    dispatch(module.exports.setLoginError(null));
    formData.useMessages = true; // NOTE: this may or may not be being used anywhere else
    api({
        method: 'post',
        host: '',
        uri: '/accounts/login/',
        json: formData,
        useCsrf: true
    }, (err, body) => {
        if (err) dispatch(module.exports.setLoginError(err.message));
        if (body) {
            body = body[0];
            if (body.success) {
                dispatch(module.exports.setLoginOpen(false));
                body.messages.forEach(message => {
                    if (message.message === 'canceled-deletion') {
                        dispatch(module.exports.setCanceledDeletionOpen(true));
                    }
                });
                dispatch(sessionActions.refreshSession());
                callback({success: true});
            } else {
                if (body.redirect) {
                    window.location = body.redirect;
                }
                // Update login error message to a friendlier one if it exists
                dispatch(module.exports.setLoginError(body.msg));
                // JS error already logged by api mixin
                callback({success: false});
            }
        } else {
            // JS error already logged by api mixin
            callback({success: false});
        }
    });
});

module.exports.handleLogOut = () => (() => {
    // POST to /accounts/logout using a dummy form instead of XHR. This ensures
    // logout only happens AFTER onbeforeunload has the chance to prevent nagivation.
    jar.use('scratchcsrftoken', '/csrf_token/', (err, csrftoken) => {
        if (err) return log.error('Error while retrieving CSRF token', err);
        const form = document.createElement('form');
        form.setAttribute('method', 'POST');
        form.setAttribute('action', '/accounts/logout/');
        const csrfField = document.createElement('input');
        csrfField.setAttribute('type', 'hidden');
        csrfField.setAttribute('name', 'csrfmiddlewaretoken');
        csrfField.setAttribute('value', csrftoken);
        form.appendChild(csrfField);
        document.body.appendChild(form);
        form.submit();
    });
});
