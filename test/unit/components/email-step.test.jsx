const React = require('react');
import {renderWithIntl} from '../../helpers/react-testing-library-wrapper.jsx';

const requestSuccessResponse = {
    requestSucceeded: true,
    valid: false,
    errMsgId: 'registration.validationEmailInvalid'
};
const requestFailureResponse = {
    requestSucceeded: false,
    valid: false,
    errMsgId: 'general.error'
};
// mockedValidateEmailRemotely will return a promise resolving with remoteRequestResponse.
// Using remoteRequestResponse, rather than using requestSuccessResponse directly,
// lets us change where remoteRequestResponse points later, without actually changing
// mockedValidateEmailRemotely.
let remoteRequestResponse = requestSuccessResponse;
const mockedValidateEmailRemotely = jest.fn(() => (
    /* eslint-disable no-undef */
    Promise.resolve(remoteRequestResponse)
    /* eslint-enable no-undef */
));

jest.mock('../../../src/lib/validate.js', () => (
    {
        ...(jest.requireActual('../../../src/lib/validate.js')),
        validateEmailRemotely: mockedValidateEmailRemotely
    }
));

// must come after validation mocks, so validate.js will be mocked before it is required
const EmailStep = require('../../../src/components/join-flow/email-step.jsx');

describe('EmailStep test', () => {
    const defaultProps = () => ({
        sendAnalytics: jest.fn()
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('send correct props to formik', () => {
        const {findByComponentName, instance} = renderWithIntl(<EmailStep
            {...defaultProps()}
        />, 'EmailStep');
        
        const formikComponent = findByComponentName('Formik');
        const emailStepInstance = instance();
        
        expect(formikComponent.memoizedProps.initialValues.email).toBe('');
        expect(formikComponent.memoizedProps.validateOnBlur).toBe(false);
        expect(formikComponent.memoizedProps.validateOnChange).toBe(false);
        expect(formikComponent.memoizedProps.validate).toBe(emailStepInstance.validateForm);
        expect(formikComponent.memoizedProps.onSubmit).toBe(emailStepInstance.handleValidSubmit);
    });

    test('props sent to JoinFlowStep', () => {
        const {findAllByComponentName} = renderWithIntl(<EmailStep
            {...defaultProps()}
        />, 'EmailStep');
        
        const joinFlowSteps = findAllByComponentName('JoinFlowStep');
        expect(joinFlowSteps).toHaveLength(1);
        expect(joinFlowSteps[0].memoizedProps.footerContent.props.id).toBe('registration.acceptTermsOfUse');
        expect(joinFlowSteps[0].memoizedProps.headerImgSrc).toBe('/images/join-flow/email-header.png');
        expect(joinFlowSteps[0].memoizedProps.innerClassName).toBe('join-flow-inner-email-step');
        expect(joinFlowSteps[0].memoizedProps.nextButton).toBe('Create Your Account');
        expect(joinFlowSteps[0].memoizedProps.title).toBe('What\'s your email?');
        expect(joinFlowSteps[0].memoizedProps.titleClassName).toBe('join-flow-email-title');
        expect(joinFlowSteps[0].memoizedProps.waiting).toBe(true);
    });

    test('props sent to FormikInput for email', () => {
        const {findByComponentName, findAllByComponentName, instance} = renderWithIntl(<EmailStep
            {...defaultProps()}
        />, 'EmailStep');
        
        const emailStepInstance = instance();

        const joinFlowSteps = findAllByComponentName('JoinFlowStep');
        expect(joinFlowSteps).toHaveLength(1);
        
        const emailInput = findByComponentName('FormikInput');

        expect(emailInput.memoizedProps.id).toEqual('email');
        expect(emailInput.memoizedProps.error).toBeUndefined();
        expect(emailInput.memoizedProps.name).toEqual('email');
        expect(emailInput.memoizedProps.placeholder).toEqual('Email address');
        expect(emailInput.memoizedProps.validationClassName).toEqual('validation-full-width-input');
        expect(emailInput.memoizedProps.onSetRef).toEqual(emailStepInstance.handleSetEmailRef);
        expect(emailInput.memoizedProps.validate).toEqual(emailStepInstance.validateEmail);
    });

    test('handleValidSubmit passes formData to next step', () => {
        const formikBag = {
            setSubmitting: jest.fn()
        };

        const captchaRef = {
            executeCaptcha: jest.fn()
        };
        const formData = {item1: 'thing', item2: 'otherthing'};
        const emailStepInstance = renderWithIntl(<EmailStep
            {...defaultProps()}
        />, 'EmailStep').instance();
        emailStepInstance.setCaptchaRef(captchaRef);
        emailStepInstance.handleValidSubmit(formData, formikBag);

        expect(formikBag.setSubmitting).toHaveBeenCalledWith(false);
        expect(captchaRef.executeCaptcha).toHaveBeenCalled();
    });

    test('captchaSolved sets token and goes to next step', () => {
        const props = {
            onNextStep: jest.fn()
        };
        const formikBag = {
            setSubmitting: jest.fn()
        };
        const captchaRef = {
            executeCaptcha: jest.fn()
        };
        const formData = {item1: 'thing', item2: 'otherthing'};
        const emailStepInstance = renderWithIntl(<EmailStep
            {...defaultProps()}
            {...props}
        />, 'EmailStep').instance();

        emailStepInstance.setCaptchaRef(captchaRef); // to setup catpcha state
        emailStepInstance.handleValidSubmit(formData, formikBag);

        const captchaToken = 'abcd';
        emailStepInstance.handleCaptchaSolved(captchaToken);
        // Make sure captchaSolved calls onNextStep  with formData that has
        // a captcha token and left everything else in the object in place.
        expect(props.onNextStep).toHaveBeenCalledWith(
            expect.objectContaining({
                'item1': formData.item1,
                'item2': formData.item2,
                'g-recaptcha-response': captchaToken
            }));
        expect(formikBag.setSubmitting).toHaveBeenCalledWith(true);
    });

    test('Component logs analytics', () => {
        const sendAnalyticsFn = jest.fn();
        const onCaptchaError = jest.fn();
        renderWithIntl(
            <EmailStep
                sendAnalytics={sendAnalyticsFn}
                onCaptchaError={onCaptchaError}
            />);
        expect(sendAnalyticsFn).toHaveBeenCalledWith('join-email');
    });

    test('validateEmail test email empty', () => {
        const emailStepInstance = renderWithIntl(<EmailStep
            {...defaultProps()}
        />, 'EmailStep').instance();
        
        const val = emailStepInstance.validateEmail('');
        expect(val).toBe('Required');
    });

    test('validateEmail test email null', () => {
        const emailStepInstance = renderWithIntl(<EmailStep
            {...defaultProps()}
        />, 'EmailStep').instance();

        const val = emailStepInstance.validateEmail(null);
        expect(val).toBe('Required');
    });

    test('validateEmail test email undefined', () => {
        const emailStepInstance = renderWithIntl(<EmailStep
            {...defaultProps()}
        />, 'EmailStep').instance();

        const val = emailStepInstance.validateEmail();
        expect(val).toBe('Required');
    });
});

describe('validateEmailRemotelyWithCache test with successful requests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('validateEmailRemotelyWithCache calls validate.validateEmailRemotely', done => {
        const emailStepInstance = renderWithIntl(<EmailStep />, 'EmailStep').instance();

        emailStepInstance.validateEmailRemotelyWithCache('some-email@some-domain.com')
            .then(response => {
                expect(mockedValidateEmailRemotely).toHaveBeenCalled();
                expect(response.valid).toBe(false);
                expect(response.errMsgId).toBe('registration.validationEmailInvalid');
                done();
            });
    });

    test('validateEmailRemotelyWithCache, called twice with different data, makes two remote requests', done => {
        const emailStepInstance = renderWithIntl(<EmailStep />, 'EmailStep').instance();

        emailStepInstance.validateEmailRemotelyWithCache('some-email@some-domain.com')
            .then(response => {
                expect(mockedValidateEmailRemotely).toHaveBeenCalledTimes(1);
                expect(response.valid).toBe(false);
                expect(response.errMsgId).toBe('registration.validationEmailInvalid');
            })
            .then(() => {
                // make the same request a second time
                emailStepInstance.validateEmailRemotelyWithCache('different-email@some-domain.org')
                    .then(response => {
                        expect(mockedValidateEmailRemotely).toHaveBeenCalledTimes(2);
                        expect(response.valid).toBe(false);
                        expect(response.errMsgId).toBe('registration.validationEmailInvalid');
                        done();
                    });
            });
    });

    test('validateEmailRemotelyWithCache, called twice with same data, only makes one remote request', done => {
        const emailStepInstance = renderWithIntl(<EmailStep />, 'EmailStep').instance();

        emailStepInstance.validateEmailRemotelyWithCache('some-email@some-domain.com')
            .then(response => {
                expect(mockedValidateEmailRemotely).toHaveBeenCalledTimes(1);
                expect(response.valid).toBe(false);
                expect(response.errMsgId).toBe('registration.validationEmailInvalid');
            })
            .then(() => {
                // make the same request a second time
                emailStepInstance.validateEmailRemotelyWithCache('some-email@some-domain.com')
                    .then(response => {
                        expect(mockedValidateEmailRemotely).toHaveBeenCalledTimes(1);
                        expect(response.valid).toBe(false);
                        expect(response.errMsgId).toBe('registration.validationEmailInvalid');
                        done();
                    });
            });
    });
});


