const {triggerAnalyticsEvent} = require('../../../lib/google-analytics-utils.js');

const GIVEBUTTER_HOST = 'givebutter.com';

const FUNNEL_EVENTS = {
    'donation.started': 'purchase_initiated',
    'donation.paying': 'checkout_started',
    'donation.complete': 'checkout_completed'
};

const isGivebutterOrigin = origin => {
    if (!origin) {
        return false;
    }
    let hostname;
    try {
        hostname = new URL(origin).hostname;
    } catch (e) {
        return false;
    }
    return hostname === GIVEBUTTER_HOST || hostname.endsWith(`.${GIVEBUTTER_HOST}`);
};

const campaignLabel = campaign => {
    const title = campaign?.title?.trim() || 'givebutter';
    const id = campaign?.id || campaign?.code;
    return id ? `${title} (${id})` : title;
};

const handleGivebutterMessage = (event, extra = {}) => {
    if (!isGivebutterOrigin(event.origin)) {
        return;
    }
    const data = event.data;
    if (!data || typeof data !== 'object' || data.givebutter !== true) {
        return;
    }
    const analyticsEvent = FUNNEL_EVENTS[data.event];
    if (!analyticsEvent) {
        return;
    }
    const payload = {
        ...extra,
        event: analyticsEvent,
        event_category: 'givebutter',
        event_label: campaignLabel(data.campaign)
    };
    const value = Number(data.total);
    if (Number.isFinite(value)) {
        payload.value = value;
    }
    if (data.currency) {
        payload.currency = data.currency;
    }
    if (data.transactionId) {
        payload.transaction_id = data.transactionId;
    }
    triggerAnalyticsEvent(payload);
};

module.exports = {
    handleGivebutterMessage
};
