import React from 'react';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
import FeedbackForm from '../../../src/components/modal/mute/feedback-form';

describe('FeedbackFormTest', () => {
    test('Feedback form empty feedback invalid', () => {
        const submitFn = jest.fn();
        const message = 'too short';
        const component = mountWithIntl(
            <FeedbackForm
                emptyErrorMessage={message}
                onSubmit={submitFn}
            />
        );
        expect(component.find('FeedbackForm').instance()
            .validateFeedback('')
        ).toBe(message);
    });

    test('Feedback form shorter than minLength invalid', () => {
        const submitFn = jest.fn();
        const message = 'too short';
        const min = 7;
        const component = mountWithIntl(
            <FeedbackForm
                emptyErrorMessage={message}
                minLength={min}
                onSubmit={submitFn}
            />
        );
        
        expect(component.find('FeedbackForm').instance()
            .validateFeedback('123456')
        ).toBe(message);
    });

    test('Feedback form greater than or equal to minLength invalid', () => {
        const submitFn = jest.fn();
        const message = 'too short';
        const min = 7;
        const component = mountWithIntl(
            <FeedbackForm
                emptyErrorMessage={message}
                minLength={min}
                onSubmit={submitFn}
            />
        );
        
        expect(component.find('FeedbackForm').instance()
            .validateFeedback('1234567')
        ).toBeNull();
    });
});
