import React from 'react';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
import MuteStep from '../../../src/components/modal/mute/mute-step';

describe('MuteStepTest', () => {
    test('Mute Step with no images ', () => {
        const component = mountWithIntl(
            <MuteStep
                header="header text"

            />
        );
        expect(component.find('div.mute-step').exists()).toEqual(true);
        expect(component.find('div.mute-header').exists()).toEqual(true);
        expect(component.find('div.mute-right-column').exists()).toEqual(true);
        // No images and no left column.
        expect(component.find('img').exists()).toEqual(false);
        expect(component.find('div.left-column').exists()).toEqual(false);

    });

    test('Mute Step with side image ', () => {
        const component = mountWithIntl(
            <MuteStep
                sideImg="/path/to/img.png"
                sideImgClass="side-img"
            />
        );
        expect(component.find('div.mute-step').exists()).toEqual(true);
        expect(component.find('div.mute-header').exists()).toEqual(true);
        expect(component.find('div.mute-right-column').exists()).toEqual(true);
        expect(component.find('div.left-column').exists()).toEqual(true);
        expect(component.find('img.side-img').exists()).toEqual(true);

    });

    test('Mute Step with bottom image ', () => {
        const component = mountWithIntl(
            <MuteStep
                bottomImg="/path/to/img.png"
                bottomImgClass="bottom-image"
            />
        );
        expect(component.find('div.mute-step').exists()).toEqual(true);
        expect(component.find('div.mute-header').exists()).toEqual(true);
        expect(component.find('div.mute-right-column').exists()).toEqual(true);
        expect(component.find('img.bottom-image').exists()).toEqual(true);
    });
});
