import React from 'react';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
import NextStepButton from '../../../src/components/join-flow/next-step-button';
import Spinner from '../../../src/components/spinner/spinner.jsx';

describe('NextStepButton', () => {
    const defaultProps = () => ({
        text: 'I am a button',
        waiting: false

    });
    test('testing spinner does not show and button enabled', () => {
        const component = mountWithIntl(
            <NextStepButton
                {...defaultProps()}
            />
        );
        expect(component.find(Spinner).exists()).toEqual(false);
        expect(component.find('button[type="submit"]').prop('disabled')).toBe(false);

    });
    test('testing spinner does show and button disabled', () => {
        const component = mountWithIntl(
            <NextStepButton
                {...defaultProps()}
            />
        );
        component.setProps({waiting: true});
        expect(component.find(Spinner).exists()).toEqual(true);
        expect(component.find('button[type="submit"]').prop('disabled')).toBe(true);
    });
});
