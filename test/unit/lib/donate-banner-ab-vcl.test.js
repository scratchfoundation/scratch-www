const {
    donateBannerAbSnippets,
    donateBannerAbSnippetsFromEnv,
    parseEnabled,
    parseForce,
    parsePercentB
} = require('../../../bin/lib/donate-banner-ab-vcl');
const {DONATE_BANNER_AB_COOKIE} = require('../../../src/lib/donate-banner-ab');

describe('donate-banner-ab-vcl', () => {
    const byName = (snippets, name) => snippets.find(s => s.name === name);

    test('parseEnabled and parsePercentB accept env-style values and reject junk', () => {
        expect(parseEnabled()).toBe(true);
        expect(parseEnabled('0')).toBe(false);
        expect(parseEnabled('1')).toBe(true);
        expect(() => parseEnabled('maybe')).toThrow(/DONATE_BANNER_AB_ENABLED/);

        expect(parsePercentB()).toBe(50);
        expect(parsePercentB('10')).toBe(10);
        expect(() => parsePercentB('101')).toThrow(/DONATE_BANNER_AB_PERCENT_B/);
        expect(() => parsePercentB('50.5')).toThrow(/DONATE_BANNER_AB_PERCENT_B/);

        expect(parseForce()).toBe('');
        expect(parseForce('b')).toBe('B');
        expect(parseForce('A')).toBe('A');
        expect(() => parseForce('C')).toThrow(/DONATE_BANNER_AB_FORCE/);
    });

    test('recv runs after the homepage rewrite regardless of session cookie', () => {
        const snippets = donateBannerAbSnippets({enabled: true, percentB: 50});
        const recv = byName(snippets, 'donate-banner-ab-recv');
        expect(recv.type).toBe('recv');
        expect(recv.priority).toBe('110');
        expect(recv.content).toContain('if (req.url.path == "/splash.html") {');
        expect(recv.content).not.toContain('set req.backend');
        snippets.forEach(snippet => {
            expect(snippet.content).not.toContain('scratchsessionsid');
            expect(snippet.content).not.toContain('req.url.path == "/"');
        });
    });

    test('enabled experiment honors a sticky cookie and uses randombool for new visitors', () => {
        const recv = byName(donateBannerAbSnippets({enabled: true, percentB: 25}), 'donate-banner-ab-recv');
        expect(recv.content).toContain(`req.http.Cookie:${DONATE_BANNER_AB_COOKIE} ~ "^[AB]$"`);
        expect(recv.content).toContain('randombool(25, 100)');
        expect(recv.content).toContain('set req.http.X-Donate-Banner-Variant = "B";');
        expect(recv.content).toContain('set req.http.X-Donate-Banner-Variant = "A";');
    });

    test('disabled experiment forces A and does not roll a new group', () => {
        const recv = byName(donateBannerAbSnippets({enabled: false, percentB: 50}), 'donate-banner-ab-recv');
        expect(recv.content).toContain('set req.http.X-Donate-Banner-Variant = "A";');
        expect(recv.content).not.toContain('randombool');
        expect(recv.content).not.toContain(`req.http.Cookie:${DONATE_BANNER_AB_COOKIE}`);
    });

    test('force overwrites an existing cookie to the chosen variant', () => {
        const forceB = byName(donateBannerAbSnippets({force: 'B', percentB: 0}), 'donate-banner-ab-recv');
        expect(forceB.content).toContain('set req.http.X-Donate-Banner-Variant = "B";');
        expect(forceB.content).not.toContain('randombool');
        expect(forceB.content).not.toContain(`req.http.Cookie:${DONATE_BANNER_AB_COOKIE}`);

        const forceA = byName(donateBannerAbSnippets({
            enabled: false,
            force: 'A',
            percentB: 100
        }), 'donate-banner-ab-recv');
        expect(forceA.content).toContain('set req.http.X-Donate-Banner-Variant = "A";');
        expect(forceA.content).not.toContain('randombool');
    });

    test('force B wins over enabled=0', () => {
        const recv = byName(donateBannerAbSnippets({
            enabled: false,
            force: 'B'
        }), 'donate-banner-ab-recv');
        expect(recv.content).toContain('set req.http.X-Donate-Banner-Variant = "B";');
        expect(recv.content).not.toContain('set req.http.X-Donate-Banner-Variant = "A";');
    });

    test('deliver sets a host-only cookie without fragmenting the HTML cache', () => {
        const deliver = byName(donateBannerAbSnippets(), 'donate-banner-ab-deliver');
        expect(deliver.type).toBe('deliver');
        expect(deliver.content).toContain(`add resp.http.Set-Cookie = "${DONATE_BANNER_AB_COOKIE}="`);
        expect(deliver.content).toContain('SameSite=Lax; Secure');
        expect(deliver.content).not.toContain('HttpOnly');
        expect(deliver.content).not.toContain('set resp.http.Vary');
    });

    test('donateBannerAbSnippetsFromEnv reads the Fastly deploy env vars', () => {
        const recv = byName(donateBannerAbSnippetsFromEnv({
            DONATE_BANNER_AB_ENABLED: '1',
            DONATE_BANNER_AB_PERCENT_B: '10'
        }), 'donate-banner-ab-recv');
        expect(recv.content).toContain('randombool(10, 100)');

        const forced = byName(donateBannerAbSnippetsFromEnv({
            DONATE_BANNER_AB_FORCE: 'B',
            DONATE_BANNER_AB_PERCENT_B: '0'
        }), 'donate-banner-ab-recv');
        expect(forced.content).toContain('set req.http.X-Donate-Banner-Variant = "B";');
        expect(forced.content).not.toContain('randombool');
    });
});
