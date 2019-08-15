import React from 'react';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
import FormikSelect from '../../../src/components/formik-forms/formik-select.jsx';
import {Formik} from 'formik';
import {Field} from 'formik';

describe('FormikSelect', () => {
    test('No validation message without an error', () => {
        const component = mountWithIntl(
            <Formik>
                <FormikSelect
                    error=""
                    options={[]}
                />
            </Formik>
        );

        expect(component.find('ValidationMessage').exists()).toEqual(false);
        expect(component.find(Field).exists()).toEqual(true);
    });

    test('Validation message shown when error present', () => {
        const component = mountWithIntl(
            <Formik>
                <FormikSelect
                    error="uh oh. error"
                    options={[]}
                />
            </Formik>
        );
        expect(component.find('ValidationMessage').exists()).toEqual(true);
        expect(component.find(Field).exists()).toEqual(true);
    });

    test('list of options passed to formik', () => {
        const optionList = [
            {
                disabled: false,
                label: 'option1',
                value: 'value1'
            },
            {
                disabled: false,
                label: 'option2',
                value: 'value2'
            }

        ];
        const component = mountWithIntl(
            <Formik>
                <FormikSelect
                    error=""
                    options={optionList}
                />
            </Formik>
        );
        expect(component.find(Field).exists()).toEqual(true);
        expect(component.find(Field).prop('children').length).toEqual(2);
    });
});
