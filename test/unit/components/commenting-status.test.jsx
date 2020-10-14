const React = require('react');
const {shallowWithIntl} = require('../../helpers/intl-helpers.jsx');
const CommentingStatus = require('../../../src/components/commenting-status/commenting-status.jsx');

describe('CommentingStatus', () => {
    test('Basic render', () => {
        const component = shallowWithIntl(
            <CommentingStatus />
        );
        expect(component.find('div.commenting-status').exists()).toBe(true);
        expect(component.find('img.comment-status-icon').exists()).toBe(true);
    });

    test('ClassNames added', () => {
        const component = shallowWithIntl(
            <CommentingStatus
                className="class1"
                innerClassName="class2"
            />
        );
        expect(component.find('div.class1').exists()).toBe(true);
        expect(component.find('div.class2').exists()).toBe(true);
    });

    test('Children added', () => {
        const component = shallowWithIntl(
            <CommentingStatus>
                <img className="myChildDiv" />
            </CommentingStatus>
        );
        expect(component.find('img.myChildDiv').exists()).toBe(true);
    });
});
