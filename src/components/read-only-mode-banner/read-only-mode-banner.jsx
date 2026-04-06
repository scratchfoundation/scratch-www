import PropTypes from 'prop-types';

const React = require('react');
const {useRef, useLayoutEffect} = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;

require('./read-only-mode-banner.scss');

const READ_ONLY_MODE = typeof process !== 'undefined' && process.env.READ_ONLY_MODE === 'true';

const bold = chunks => <strong>{chunks}</strong>;

const ReadOnlyModeBanner = ({zIndex}) => {
    const bannerRef = useRef(null);

    useLayoutEffect(() => {
        if (!bannerRef.current) return;
        const updateHeight = () => {
            const height = bannerRef.current ? bannerRef.current.offsetHeight : 0;
            document.documentElement.style.setProperty('--read-only-banner-height', `${height}px`);
        };
        updateHeight();
        const observer = new ResizeObserver(updateHeight);
        observer.observe(bannerRef.current);
        return () => observer.disconnect();
    }, []);

    if (!READ_ONLY_MODE) return null;

    return (
        <aside
            className="read-only-mode-banner"
            ref={bannerRef}
            style={{zIndex}}
        >
            <div className="read-only-mode-banner-content">
                <p className="read-only-mode-banner-text">
                    <FormattedMessage
                        id="readOnlyMode.bannerText1"
                        values={{b: bold}}
                    />
                </p>
                <p className="read-only-mode-banner-text">
                    <FormattedMessage id="readOnlyMode.bannerText2" />
                </p>
                <p className="read-only-mode-banner-text">
                    <FormattedMessage
                        id="readOnlyMode.bannerText3"
                    />
                </p>
            </div>
        </aside>
    );
};

ReadOnlyModeBanner.propTypes = {
    zIndex: PropTypes.number
};

export default ReadOnlyModeBanner;
