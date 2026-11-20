import React from 'react';
import RelativeTime from '../../../src/components/relative-time/relative-time';
import {renderWithIntl} from '../../helpers/react-testing-library-wrapper.jsx';

describe('RelativeTime', () => {
    const now = new Date('2026-09-24T12:00:00.000Z');

    beforeEach(() => {
        jest.useFakeTimers({now});
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('shows a past time as time ago', () => {
        const {container} = renderWithIntl(
            <RelativeTime value={new Date(now.getTime() - 5000)} />
        );
        expect(container.textContent).toBe('5 seconds ago');
    });

    test('shows a time ahead of the local clock as now', () => {
        const {container} = renderWithIntl(
            <RelativeTime value={new Date(now.getTime() + 5000)} />
        );
        expect(container.textContent).toBe('now');
    });
});
