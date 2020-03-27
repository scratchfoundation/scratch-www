const React = require('react');
const enzyme = require('enzyme');


const Captcha = require('../../../src/components/captcha/captcha.jsx');

describe('Captcha test', () => {
    global.grecaptcha = {
        execute: jest.fn(),
        render: jest.fn()
    };

    test('Captcha load calls props captchaOnLoad', () => {
        const props = {
            onCaptchaLoad: jest.fn()
        };
        const wrapper = enzyme.shallow(<Captcha
            {...props}
        />);
        wrapper.instance().onCaptchaLoad();
        expect(global.grecaptcha.render).toHaveBeenCalled();
        expect(props.onCaptchaLoad).toHaveBeenCalled();
    });

    test('Captcha execute calls grecatpcha execute', () => {
        const props = {
            onCaptchaLoad: jest.fn()
        };
        const wrapper = enzyme.shallow(<Captcha
            {...props}
        />);
        wrapper.instance().executeCaptcha();
        expect(global.grecaptcha.execute).toHaveBeenCalled();
    });

    test('Captcha load calls props captchaOnLoad', () => {
        const props = {
            onCaptchaLoad: jest.fn()
        };
        const wrapper = enzyme.shallow(<Captcha
            {...props}
        />);
        wrapper.instance().onCaptchaLoad();
        expect(global.grecaptcha.render).toHaveBeenCalled();
        expect(props.onCaptchaLoad).toHaveBeenCalled();
    });

    test('Captcha renders the div google wants', () => {
        const props = {
            onCaptchaLoad: jest.fn()
        };
        const wrapper = enzyme.mount(<Captcha
            {...props}
        />);
        expect(wrapper.find('div.g-recaptcha')).toHaveLength(1);
    });
});
