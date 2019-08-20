import React from 'react';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
import FormikInput from '../../../src/components/formik-forms/formik-input.jsx';
import {Formik} from 'formik';

describe('FormikInput', () => {
    test('No validation message without an error or a tooltip', () => {
        const component = mountWithIntl(
            <Formik>
                <FormikInput
                    error=""
                    tooltip=""
                />
            </Formik>
        );
        expect(component.find('ValidationMessage').exists()).toEqual(false);
        expect(component.find('div.validation-error').exists()).toEqual(false);
        expect(component.find('div.validation-info').exists()).toEqual(false);
    });

    test('No validation message with blank error or tooltip', () => {
        const component = mountWithIntl(
            <Formik>
                <FormikInput />
            </Formik>
        );
        expect(component.find('ValidationMessage').exists()).toEqual(false);
        expect(component.find('div.validation-error').exists()).toEqual(false);
        expect(component.find('div.validation-info').exists()).toEqual(false);
    });

    test('Validation message shown when error given', () => {
        const component = mountWithIntl(
            <Formik>
                <FormikInput
                    error="There was an error"
                />
            </Formik>
        );
        expect(component.find('ValidationMessage').exists()).toEqual(true);
        expect(component.find('div.validation-error').exists()).toEqual(true);
        expect(component.find('div.validation-info').exists()).toEqual(false);
    });

    test('Tooltip shown when tooltip given', () => {
        const component = mountWithIntl(
            <Formik>
                <FormikInput
                    toolTip="Have fun out there!"
                />
            </Formik>
        );
        expect(component.find('ValidationMessage').exists()).toEqual(true);
        expect(component.find('div.validation-error').exists()).toEqual(false);
        expect(component.find('div.validation-info').exists()).toEqual(true);
    });

    test('If both error and tooltip messages, error takes precedence', () => {
        const component = mountWithIntl(
            <Formik>
                <FormikInput
                    error="There was an error"
                    toolTip="Have fun out there!"
                />
            </Formik>
        );
        expect(component.find('ValidationMessage').exists()).toEqual(true);
        expect(component.find('div.validation-error').exists()).toEqual(true);
        expect(component.find('div.validation-info').exists()).toEqual(false);
    });
});