describe('validateEmailRemotelyWithCache test with failing requests', () => {

    beforeEach(() => {
        // needs to be wrapped inside beforeEach, because if not, it gets run as this
        // test file is loaded, and goes into effect before any of the earlier tests run!
        remoteRequestResponse = requestFailureResponse;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('validateEmailRemotelyWithCache calls validate.validateEmailRemotely', done => {
        const emailStepInstance = renderWithIntl(<EmailStep />, 'EmailStep').instance();

        emailStepInstance.validateEmailRemotelyWithCache('some-email@some-domain.com')
            .then(response => {
                expect(mockedValidateEmailRemotely).toHaveBeenCalled();
                expect(response.valid).toBe(false);
                expect(response.errMsgId).toBe('general.error');
                done();
            });
    });

    test('validateEmailRemotelyWithCache, called twice with different data, makes two remote requests', done => {
        const emailStepInstance = renderWithIntl(<EmailStep />, 'EmailStep').instance();

        emailStepInstance.validateEmailRemotelyWithCache('some-email@some-domain.com')
            .then(response => {
                expect(mockedValidateEmailRemotely).toHaveBeenCalledTimes(1);
                expect(response.valid).toBe(false);
                expect(response.errMsgId).toBe('general.error');
            })
            .then(() => {
                // make the same request a second time
                emailStepInstance.validateEmailRemotelyWithCache('different-email@some-domain.org')
                    .then(response => {
                        expect(mockedValidateEmailRemotely).toHaveBeenCalledTimes(2);
                        expect(response.valid).toBe(false);
                        expect(response.errMsgId).toBe('general.error');
                        done();
                    });
            });
    });

    test('validateEmailRemotelyWithCache, called 2x w/same data, makes 2 requests, since 1st not stored', done => {
        const emailStepInstance = renderWithIntl(<EmailStep />, 'EmailStep').instance();

        emailStepInstance.validateEmailRemotelyWithCache('some-email@some-domain.com')
            .then(response => {
                expect(mockedValidateEmailRemotely).toHaveBeenCalledTimes(1);
                expect(response.valid).toBe(false);
                expect(response.errMsgId).toBe('general.error');
            })
            .then(() => {
                // make the same request a second time
                emailStepInstance.validateEmailRemotelyWithCache('some-email@some-domain.com')
                    .then(response => {
                        expect(mockedValidateEmailRemotely).toHaveBeenCalledTimes(2);
                        expect(response.valid).toBe(false);
                        expect(response.errMsgId).toBe('general.error');
                        done();
                    });
            });
    });
});
