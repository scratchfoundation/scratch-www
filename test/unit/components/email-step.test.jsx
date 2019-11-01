const React = require('react');
const {shallowWithIntl} = require('../../helpers/intl-helpers.jsx');
const JoinFlowStep = require('../../../src/components/join-flow/join-flow-step.jsx');
const FormikInput = require('../../../src/components/formik-forms/formik-input.jsx');
const FormikCheckbox = require('../../../src/components/formik-forms/formik-checkbox.jsx');

const mockedValidateEmailRemotely = jest.fn(() => (
    /* eslint-disable no-undef */
    Promise.resolve({valid: false, errMsgId: 'registration.validationEmailInvalid'})
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
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('send correct props to formik', () => {
        const wrapper = shallowWithIntl(<EmailStep />);

        const formikWrapper = wrapper.dive();
        expect(formikWrapper.props().initialValues.subscribe).toBe(false);
        expect(formikWrapper.props().initialValues.email).toBe('');
        expect(formikWrapper.props().validateOnBlur).toBe(false);
        expect(formikWrapper.props().validateOnChange).toBe(false);
        expect(formikWrapper.props().validate).toBe(formikWrapper.instance().validateForm);
        expect(formikWrapper.props().onSubmit).toBe(formikWrapper.instance().handleValidSubmit);
    });

    test('props sent to JoinFlowStep', () => {
        const wrapper = shallowWithIntl(<EmailStep />);
        // Dive to get past the intl wrapper
        const formikWrapper = wrapper.dive();
        // Dive to get past the anonymous component.
        const joinFlowWrapper = formikWrapper.dive().find(JoinFlowStep);
        expect(joinFlowWrapper).toHaveLength(1);
        expect(joinFlowWrapper.props().footerContent.props.id).toBe('registration.acceptTermsOfUse');
        expect(joinFlowWrapper.props().headerImgSrc).toBe('/images/join-flow/email-header.png');
        expect(joinFlowWrapper.props().innerClassName).toBe('join-flow-inner-email-step');
        expect(joinFlowWrapper.props().nextButton).toBe('registration.createAccount');
        expect(joinFlowWrapper.props().title).toBe('registration.emailStepTitle');
        expect(joinFlowWrapper.props().titleClassName).toBe('join-flow-email-title');
        expect(joinFlowWrapper.props().waiting).toBe(true);
    });

    test('props sent to FormikInput for email', () => {
        const wrapper = shallowWithIntl(<EmailStep />);
        // Dive to get past the intl wrapper
        const formikWrapper = wrapper.dive();
        // Dive to get past the anonymous component.
        const joinFlowWrapper = formikWrapper.dive().find(JoinFlowStep);
        expect(joinFlowWrapper).toHaveLength(1);
        const emailInputWrapper = joinFlowWrapper.find(FormikInput).first();
        expect(emailInputWrapper.props().id).toEqual('email');
        expect(emailInputWrapper.props().error).toBeUndefined();
        expect(emailInputWrapper.props().name).toEqual('email');
        expect(emailInputWrapper.props().placeholder).toEqual('general.emailAddress');
        expect(emailInputWrapper.props().validationClassName).toEqual('validation-full-width-input');
        expect(emailInputWrapper.props().onSetRef).toEqual(formikWrapper.instance().handleSetEmailRef);
        expect(emailInputWrapper.props().validate).toEqual(formikWrapper.instance().validateEmail);
    });

    test('props sent to FormikCheckbox for subscribe', () => {
        const wrapper = shallowWithIntl(<EmailStep />);
        // Dive to get past the intl wrapper
        const formikWrapper = wrapper.dive();
        // Dive to get past the anonymous component.
        const joinFlowWrapper = formikWrapper.dive().find(JoinFlowStep);
        expect(joinFlowWrapper).toHaveLength(1);
        const checkboxWrapper = joinFlowWrapper.find(FormikCheckbox).first();
        expect(checkboxWrapper).toHaveLength(1);
        expect(checkboxWrapper.first().props().id).toEqual('subscribeCheckbox');
        expect(checkboxWrapper.first().props().label).toEqual('registration.receiveEmails');
        expect(checkboxWrapper.first().props().name).toEqual('subscribe');
    });

    test('handleValidSubmit passes formData to next step', () => {
        const formikBag = {
            setSubmitting: jest.fn()
        };
        global.grecaptcha = {
            execute: jest.fn(),
            render: jest.fn()
        };
        const formData = {item1: 'thing', item2: 'otherthing'};
        const wrapper = shallowWithIntl(
            <EmailStep />);

        const formikWrapper = wrapper.dive();
        formikWrapper.instance().onCaptchaLoad(); // to setup catpcha state
        formikWrapper.instance().handleValidSubmit(formData, formikBag);

        expect(formikBag.setSubmitting).toHaveBeenCalledWith(false);
        expect(global.grecaptcha.execute).toHaveBeenCalled();
    });

    test('captchaSolved sets token and goes to next step', () => {
        const props = {
            onNextStep: jest.fn()
        };
        const formikBag = {
            setSubmitting: jest.fn()
        };
        global.grecaptcha = {
            execute: jest.fn(),
            render: jest.fn()
        };
        const formData = {item1: 'thing', item2: 'otherthing'};
        const wrapper = shallowWithIntl(
            <EmailStep
                {...props}
            />);

        const formikWrapper = wrapper.dive();
        // Call these to setup captcha.
        formikWrapper.instance().onCaptchaLoad(); // to setup catpcha state
        formikWrapper.instance().handleValidSubmit(formData, formikBag);

        const captchaToken = 'abcd';
        formikWrapper.instance().captchaSolved(captchaToken);
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

    test('onCaptchaError calls error function with correct message', () => {
        const props = {
            onRegistrationError: jest.fn()
        };

        const wrapper = shallowWithIntl(
            <EmailStep
                {...props}
            />);

        const formikWrapper = wrapper.dive();
        formikWrapper.instance().onCaptchaError();
        expect(props.onRegistrationError).toHaveBeenCalledWith('registration.troubleReload');
    });

    test('Captcha load error calls error function', () => {
        const props = {
            onRegistrationError: jest.fn()
        };
        // Set this to null to force an error.
        global.grecaptcha = null;
        const wrapper = shallowWithIntl(
            <EmailStep
                {...props}
            />);

        const formikWrapper = wrapper.dive();
        formikWrapper.instance().onCaptchaLoad();
        expect(props.onRegistrationError).toHaveBeenCalledWith('registration.troubleReload');
    });

    test('validateEmail test email empty', () => {
        const wrapper = shallowWithIntl(
            <EmailStep />);
        const formikWrapper = wrapper.dive();
        const val = formikWrapper.instance().validateEmail('');
        expect(val).toBe('general.required');
    });

    test('validateEmail test email null', () => {
        const wrapper = shallowWithIntl(
            <EmailStep />);
        const formikWrapper = wrapper.dive();
        const val = formikWrapper.instance().validateEmail(null);
        expect(val).toBe('general.required');
    });

    test('validateEmail test email undefined', () => {
        const wrapper = shallowWithIntl(
            <EmailStep />);
        const formikWrapper = wrapper.dive();
        const val = formikWrapper.instance().validateEmail();
        expect(val).toBe('general.required');
    });

    test('validateEmailRemotelyWithCache calls validate.validateEmailRemotely', done => {
        const wrapper = shallowWithIntl(
            <EmailStep />);
        const instance = wrapper.dive().instance();

        instance.validateEmailRemotelyWithCache('some-email@some-domain.com')
            .then(response => {
                expect(mockedValidateEmailRemotely).toHaveBeenCalled();
                expect(response.valid).toBe(false);
                expect(response.errMsgId).toBe('registration.validationEmailInvalid');
                done();
            });
    });

    test('validateEmailRemotelyWithCache, called twice with different data, makes two remote requests', done => {
        const wrapper = shallowWithIntl(
            <EmailStep />
        );
        const instance = wrapper.dive().instance();

        instance.validateEmailRemotelyWithCache('some-email@some-domain.com')
            .then(response => {
                expect(mockedValidateEmailRemotely).toHaveBeenCalledTimes(1);
                expect(response.valid).toBe(false);
                expect(response.errMsgId).toBe('registration.validationEmailInvalid');
            })
            .then(() => {
                // make the same request a second time
                instance.validateEmailRemotelyWithCache('different-email@some-domain.org')
                    .then(response => {
                        expect(mockedValidateEmailRemotely).toHaveBeenCalledTimes(2);
                        expect(response.valid).toBe(false);
                        expect(response.errMsgId).toBe('registration.validationEmailInvalid');
                        done();
                    });
            });
    });

    test('validateEmailRemotelyWithCache, called twice with same data, only makes one remote request', done => {
        const wrapper = shallowWithIntl(
            <EmailStep />
        );
        const instance = wrapper.dive().instance();

        instance.validateEmailRemotelyWithCache('some-email@some-domain.com')
            .then(response => {
                expect(mockedValidateEmailRemotely).toHaveBeenCalledTimes(1);
                expect(response.valid).toBe(false);
                expect(response.errMsgId).toBe('registration.validationEmailInvalid');
            })
            .then(() => {
                // make the same request a second time
                instance.validateEmailRemotelyWithCache('some-email@some-domain.com')
                    .then(response => {
                        expect(mockedValidateEmailRemotely).toHaveBeenCalledTimes(1);
                        expect(response.valid).toBe(false);
                        expect(response.errMsgId).toBe('registration.validationEmailInvalid');
                        done();
                    });
            });
    });
});
