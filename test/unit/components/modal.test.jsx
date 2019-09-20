const React = require('react');
const {shallowWithIntl} = require('../../helpers/intl-helpers.jsx');
const Modal = require('../../../src/components/modal/base/modal.jsx');

describe('Modal', () => {
    test('Close button not shown when showCloseButton false', () => {
        const showClose = true;
        const component = shallowWithIntl(
            <Modal
                showCloseButton={showClose}
            />
        );
        expect(component.find('div.modal-content-close').exists()).toBe(true);
        expect(component.find('img.modal-content-close-img').exists()).toBe(true);
    });
    test('Close button shown by default', () => {
        const component = shallowWithIntl(
            <Modal />
        );
        expect(component.find('div.modal-content-close').exists()).toBe(true);
        expect(component.find('img.modal-content-close-img').exists()).toBe(true);
    });

    test('Close button shown when showCloseButton true', () => {
        const showClose = false;
        const component = shallowWithIntl(
            <Modal
                showCloseButton={showClose}
            />
        );
        expect(component.find('div.modal-content-close').exists()).toBe(false);
        expect(component.find('img.modal-content-close-img').exists()).toBe(false);
    });
});
