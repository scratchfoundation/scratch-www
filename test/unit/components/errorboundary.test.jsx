import React from 'react';
const {mountWithIntl} = require('../../helpers/intl-helpers.jsx');

import CrashMessageComponent from '../../../src/components/crashmessage/crashmessage.jsx';
import ErrorBoundary from '../../../src/components/errorboundary/errorboundary.jsx';

const ChildComponent = () => <div>hello</div>;

describe('ErrorBoundary', () => {

    test('ErrorBoundary shows children before error and CrashMessageComponent after', () => {
        const child = <ChildComponent />;
        const wrapper = mountWithIntl(<ErrorBoundary>{child}</ErrorBoundary>);
        const childWrapper = wrapper.childAt(0);

        expect(wrapper.containsMatchingElement(child)).toBeTruthy();
        expect(wrapper.containsMatchingElement(<CrashMessageComponent />)).toBeFalsy();

        childWrapper.simulateError(new Error('fake error for testing purposes'));

        expect(wrapper.containsMatchingElement(child)).toBeFalsy();
        expect(wrapper.containsMatchingElement(<CrashMessageComponent />)).toBeTruthy();
    });
});
