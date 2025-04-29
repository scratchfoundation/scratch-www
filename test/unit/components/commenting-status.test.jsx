const React = require('react');
const {render} = require('@testing-library/react');
require('@testing-library/jest-dom');
const CommentingStatus = require('../../../src/components/commenting-status/commenting-status.jsx');

describe('CommentingStatus', () => {
    test('Basic render', () => {
        const {container} = render(
            <CommentingStatus />
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('ClassNames added', () => {
        const {container} = render(
            <CommentingStatus
                className="class1"
                innerClassName="class2"
            />
        );
        
        expect(container.firstChild).toMatchSnapshot();
    });

    test('Children added', () => {
        const {container} = render(
            <CommentingStatus>
                <img className="myChildDiv" />
            </CommentingStatus>
        );
        
        expect(container.firstChild).toMatchSnapshot();
    });
});
