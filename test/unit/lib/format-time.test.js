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
        let response;
        const twoMin = 2 * 60 * 1000;
        mockFormatExpression.format.mockReturnValue('in 2 minutes');
        response = format.formatRelativeTime(twoMin, 'en');
        expect(mockFormatExpression.format).toHaveBeenCalledWith(2, 'minute');
        expect(response).toEqual('in 2 minutes');
    });

    test('test rounding timestamp that is 4.4 minutes rounds to 4', () => {
        let response;
        const twoMin = 4.4 * 60 * 1000;
        mockFormatExpression.format.mockReturnValue('in 4 minutes');
        response = format.formatRelativeTime(twoMin, 'en');
        expect(mockFormatExpression.format).toHaveBeenCalledWith(4, 'minute');
        expect(response).toEqual('in 4 minutes');
    });

    test('test timestamp that is 95.25 minutes in the future', () => {
        let response;
        const ninetyFiveMin = 95.25 * 60 * 1000;
        mockFormatExpression.format.mockReturnValue('in 95 minutes');
        response = format.formatRelativeTime(ninetyFiveMin, 'en');
        expect(mockFormatExpression.format).toHaveBeenCalledWith(95, 'minute');
        expect(response).toEqual('in 95 minutes');
    });

    test('test timestamp that is 48 hours in the future', () => {
        let response;
        const fortyEightHrs = 48 * 60 * 60 * 1000;

        mockFormatExpression.format.mockReturnValue('in 48 hours');
        response = format.formatRelativeTime(fortyEightHrs, 'en');
        expect(mockFormatExpression.format).toHaveBeenCalledWith(48, 'hour');
        expect(response).toEqual('in 48 hours');
    });

    test('test timestamp that is 2.6 hours rounds to 3', () => {
        let response;
        const twoPlusHours = 2.6 * 60 * 60 * 1000;

        mockFormatExpression.format.mockReturnValue('in 3 hours');
        response = format.formatRelativeTime(twoPlusHours, 'en');
        expect(mockFormatExpression.format).toHaveBeenCalledWith(3, 'hour');
        expect(response).toEqual('in 3 hours');
    });

    test('test timestamp that is 4.2 hours in the future rounds to 4', () => {
        let response;
        const fourPlusHours = 4.2 * 60 * 60 * 1000;
        mockFormatExpression.format.mockReturnValue('in 4 hours');
        response = format.formatRelativeTime(fourPlusHours, 'en');
        expect(mockFormatExpression.format).toHaveBeenCalledWith(4, 'hour');
        expect(response).toEqual('in 4 hours');
    });

    test('test timestamp that is 2 hours in the future is in hours', () => {
        let response;
        const threeHours = 2 * 60 * 60 * 1000;

        mockFormatExpression.format.mockReturnValue('in 2 hours');
        response = format.formatRelativeTime(threeHours, 'en');
        expect(mockFormatExpression.format).toHaveBeenCalledWith(2, 'hour');
        expect(response).toEqual('in 2 hours');
    });
});
