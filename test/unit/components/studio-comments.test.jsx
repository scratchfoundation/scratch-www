import React from 'react';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
import {StudioComments} from '../../../src/views/studio/studio-comments.jsx';

describe('Studio comments', () => {
    test('if there are no comments, they get loaded', () => {
        const loadComments = jest.fn();
        const component = mountWithIntl(
            <StudioComments
                hasFetchedSession={false}
                comments={[]}
                handleLoadMoreComments={loadComments}
            />
        );
        expect(loadComments).not.toHaveBeenCalled();
        component.setProps({hasFetchedSession: true});
        component.update();
        expect(loadComments).toHaveBeenCalled();

        // When updated to have comments, load is not called again
        loadComments.mockClear();
        component.setProps({comments: [{id: 123, author: {}}]});
        component.update();
        expect(loadComments).not.toHaveBeenCalled();

        // When reset to have no comments again, load is called again
        loadComments.mockClear();
        component.setProps({comments: []});
        component.update();
        expect(loadComments).toHaveBeenCalled();
    });
    
    test('becoming an admin resets the comments', () => {
        const resetComments = jest.fn();
        const component = mountWithIntl(
            <StudioComments
                hasFetchedSession
                isAdmin={false}
                comments={[{id: 123, author: {}}]}
                handleResetComments={resetComments}
            />
        );
        expect(resetComments).not.toHaveBeenCalled();

        // When updated to isAdmin=true, reset is called
        resetComments.mockClear();
        component.setProps({isAdmin: true});
        component.update();
        expect(resetComments).toHaveBeenCalled();

        // If updated back to isAdmin=false, reset is also called
        // not currently possible in the UI, but if it was, we'd want to clear comments
        resetComments.mockClear();
        component.setProps({isAdmin: false});
        component.update();
        expect(resetComments).toHaveBeenCalled();
    });
    
    test('being an admin on initial render doesnt reset comments', () => {
        // This ensures that comments don't get reloaded when changing tabs
        const resetComments = jest.fn();
        mountWithIntl(
            <StudioComments
                isAdmin
                hasFetchedSession
                comments={[{id: 123, author: {}}]}
                handleResetComments={resetComments}
            />
        );
        expect(resetComments).not.toHaveBeenCalled();
    });
});
