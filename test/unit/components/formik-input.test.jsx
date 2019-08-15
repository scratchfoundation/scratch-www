import React from 'react';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
import FormikInput from '../../../src/components/formik-forms/formik-input.jsx';
import {Formik} from 'formik';

describe('FormikInput', () => {
    test('No validation message without an error', () => {
        const component = mountWithIntl(
            <Formik>
                <FormikInput
                    error=""
                />
            </Formik>
        );
        expect(component.find('ValidationMessage').exists()).toEqual(false);
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
    });
});
