const {useEffect, useState} = require('react');

const GIVEBUTTER_SCRIPT_ID = 'givebutter-widgets';
const GIVEBUTTER_SCRIPT_SRC = 'https://widgets.givebutter.com/latest.umd.cjs?acct=6VvCiMGqhgZgliyY&p=other';

const useGiveButterScript = enabled => {
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        if (!enabled) {
            return;
        }
        let script = document.getElementById(GIVEBUTTER_SCRIPT_ID);
        if (!script) {
            script = document.createElement('script');
            script.id = GIVEBUTTER_SCRIPT_ID;
            script.async = true;
            script.src = GIVEBUTTER_SCRIPT_SRC;
            document.head.appendChild(script);
        }
        const handleLoad = () => {
            setFailed(false);
        };
        const handleError = () => {
            script.remove();
            setFailed(true);
        };
        script.addEventListener('load', handleLoad);
        script.addEventListener('error', handleError);
        return () => {
            script.removeEventListener('load', handleLoad);
            script.removeEventListener('error', handleError);
        };
    }, [enabled]);

    return failed;
};

module.exports = useGiveButterScript;
