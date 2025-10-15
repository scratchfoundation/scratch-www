import React from 'react';
import FeedbackForm from '../../../src/components/modal/mute/feedback-form';
import {renderWithIntl} from '../../helpers/react-testing-library-wrapper';

describe('FeedbackFormTest', () => {
    test('Feedback form empty feedback invalid', () => {
        const submitFn = jest.fn();
        const message = 'too short';
        const feedbackFormInstance = renderWithIntl(
            <FeedbackForm
                emptyErrorMessage={message}
                onSubmit={submitFn}
            />,
            'FeedbackForm'
        ).instance();
        expect(feedbackFormInstance.validateFeedback('')).toBe(message);
    });

    test('Feedback form shorter than minLength invalid', () => {
        const submitFn = jest.fn();
        const message = 'too short';
        const min = 7;
        const feedbackFormInstance = renderWithIntl(
            <FeedbackForm
                emptyErrorMessage={message}
                minLength={min}
                onSubmit={submitFn}
            />,
            'FeedbackForm'
        ).instance();

        expect(feedbackFormInstance.validateFeedback('123456')).toBe(message);
    });

    test('Feedback form greater than or equal to minLength invalid', () => {
        const submitFn = jest.fn();
        const message = 'too short';
        const min = 7;
        const feedbackFormInstance = renderWithIntl(
            <FeedbackForm
                emptyErrorMessage={message}
                minLength={min}
                onSubmit={submitFn}
            />,
            'FeedbackForm'
        ).instance();

        expect(feedbackFormInstance.validateFeedback('1234567')).toBeNull();
    });
});
