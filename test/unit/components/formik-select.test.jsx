import React from 'react';
import FormikSelect from '../../../src/components/formik-forms/formik-select.jsx';
import {Formik} from 'formik';
import {renderWithIntl} from '../../helpers/react-testing-library-wrapper.jsx';

describe('FormikSelect', () => {
    test('No validation message without an error', () => {
        const {findByComponentName} = renderWithIntl(
            <Formik>
                <FormikSelect
                    error=""
                    options={[]}
                />
            </Formik>,
            'Formik'
        );

        expect(findByComponentName('ValidationMessage')).toBeFalsy();
        expect(findByComponentName('Field')).toBeTruthy();
    });

    test('Validation message shown when error present', () => {
        const {findByComponentName} = renderWithIntl(
            <Formik>
                <FormikSelect
                    error="uh oh. error"
                    options={[]}
                />
            </Formik>,
            'Formik'
        );
        expect(findByComponentName('ValidationMessage')).toBeTruthy();
        expect(findByComponentName('Field')).toBeTruthy();
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
        const {findByComponentName} = renderWithIntl(
            <Formik>
                <FormikSelect
                    error=""
                    options={optionList}
                />
            </Formik>,
            'Formik'
        );
        expect(findByComponentName('Field')).toBeTruthy();
        expect(findByComponentName('Field').memoizedProps.children.length).toEqual(2);
    });
});
