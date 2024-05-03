import React from 'react';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';

import {StudioComments} from '../../../src/views/studio/studio-comments.jsx';

// Replace customized studio comment with default comment to avoid redux issues in the test
jest.mock('../../../src/views/studio/studio-comment.js', () => (
    jest.requireActual('../../../src/views/preview/comment/comment.jsx')
));

describe('Studio comments', () => {
    const testComments = [{id: 123, author: {}, datetime_created: new Date().toISOString()}];

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
        component.setProps({comments: testComments});
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
                comments={testComments}
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
                comments={testComments}
                handleResetComments={resetComments}
            />
        );
        expect(resetComments).not.toHaveBeenCalled();
    });

    test('Comments do not show when shouldShowCommentsList is false', () => {
        const component = mountWithIntl(
            <StudioComments
                hasFetchedSession
                isAdmin={false}
                comments={testComments}
                shouldShowCommentsList={false}
            />
        );
        expect(component.find('div.studio-compose-container').exists()).toBe(true);
        expect(component.find('TopLevelComment').exists()).toBe(false);
    });

    test('Comments show when shouldShowCommentsList is true', () => {
        const component = mountWithIntl(
            <StudioComments
                hasFetchedSession
                isAdmin={false}
                comments={testComments}
                shouldShowCommentsList

            />
        );
        expect(component.find('div.studio-compose-container').exists()).toBe(true);
        expect(component.find('TopLevelComment').exists()).toBe(true);
    });

    test('Single comment load more shows when shouldShowCommentsList is true', () => {
        // Make the component think this is a single view.
        global.window.location.hash = '#comments-6';
        const component = mountWithIntl(
            <StudioComments
                hasFetchedSession
                isAdmin={false}
                comments={testComments}
                shouldShowCommentsList
                singleCommentId
            />
        );
        expect(component.find('div.studio-compose-container').exists()).toBe(true);
        expect(component.find('TopLevelComment').exists()).toBe(true);
        expect(component.find('Button').exists()).toBe(true);
        expect(component.find('button.load-more-button').exists()).toBe(true);
        global.window.location.hash = '';
    });

    test('Single comment does not show when shouldShowCommentsList is false', () => {
        // Make the component think this is a single view.
        global.window.location.hash = '#comments-6';
        const component = mountWithIntl(
            <StudioComments
                hasFetchedSession
                isAdmin={false}
                comments={testComments}
                shouldShowCommentsList={false}
                singleCommentId
            />
        );
        expect(component.find('div.studio-compose-container').exists()).toBe(true);
        expect(component.find('TopLevelComment').exists()).toBe(false);
        expect(component.find('Button').exists()).toBe(false);
        expect(component.find('button.load-more-button').exists()).toBe(false);
        global.window.location.hash = '';
    });

    test('Comment status error shows when shoudlShowCommentsGloballyOffError is true', () => {
        const component = mountWithIntl(
            <StudioComments
                hasFetchedSession={false}
                isAdmin={false}
                comments={testComments}
                shouldShowCommentsGloballyOffError
            />
        );
        expect(component.find('div.studio-compose-container').exists()).toBe(true);
        expect(component.find('CommentingStatus').exists()).toBe(true);
    });

    test('Comment status error does not show when shoudlShowCommentsGloballyOffError is false', () => {
        const component = mountWithIntl(
            <StudioComments
                hasFetchedSession={false}
                isAdmin={false}
                comments={testComments}
                shouldShowCommentsGloballyOffError={false}
            />
        );
        expect(component.find('div.studio-compose-container').exists()).toBe(true);
        expect(component.find('CommentingStatus').exists()).toBe(false);
    });
});
