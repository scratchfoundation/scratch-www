import React, {useEffect, useRef, useState} from 'react';
import ErrorBoundary from '../../../src/components/errorboundary/errorboundary.jsx';
import {renderWithIntl} from '../../helpers/react-testing-library-wrapper.jsx';
import {fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

const ChildComponent = () => {
    const hasRendered = useRef(false);
    const [text, setText] = useState('hello');

    useEffect(() => {
        if (hasRendered.current) {
            throw new Error('This component has been re-rendered!');
        } else {
            hasRendered.current = true;
        }
    });

    // eslint-disable-next-line react/jsx-no-bind
    return <div onClick={() => setText('not hello')}>{text}</div>;
};

describe('ErrorBoundary', () => {

    test('ErrorBoundary shows children before error and CrashMessageComponent after', () => {
        const child = <ChildComponent />;
        const {findByComponentName} = renderWithIntl(
            <ErrorBoundary>{child}</ErrorBoundary>,
            'ErrorBoundary'
        );

        expect(findByComponentName('ChildComponent')).toBeTruthy();
        expect(findByComponentName('CrashMessage')).toBeFalsy();

        const helloDiv = screen.getByText('hello');
        fireEvent.click(helloDiv);

        expect(findByComponentName('ChildComponent')).toBeFalsy();
        expect(findByComponentName('CrashMessage')).toBeTruthy();
    });
});
