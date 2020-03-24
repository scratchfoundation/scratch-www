const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');

class Captcha extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'setCaptchaRef',
            'onCaptchaLoad',
            'executeCaptcha'
        ]);

    }
    componentDidMount () {
        if (window.grecaptcha) {
            this.onCaptchaLoad();
        } else {
            // If grecaptcha doesn't exist on window, we havent loaded the captcha js yet. Load it.
            // ReCaptcha calls a callback when the grecatpcha object is usable. That callback
            // needs to be global so set it on the window.
            window.grecaptchaOnLoad = this.onCaptchaLoad;
            // Load Google ReCaptcha script.
            const script = document.createElement('script');
            script.async = true;
            script.onerror = this.props.onCaptchaError;
            script.src = `https://www.recaptcha.net/recaptcha/api.js?onload=grecaptchaOnLoad&render=explicit&hl=${window._locale}`;
            document.body.appendChild(script);
        }
    }
    componentWillUnmount () {
        window.grecaptchaOnLoad = null;
    }

    onCaptchaLoad () {
        // Let the owner of this component do some work
        // when captcha is done loading (e.g. enabling a button)
        this.props.onCaptchaLoad();
        this.grecaptcha = window.grecaptcha;
        if (!this.grecaptcha) {
            // According to the reCaptcha documentation, this callback shouldn't get
            // called unless window.grecaptcha exists. This is just here to be extra defensive.
            this.props.onCaptchaError();
            return;
        }
        this.widgetId = this.grecaptcha.render(this.captchaRef,
            {
                callback: this.props.onCaptchaSolved,
                sitekey: process.env.RECAPTCHA_SITE_KEY
            },
            true);
    }
    setCaptchaRef (ref) {
        this.captchaRef = ref;
    }
    executeCaptcha () {
        this.grecaptcha.execute(this.widgetId);
    }
    render () {
        return (
            <div
                className="g-recaptcha"
                data-badge="bottomright"
                data-sitekey={process.env.RECAPTCHA_SITE_KEY}
                data-size="invisible"
                ref={this.setCaptchaRef}
            />
        );
    }
}
Captcha.propTypes = {
    onCaptchaError: PropTypes.func,
    onCaptchaLoad: PropTypes.func,
    onCaptchaSolved: PropTypes.func
};
module.exports = Captcha;
