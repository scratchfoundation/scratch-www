import React from 'react';
import {shallowWithIntl} from '../../helpers/intl-helpers.jsx';
import EmailStep from '../../../src/components/join-flow/email-step.jsx';
import JoinFlowStep from '../../../src/components/join-flow/join-flow-step.jsx';
const FormikInput = require('../../../src/components/formik-forms/formik-input.jsx');
const FormikCheckbox = require('../../../src/components/formik-forms/formik-checkbox.jsx');

describe('EmailStep test', () => {
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
        expect(joinFlowWrapper.props().description).toBe('registration.emailStepDescription');
        expect(joinFlowWrapper.props().footerContent.props.id).toBe('registration.acceptTermsOfUse');
        expect(joinFlowWrapper.props().headerImgSrc).toBe('/images/join-flow/email-header.png');
        expect(joinFlowWrapper.props().innerClassName).toBe('join-flow-inner-email-step');
        expect(joinFlowWrapper.props().nextButton).toBe('registration.createAccount');
        expect(joinFlowWrapper.props().title).toBe('registration.emailStepTitle');
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
        global.window.grecaptcha = {
            execute: jest.fn(),
            render: jest.fn()
        };
        const formData = {some: 'data}', is: 'here'};
        const wrapper = shallowWithIntl(
            <EmailStep />);

        const formikWrapper = wrapper.dive();
        formikWrapper.instance().onCaptchaLoad(); // to setup catpcha state
        formikWrapper.instance().handleValidSubmit(formData, formikBag);

        expect(formikBag.setSubmitting).toHaveBeenCalledWith(false);
        expect(global.window.grecaptcha.execute).toHaveBeenCalled();
    });
    test('captchaSolved sets token and goes to next step', () => {
        const props = {
            onNextStep: jest.fn()
        };
        const formikBag = {
            setSubmitting: jest.fn()
        };
        global.window.grecaptcha = {
            execute: jest.fn(),
            render: jest.fn()
        };
        const formData = {some: 'data}', is: 'here'};
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
        formData['gre-captcha-response'] = captchaToken;
        expect(props.onNextStep).toHaveBeenCalledWith(formData);
        expect(formikBag.setSubmitting).toHaveBeenCalledWith(true);
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
});
