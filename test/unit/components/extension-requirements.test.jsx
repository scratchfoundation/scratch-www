import React from 'react';
import ExtensionRequirements from '../../../src/components/extension-landing/extension-requirements';
import {renderWithIntl} from '../../helpers/react-testing-library-wrapper.jsx';

describe('ExtensionRequirements', () => {

    test('shows default extension requirements', () => {
        const {container} = renderWithIntl(<ExtensionRequirements />, 'ExtensionRequirements');

        const spans = container.querySelectorAll('.extension-requirements span');
        const requirements = Array.from(spans).map(span => span.textContent.trim());

        expect(requirements).toEqual(
            ['Windows 10 version 1709+', 'macOS 10.15+', 'ChromeOS', 'Android 6.0+', 'Bluetooth', 'Scratch Link']
        );
    });

    test('hides requirements', () => {
        const {container} = renderWithIntl(<ExtensionRequirements
            hideWindows
            hideMac
            hideChromeOS
            hideAndroid
            hideBluetooth
            hideScratchLink
        />, 'ExtensionRequirements');

        expect(container.querySelectorAll('.extension-requirements span').length).toEqual(0);
    });
});
