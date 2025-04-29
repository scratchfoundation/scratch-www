import React from 'react';
import NextStepButton from '../../../src/components/join-flow/next-step-button';
import {renderWithIntl} from '../../helpers/react-testing-library-wrapper.jsx';

describe('NextStepButton', () => {
    const defaultProps = () => ({
        text: 'I am a button',
        waiting: false

    });
    test('testing spinner does not show and button enabled', () => {
        const {container, findByComponentName} = renderWithIntl(
            <NextStepButton
                {...defaultProps()}
            />,
            'NextStepButton'
        );
        expect(findByComponentName('Spinner')).toBeFalsy();
        expect(container.querySelector('button[type="submit"]').disabled).toBe(false);

    });
    test('testing spinner does show and button disabled', () => {
        const {container, findByComponentName} = renderWithIntl(
            <NextStepButton
                {...defaultProps()}
                waiting
            />,
            'NextStepButton'
        );
        expect(findByComponentName('Spinner')).toBeTruthy();
        expect(container.querySelector('button[type="submit"]').disabled).toBe(true);
    });
});
