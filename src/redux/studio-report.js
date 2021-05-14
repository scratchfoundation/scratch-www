const keyMirror = require('keymirror');

const api = require('../lib/api');
const {selectIsLoggedIn} = require('./session');
const {selectStudioId} = require('./studio');

const Actions = keyMirror({
    OPEN_STUDIO_REPORT: null,
    CLOSE_STUDIO_REPORT: null,
    SET_STUDIO_REPORT_STATUS: null,
    SET_STUDIO_REPORT_FIELD: null
});

const Status = keyMirror({
    IDLE: null,
    SUBMITTING: null,
    SUBMITTED: null
});

const Fields = {
    TITLE: 'title',
    DESCRIPTION: 'description',
    THUMBNAIL: 'thumbnail'
};

const Errors = keyMirror({
    GENERIC: null
});

const getInitialState = () => ({
    status: Status.IDLE,
    field: null,
    error: null,
    isOpen: false
});

const studioReportReducer = (state, action) => {
    if (typeof state === 'undefined') {
        state = getInitialState();
    }

    switch (action.type) {
    case Actions.OPEN_STUDIO_REPORT:
        return {
            ...state,
            isOpen: true
        };
    case Actions.CLOSE_STUDIO_REPORT:
        return {
            ...state, // Leaves the submitted status to prevent double submission
            isOpen: false
        };
    case Actions.SET_STUDIO_REPORT_STATUS:
        return {
            ...state,
            status: action.status,
            error: typeof action.error === 'undefined' ? null : action.error
        };
    case Actions.SET_STUDIO_REPORT_FIELD:
        return {
            ...state,
            field: action.field
        };
    default:
        return state;
    }
};

// Selectors
const selectStudioReportField = state => state.studioReport.field;
const selectStudioReportOpen = state => state.studioReport.isOpen;
const selectStudioReportSubmitting = state => state.studioReport.status === Status.SUBMITTING;
const selectStudioReportSubmitted = state => state.studioReport.status === Status.SUBMITTED;
const selectStudioReportError = state => state.studioReport.error;
const selectCanReportStudio = state => !!selectIsLoggedIn(state); // TODO selectIsLoggedIn isn't returning bool?

// Action Creators
const setReportStatus = (status, error) => ({
    type: Actions.SET_STUDIO_REPORT_STATUS,
    status,
    error
});

const openStudioReport = () => ({
    type: Actions.OPEN_STUDIO_REPORT
});

const closeStudioReport = () => ({
    type: Actions.CLOSE_STUDIO_REPORT
});

const setStudioReportField = field => ({
    type: Actions.SET_STUDIO_REPORT_FIELD,
    field
});

const submitStudioReport = () => ((dispatch, getState) => {
    dispatch(setReportStatus(Status.SUBMITTING));
    const studioId = selectStudioId(getState());
    const field = selectStudioReportField(getState());
    api({
        host: '',
        uri: `/site-api/galleries/all/${studioId}/report/`,
        method: 'POST',
        useCsrf: true,
        formData: {
            selected_field: field
        }
    }, (err, body, res) => {
        if (err || (body && body.success === false) || res.statusCode !== 200) {
            dispatch(setReportStatus(Status.IDLE, Errors.GENERIC));
            return;
        }
        dispatch(setReportStatus(Status.SUBMITTED));
    });
});

module.exports = {
    Errors,
    Fields,
    getInitialState,
    studioReportReducer,
    actions: {
        openStudioReport,
        closeStudioReport,
        setStudioReportField,
        submitStudioReport
    },
    selectors: {
        selectStudioReportField,
        selectStudioReportOpen,
        selectCanReportStudio,
        selectStudioReportSubmitting,
        selectStudioReportSubmitted,
        selectStudioReportError
    }
};
