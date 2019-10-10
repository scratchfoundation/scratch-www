import React from 'react';
const {mountWithIntl} = require('../../helpers/intl-helpers.jsx');

jest.mock('@sentry/browser', () => {
    const setExtra = jest.fn();
    const setTag = jest.fn();

    const makeScope = (setExtraParam, setTagParam) => {
        const thisScope = {
            setExtra: setExtraParam,
            setTag: setTagParam
        };
        return thisScope;
    };
    const Sentry = {
        captureException: jest.fn(),
        lastEventId: function () {
            return 0;
        },
        setExtra: setExtra,
        setTag: setTag,
        withScope: jest.fn(cb => {
            cb(makeScope(setExtra, setTag));
        })
    };
    return Sentry;
});

const Sentry = require('@sentry/browser');
import ErrorBoundary from '../../../src/components/errorboundary/errorboundary.jsx';

describe('ErrorBoundary', () => {
    let errorBoundaryWrapper;

    const ChildClass = () => (
        <div>
            Children here
        </div>
    );

    beforeEach(() => {
        errorBoundaryWrapper = mountWithIntl(
            <ErrorBoundary
                name="TestEBName"
            >
                <ChildClass id="childClass" />
            </ErrorBoundary>
        );
    });

    test('calling ErrorBoundary\'s componentDidCatch() calls Sentry.withScope()', () => {
        const errorBoundaryInstance = errorBoundaryWrapper.instance();
        errorBoundaryInstance.componentDidCatch('error', {});
        expect(Sentry.withScope).toHaveBeenCalled();
    });

    test('calling ErrorBoundary\'s componentDidCatch() calls Sentry.captureException()', () => {
        const errorBoundaryInstance = errorBoundaryWrapper.instance();
        errorBoundaryInstance.componentDidCatch('error', {});
        expect(Sentry.captureException).toHaveBeenCalledWith('error');
    });

    test('throwing error under ErrorBoundary calls Sentry.withScope()', () => {
        const child = errorBoundaryWrapper.find('#childClass');
        expect(child.exists()).toEqual(true);
        child.simulateError({}, {});
        expect(Sentry.withScope).toHaveBeenCalled();
    });

    test('ErrorBoundary with name prop causes Sentry to setTag with that name', () => {
        const child = errorBoundaryWrapper.find('#childClass');
        expect(child.exists()).toEqual(true);
        child.simulateError({});
        expect(Sentry.setTag).toHaveBeenCalledWith('component', 'TestEBName');
    });
});
