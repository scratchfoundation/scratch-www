import React from 'react';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
import ExtensionRequirements from '../../../src/components/extension-landing/extension-requirements';

describe('ExtensionRequirements', () => {

    test('shows default extension requirements', () => {
        const component = mountWithIntl(<ExtensionRequirements />);

        const requirements = component.find('.extension-requirements span').map(span => span.text());
        
        expect(requirements).toEqual(
            ['Windows 10 version 1709+', 'macOS 10.15+', 'ChromeOS', 'Android 6.0+', 'Bluetooth', 'Scratch Link']
        );
    });

    test('hides requirements', () => {
        const component = mountWithIntl(<ExtensionRequirements
            hideWindows
            hideMac
            hideChromeOS
            hideAndroid
            hideBluetooth
            hideScratchLink
        />);
        
        expect(component.find('.extension-requirements span').length).toEqual(0);
    });
});
