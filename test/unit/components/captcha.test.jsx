const React = require('react');

const Captcha = require('../../../src/components/captcha/captcha.jsx');
const {render} = require('@testing-library/react');

describe('Captcha test', () => {
    global.grecaptcha = {
        execute: jest.fn(),
        render: jest.fn()
    };

    test('Captcha load calls props captchaOnLoad', () => {
        const props = {
            onCaptchaLoad: jest.fn()
        };
        render(<Captcha
            {...props}
        />);
        
        expect(global.grecaptcha.render).toHaveBeenCalled();
        expect(props.onCaptchaLoad).toHaveBeenCalled();
    });

    test('Captcha execute calls grecatpcha execute', () => {
        const props = {
            onCaptchaLoad: jest.fn()
        };
        const {container} = (<Captcha
            {...props}
        />);
        container.executeCaptcha();
        expect(global.grecaptcha.execute).toHaveBeenCalled();
    });

    test('Captcha renders the div google wants', () => {
        const props = {
            onCaptchaLoad: jest.fn()
        };
        const {container} = render(<Captcha
            {...props}
        />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
