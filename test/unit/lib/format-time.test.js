const format = require('../../../src/lib/format-time');

describe('unit test lib/format-time.js', () => {
    let realDateNow;
    let _mockFormat;
    const mockFormatExpression = {
        format: jest.fn()
    };
    beforeEach(() =>{
        realDateNow = Date.now.bind(global.Date);
        global.Date.now = () => 0;
        _mockFormat = Intl.RelativeTimeFormat = jest
            .fn()
            .mockImplementation(() => mockFormatExpression);

    });
    afterEach(()=>{
        global.Date.now = realDateNow;
        jest.resetAllMocks();
    });

    test('test timestamp that is 2 minutes in the future', () => {
        const twoMin = 2 * 60 * 1000;
        mockFormatExpression.format.mockReturnValue('in 2 minutes');
        format.formatRelativeTime(twoMin, 'en');
        expect(mockFormatExpression.format).toHaveBeenCalledWith(2, 'minute');
    });

    test('test timestamp that is 15 seconds in the future displays 1', () => {
        const fifteenSec = 15 * 1000;
        mockFormatExpression.format.mockReturnValue('in 1 minute');
        format.formatRelativeTime(fifteenSec, 'en');
        expect(mockFormatExpression.format).toHaveBeenCalledWith(1, 'minute');
    });

    test('test rounding timestamp that is 4.4 minutes rounds to 4', () => {
        const fourPlusMin = 4.4 * 60 * 1000;
        mockFormatExpression.format.mockReturnValue('in 4 minutes');
        format.formatRelativeTime(fourPlusMin, 'en');
        expect(mockFormatExpression.format).toHaveBeenCalledWith(4, 'minute');
    });

    test('test timestamp that is 95.25 minutes in the future', () => {
        const ninetyFiveMin = 95.25 * 60 * 1000;
        mockFormatExpression.format.mockReturnValue('in 95 minutes');
        format.formatRelativeTime(ninetyFiveMin, 'en');
        expect(mockFormatExpression.format).toHaveBeenCalledWith(95, 'minute');
    });

    test('test timestamp that is 119 minutes in the future', () => {
        const ninetyFiveMin = 119 * 60 * 1000;
        mockFormatExpression.format.mockReturnValue('in 199 minutes');
        format.formatRelativeTime(ninetyFiveMin, 'en');
        expect(mockFormatExpression.format).toHaveBeenCalledWith(119, 'minute');
    });

    test('test timestamp that is 48 hours in the future', () => {
        const fortyEightHrs = 48 * 60 * 60 * 1000;
        mockFormatExpression.format.mockReturnValue('in 48 hours');
        format.formatRelativeTime(fortyEightHrs, 'en');
        expect(mockFormatExpression.format).toHaveBeenCalledWith(48, 'hour');
    });

    test('test timestamp that is 2.6 hours rounds to 3', () => {
        const twoPlusHours = 2.6 * 60 * 60 * 1000;
        mockFormatExpression.format.mockReturnValue('in 3 hours');
        format.formatRelativeTime(twoPlusHours, 'en');
        expect(mockFormatExpression.format).toHaveBeenCalledWith(3, 'hour');
    });

    test('test timestamp that is 4.2 hours in the future rounds to 4', () => {
        const fourPlusHours = 4.2 * 60 * 60 * 1000;
        mockFormatExpression.format.mockReturnValue('in 4 hours');
        format.formatRelativeTime(fourPlusHours, 'en');
        expect(mockFormatExpression.format).toHaveBeenCalledWith(4, 'hour');
    });

    test('test timestamp that is 2 hours in the future is in hours', () => {
        const twoHours = 2 * 60 * 60 * 1000;
        mockFormatExpression.format.mockReturnValue('in 2 hours');
        format.formatRelativeTime(twoHours, 'en');
        expect(mockFormatExpression.format).toHaveBeenCalledWith(2, 'hour');
    });
});
