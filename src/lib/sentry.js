const initSentry = () => {
    // initialize Sentry instance, making sure it hasn't been initialized already
    if (!window.Sentry && `${process.env.SENTRY_DSN}` !== '') {
        const Sentry = require('@sentry/browser');

        Sentry.init({
            dsn: `${process.env.SENTRY_DSN}`,
            environment: 'www',
            // Do not collect global onerror, only collect specifically from React error boundaries.
            // TryCatch plugin also includes errors from setTimeouts (i.e. the VM)
            integrations: integrations => integrations.filter(i =>
                !(i.name === 'GlobalHandlers' || i.name === 'TryCatch'))
        });

        window.Sentry = Sentry; // Allow GUI access to Sentry via window
    }
};

module.exports = initSentry;
