import React from 'react';
import OSChooser from '../../../src/components/os-chooser/os-chooser';
import {renderWithIntl} from '../../helpers/react-testing-library-wrapper';
import {fireEvent} from '@testing-library/react';

describe('OSChooser', () => {
    test('calls callback when OS is selected', () => {
        const onSetOs = jest.fn();
        const {container} = renderWithIntl(<OSChooser handleSetOS={onSetOs} />, 'OSChooser');

        const buttons = container.querySelectorAll('button');
        fireEvent.click(buttons[buttons.length - 1]);

        expect(onSetOs).toHaveBeenCalledWith('Android');
    });

    test('has all 4 operating systems', () => {
        const {container} = renderWithIntl(<OSChooser />, 'OSChooser');
        
        expect(container.querySelectorAll('button').length).toEqual(4);
    });

    test('hides operating systems', () => {
        const {container} = renderWithIntl(<OSChooser
            hideWindows
            hideMac
            hideChromeOS
            hideAndroid
        />,
        'OSChooser'
        );
        
        expect(container.querySelectorAll('button').length).toEqual(0);
    });
});
