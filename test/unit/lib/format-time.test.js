const format = require('../../../src/lib/format-time');

describe('unit test lib/format-time.js', () => {
    let realDateNow;
    let _mockFormat;
    const mockFormatExpression = {
        formatToParts: jest.fn()
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
        const formatToPartsResponse = [
            {type: 'literal', value: 'in'},
            {type: 'integer', value: '2', unit: 'minute'},
            {type: 'decimal', value: '.', unit: 'minute'},
            {type: 'fraction', value: '119', unit: 'minute'},
            {type: 'literal', value: 'minutes'}
        ];
        mockFormatExpression.formatToParts.mockReturnValue(formatToPartsResponse);

        response = format.formatTimeUntil(twoMin, 'en');

        expect(mockFormatExpression.formatToParts).toHaveBeenCalledWith(2, 'minute');

        expect(response).toEqual('2 minutes');
    });

    test('test timestamp that is 2 hours in the future', () => {
        let response;
        const twoHours = 2 * 60 * 60 * 1000;

        const formatToPartsResponse = [
            {type: 'literal', value: 'in'},
            {type: 'integer', value: '2', unit: 'hours'},
            {type: 'decimal', value: '.', unit: 'hours'},
            {type: 'fraction', value: '0', unit: 'hours'},
            {type: 'literal', value: 'hours'}
        ];
        mockFormatExpression.formatToParts.mockReturnValue(formatToPartsResponse);
        response = format.formatTimeUntil(twoHours, 'en');
        expect(mockFormatExpression.formatToParts).toHaveBeenCalledWith(2, 'hour');
        expect(response).toEqual('2 hours');
    });

    test('test timestamp that is exactly 2 days in the future', () => {
        let response;
        const twoDays = 2 * 60 * 60 * 24 * 1000;
        const formatToPartsResponse = [
            {type: 'literal', value: 'in'},
            {type: 'integer', value: '2', unit: 'days'},
            {type: 'decimal', value: '.', unit: 'days'},
            {type: 'fraction', value: '0', unit: 'days'},
            {type: 'literal', value: 'days'}
        ];
        mockFormatExpression.formatToParts.mockReturnValue(formatToPartsResponse);

        response = format.formatTimeUntil(twoDays, 'en');
        expect(mockFormatExpression.formatToParts).toHaveBeenCalledWith(2, 'day');
        expect(response).toEqual('2 days');
    });


    test('test timestamp that is 2.5 days in the future', () => {
        let response;
        const twoDays = 2.5 * 60 * 60 * 24 * 1000;
        const formatToPartsResponseTwoAndAHalfDays = [
            {type: 'literal', value: 'in'},
            {type: 'integer', value: '2', unit: 'days'},
            {type: 'decimal', value: '.', unit: 'days'},
            {type: 'fraction', value: '5', unit: 'days'},
            {type: 'literal', value: 'days'}
        ];
        const formatToPartsResponseTwelveHours = [
            {type: 'literal', value: 'in'},
            {type: 'integer', value: '12', unit: 'hours'},
            {type: 'decimal', value: '.', unit: 'hours'},
            {type: 'fraction', value: '0', unit: 'hours'},
            {type: 'literal', value: 'hours'}
        ];
        mockFormatExpression.formatToParts
            .mockReturnValueOnce(formatToPartsResponseTwoAndAHalfDays)
            .mockReturnValueOnce(formatToPartsResponseTwelveHours);

        response = format.formatTimeUntil(twoDays, 'en');
        expect(mockFormatExpression.formatToParts).toHaveBeenCalledWith(2.5, 'day');
        expect(mockFormatExpression.formatToParts).toHaveBeenCalledWith(12, 'hour');
        expect(response).toEqual('2 days 12 hours');
    });

    test('test timestamp that is 3.5 hours in the future', () => {
        let response;
        const twoDays = 3.5 * 60 * 60 * 1000;
        const formatToPartsResponseOne = [
            {type: 'literal', value: 'in'},
            {type: 'integer', value: '3', unit: 'hours'},
            {type: 'decimal', value: '.', unit: 'hours'},
            {type: 'fraction', value: '5', unit: 'hours'},
            {type: 'literal', value: 'hours'}
        ];
        const formatToPartsResponseTwo = [
            {type: 'literal', value: 'in'},
            {type: 'integer', value: '30', unit: 'minutes'},
            {type: 'decimal', value: '.', unit: 'minutes'},
            {type: 'fraction', value: '0', unit: 'minutes'},
            {type: 'literal', value: 'minutes'}
        ];
        mockFormatExpression.formatToParts
            .mockReturnValueOnce(formatToPartsResponseOne)
            .mockReturnValueOnce(formatToPartsResponseTwo);

        response = format.formatTimeUntil(twoDays, 'en');
        expect(mockFormatExpression.formatToParts).toHaveBeenCalledWith(3.5, 'hour');
        expect(mockFormatExpression.formatToParts).toHaveBeenCalledWith(30, 'minute');
        expect(response).toEqual('3 hours 30 minutes');
    });

    test('test timestamp that is 1 day and less than an hour in the future', () => {
        let response;
        const aDayand10Min = 1.007 * 60 * 60 * 24 * 1000;
        const formatToPartsResponse = [
            {type: 'literal', value: 'in'},
            {type: 'integer', value: '1', unit: 'days'},
            {type: 'decimal', value: '.', unit: 'days'},
            {type: 'fraction', value: '0.007', unit: 'days'},
            {type: 'literal', value: 'days'}
        ];

        mockFormatExpression.formatToParts
            .mockReturnValueOnce(formatToPartsResponse);

        response = format.formatTimeUntil(aDayand10Min, 'en');
        expect(mockFormatExpression.formatToParts).toHaveBeenCalledWith(1.007, 'day');
        expect(response).toEqual('1 days');
    });

    test('test timestamp that is hour and less than a minute in the future', () => {
        let response;
        const anHourAnd30Sec = 1.008 * 60 * 60 * 1000;
        const formatToPartsResponse = [
            {type: 'literal', value: 'in'},
            {type: 'integer', value: '1', unit: 'hours'},
            {type: 'decimal', value: '.', unit: 'hours'},
            {type: 'fraction', value: '0.008', unit: 'hours'},
            {type: 'literal', value: 'hours'}
        ];

        mockFormatExpression.formatToParts
            .mockReturnValueOnce(formatToPartsResponse);

        response = format.formatTimeUntil(anHourAnd30Sec, 'en');
        expect(mockFormatExpression.formatToParts).toHaveBeenCalledWith(1.008, 'hour');
        expect(response).toEqual('1 hours');
    });
});
