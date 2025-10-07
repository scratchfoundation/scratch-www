import React from 'react';
import FormikInput from '../../../src/components/formik-forms/formik-input.jsx';
import {Formik} from 'formik';
import '@testing-library/jest-dom';
import {renderWithIntl} from '../../helpers/react-testing-library-wrapper.jsx';

describe('FormikInput', () => {
    test('No validation message with empty error, empty toolTip', () => {
        const {container, findByComponentName} = renderWithIntl(
            <Formik>
                <FormikInput
                    error=""
                    toolTip=""
                />
            </Formik>,
            'Formik'
        );
        expect(findByComponentName('ValidationMessage')).toBeFalsy();
        expect(container.querySelector('div.validation-error')).not.toBeInTheDocument();
        expect(container.querySelector('div.validation-info')).not.toBeInTheDocument();
    });

    test('No validation message with false error, false toolTip', () => {
        const {container, findByComponentName} = renderWithIntl(
            <Formik>
                <FormikInput
                    error={false}
                    toolTip={false}
                />
            </Formik>,
            'Formik'
        );
        expect(findByComponentName('ValidationMessage')).toBeFalsy();
        expect(container.querySelector('div.validation-error')).not.toBeInTheDocument();
        expect(container.querySelector('div.validation-info')).not.toBeInTheDocument();
    });

    test('No validation message with nonexistent error or toolTip', () => {
        const {container, findByComponentName} = renderWithIntl(
            <Formik>
                <FormikInput />
            </Formik>,
            'Formik'
        );
        expect(findByComponentName('ValidationMessage')).toBeFalsy();
        expect(container.querySelector('div.validation-error')).not.toBeInTheDocument();
        expect(container.querySelector('div.validation-info')).not.toBeInTheDocument();
    });

    test('Validation message shown when error given', () => {
        const {container, findByComponentName} = renderWithIntl(
            <Formik>
                <FormikInput
                    error="There was an error"
                />
            </Formik>,
            'Formik'
        );
        expect(findByComponentName('ValidationMessage')).toBeTruthy();
        expect(container.querySelector('div.validation-error')).toBeInTheDocument();
        expect(container.querySelector('div.validation-info')).not.toBeInTheDocument();
    });

    test('Tooltip shown when toolTip given', () => {
        const {container, findByComponentName} = renderWithIntl(
            <Formik>
                <FormikInput
                    toolTip="Have fun out there!"
                />
            </Formik>,
            'Formik'
        );
        expect(findByComponentName('ValidationMessage')).toBeTruthy();
        expect(container.querySelector('div.validation-error')).not.toBeInTheDocument();
        expect(container.querySelector('div.validation-info')).toBeInTheDocument();
    });

    test('If both error and toolTip messages, error takes precedence', () => {
        const {container, findByComponentName} = renderWithIntl(
            <Formik>
                <FormikInput
                    error="There was an error"
                    toolTip="Have fun out there!"
                />
            </Formik>,
            'Formik'
        );
        expect(findByComponentName('ValidationMessage')).toBeTruthy();
        expect(container.querySelector('div.validation-error')).toBeInTheDocument();
        expect(container.querySelector('div.validation-info')).not.toBeInTheDocument();
    });
});
