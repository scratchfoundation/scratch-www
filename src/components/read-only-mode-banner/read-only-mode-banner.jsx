import PropTypes from 'prop-types';

const React = require('react');
const {useRef, useEffect} = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;

const externalLinks = require('../../lib/external-links.js');

require('./read-only-mode-banner.scss');

const READ_ONLY_MODE = typeof process !== 'undefined' && process.env.READ_ONLY_MODE === 'true';

const bold = chunks => <strong>{chunks}</strong>;

const ReadOnlyModeBanner = ({zIndex}) => {
    const bannerRef = useRef(null);

    useEffect(() => {
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

    const faqLink = chunks => (
        <a
            className="read-only-mode-banner-link"
            href={externalLinks.scratchFoundation.homepage}
            rel="noreferrer noopener"
            target="_blank"
        >{chunks}</a>
    );

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
                        values={{faqLink}}
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
