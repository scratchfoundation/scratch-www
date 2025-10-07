import React from 'react';

import {StudioComments} from '../../../src/views/studio/studio-comments.jsx';
import {renderWithIntl} from '../../helpers/react-testing-library-wrapper.jsx';

// Replace customized studio comment with default comment to avoid redux issues in the test
jest.mock('../../../src/views/studio/studio-comment.js', () => (
    jest.requireActual('../../../src/views/preview/comment/comment.jsx')
));

describe('Studio comments', () => {
    const testComments = [{id: 123, author: {}, datetime_created: new Date().toISOString()}];

    test('if there are no comments, they get loaded', () => {
        const loadComments = jest.fn();
        const props = {
            hasFetchedSession: false,
            comments: [],
            handleLoadMoreComments: loadComments
        };
        const {rerenderWithIntl} = renderWithIntl(
            <StudioComments
                {...props}
            />,
            'StudioComments'
        );
        expect(loadComments).not.toHaveBeenCalled();
        rerenderWithIntl(<StudioComments
            {...props}
            hasFetchedSession
        />);
        expect(loadComments).toHaveBeenCalled();

        // When updated to have comments, load is not called again
        loadComments.mockClear();
        rerenderWithIntl(<StudioComments
            {...props}
            comments={testComments}
        />);
        expect(loadComments).not.toHaveBeenCalled();

        // When reset to have no comments again, load is called again
        loadComments.mockClear();
        rerenderWithIntl(<StudioComments
            {...props}
            hasFetchedSession
            comments={[]}
        />);
        expect(loadComments).toHaveBeenCalled();
    });
    
    test('becoming an admin resets the comments', () => {
        const resetComments = jest.fn();
        const props = {
            hasFetchedSession: true,
            isAdmin: false,
            comments: testComments,
            handleResetComments: resetComments
        };
        const {rerenderWithIntl} = renderWithIntl(
            <StudioComments
                {...props}
            />
        );
        expect(resetComments).not.toHaveBeenCalled();

        // When updated to isAdmin=true, reset is called
        resetComments.mockClear();
        rerenderWithIntl(<StudioComments
            {...props}
            isAdmin
        />);
        expect(resetComments).toHaveBeenCalled();

        // If updated back to isAdmin=false, reset is also called
        // not currently possible in the UI, but if it was, we'd want to clear comments
        resetComments.mockClear();
        rerenderWithIntl();
        expect(resetComments).toHaveBeenCalled();
    });
    
    test('being an admin on initial render doesnt reset comments', () => {
        // This ensures that comments don't get reloaded when changing tabs
        const resetComments = jest.fn();
        renderWithIntl(
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
        const {container, findByComponentName} = renderWithIntl(
            <StudioComments
                hasFetchedSession
                isAdmin={false}
                comments={testComments}
                shouldShowCommentsList={false}
            />,
            'StudioComments'
        );
        expect(container.querySelector('div.studio-compose-container')).toBeTruthy();
        expect(findByComponentName('TopLevelComment')).toBeFalsy();
    });

    test('Comments show when shouldShowCommentsList is true', () => {
        const {container, findByComponentName} = renderWithIntl(
            <StudioComments
                hasFetchedSession
                isAdmin={false}
                comments={testComments}
                shouldShowCommentsList

            />,
            'StudioComments'
        );
        expect(container.querySelector('div.studio-compose-container')).toBeTruthy();
        expect(findByComponentName('TopLevelComment')).toBeTruthy();
    });

    test('Single comment load more shows when shouldShowCommentsList is true', () => {
        // Make the component think this is a single view.
        global.window.location.hash = '#comments-6';
        const {container, findByComponentName} = renderWithIntl(
            <StudioComments
                hasFetchedSession
                isAdmin={false}
                comments={testComments}
                shouldShowCommentsList
                singleCommentId
            />,
            'StudioComments'
        );
        expect(container.querySelector('div.studio-compose-container')).toBeTruthy();
        expect(findByComponentName('TopLevelComment')).toBeTruthy();
        expect(findByComponentName('Button')).toBeTruthy();
        expect(container.querySelector('button.load-more-button')).toBeTruthy();
        global.window.location.hash = '';
    });

    test('Single comment does not show when shouldShowCommentsList is false', () => {
        // Make the component think this is a single view.
        global.window.location.hash = '#comments-6';
        const {container, findByComponentName} = renderWithIntl(
            <StudioComments
                hasFetchedSession
                isAdmin={false}
                comments={testComments}
                shouldShowCommentsList={false}
                singleCommentId
            />,
            'StudioComments'
        );
        expect(container.querySelector('div.studio-compose-container')).toBeTruthy();
        expect(findByComponentName('TopLevelComment')).toBeFalsy();
        expect(container.querySelector('Button')).toBeFalsy();
        expect(container.querySelector('button.load-more-button')).toBeFalsy();
        global.window.location.hash = '';
    });

    test('Comment status error shows when shoudlShowCommentsGloballyOffError is true', () => {
        const {container, findByComponentName} = renderWithIntl(
            <StudioComments
                hasFetchedSession={false}
                isAdmin={false}
                comments={testComments}
                shouldShowCommentsGloballyOffError
            />,
            'StudioComments'
        );
        expect(container.querySelector('div.studio-compose-container')).toBeTruthy();
        expect(findByComponentName('CommentingStatus')).toBeTruthy();
    });

    test('Comment status error does not show when shoudlShowCommentsGloballyOffError is false', () => {
        const {container} = renderWithIntl(
            <StudioComments
                hasFetchedSession={false}
                isAdmin={false}
                comments={testComments}
                shouldShowCommentsGloballyOffError={false}
            />
        );
        expect(container.querySelector('div.studio-compose-container')).toBeTruthy();
        expect(container.querySelector('CommentingStatus')).toBeFalsy();
    });
});
