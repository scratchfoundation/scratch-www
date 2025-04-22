import React from 'react';
import MuteStep from '../../../src/components/modal/mute/mute-step';
import {renderWithIntl} from '../../helpers/react-testing-library-wrapper';

describe('MuteStepTest', () => {
    test('Mute Step with no images', () => {
        const {container} = renderWithIntl(
            <MuteStep
                header="header text"

            />,
            'MuteStep'
        );
        expect(container.querySelector('div.mute-step')).toBeTruthy();
        expect(container.querySelector('div.mute-header')).toBeTruthy();
        expect(container.querySelector('div.mute-right-column')).toBeTruthy();
        // No images and no left column.
        expect(container.querySelector('img')).toBeFalsy();
        expect(container.querySelector('div.left-column')).toBeFalsy();

    });

    test('Mute Step with side image', () => {
        const {container} = renderWithIntl(
            <MuteStep
                sideImg="/path/to/img.png"
                sideImgClass="side-img"
            />,
            'MuteStep'
        );
        expect(container.querySelector('div.mute-step')).toBeTruthy();
        expect(container.querySelector('div.mute-header')).toBeTruthy();
        expect(container.querySelector('div.mute-right-column')).toBeTruthy();
        expect(container.querySelector('div.left-column')).toBeTruthy();
        expect(container.querySelector('img.side-img')).toBeTruthy();

    });

    test('Mute Step with bottom image', () => {
        const {container} = renderWithIntl(
            <MuteStep
                bottomImg="/path/to/img.png"
                bottomImgClass="bottom-image"
            />,
            'MuteStep'
        );
        expect(container.querySelector('div.mute-step')).toBeTruthy();
        expect(container.querySelector('div.mute-header')).toBeTruthy();
        expect(container.querySelector('div.mute-right-column')).toBeTruthy();
        expect(container.querySelector('img.bottom-image')).toBeTruthy();
    });
});
