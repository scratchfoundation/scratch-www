import React from 'react';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
import OSChooser from '../../../src/components/os-chooser/os-chooser';

describe('OSChooser', () => {
    test('calls callback when OS is selected', () => {
        const onSetOs = jest.fn();
        const component = mountWithIntl(<OSChooser handleSetOS={onSetOs} />);

        component.find('button').last()
            .simulate('click');

        expect(onSetOs).toBeCalledWith('Android');
    });

    test('has all 4 operating systems', () => {
        const component = mountWithIntl(<OSChooser />);
        
        expect(component.find('button').length).toEqual(4);
    });

    test('hides operating systems', () => {
        const component = mountWithIntl(<OSChooser
            hideWindows
            hideMac
            hideChromeOS
            hideAndroid
        />);
        
        expect(component.find('button').length).toEqual(0);
    });
});
