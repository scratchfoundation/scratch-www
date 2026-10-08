const jar = require('../../../src/lib/jar');
const {
    DONATE_BANNER_AB_COOKIE,
    getDonateBannerVariant
} = require('../../../src/lib/donate-banner-ab');

jest.mock('../../../src/lib/jar', () => ({
    get: jest.fn()
}));

describe('donate-banner-ab', () => {
    beforeEach(() => {
        jar.get.mockReset();
    });

    test('returns A or B from the Fastly cookie', () => {
        jar.get.mockReturnValue('A');
        expect(getDonateBannerVariant()).toBe('A');
        expect(jar.get).toHaveBeenCalledWith(DONATE_BANNER_AB_COOKIE);

        jar.get.mockReturnValue('B');
        expect(getDonateBannerVariant()).toBe('B');
    });

    test('returns null when the cookie is missing or invalid', () => {
        expect(getDonateBannerVariant()).toBeNull();

        jar.get.mockReturnValue('C');
        expect(getDonateBannerVariant()).toBeNull();
    });
});
