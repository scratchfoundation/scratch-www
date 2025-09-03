const React = require('react');
const Modal = require('../../../src/components/modal/base/modal.jsx');
const {
    renderWithIntl
} = require('../../helpers/react-testing-library-wrapper.jsx');

describe('Modal', () => {
    test('Close button not shown when showCloseButton false', () => {
        renderWithIntl(<Modal
            isOpen
            showCloseButton
        />);
        expect(
            global.document.querySelector('div.modal-content-close')
        ).toBeTruthy();
        expect(
            global.document.querySelector('img.modal-content-close-img')
        ).toBeTruthy();
    });

    test('Close button shown by default', () => {
        renderWithIntl(<Modal isOpen />);
        expect(
            global.document.querySelector('div.modal-content-close')
        ).toBeTruthy();
        expect(
            global.document.querySelector('img.modal-content-close-img')
        ).toBeTruthy();
    });

    test('Close button shown when showCloseButton true', () => {
        renderWithIntl(<Modal showCloseButton={false} />);
        expect(
            global.document.querySelector('div.modal-content-close')
        ).toBeFalsy();
        expect(
            global.document.querySelector('img.modal-content-close-img')
        ).toBeFalsy();
    });
});
