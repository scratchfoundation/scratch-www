const {selectUnit} = require('../../../src/lib/select-unit');

describe('unit test lib/select-unit.js', () => {
    test('selects seconds', () => {
        const result = selectUnit(
            new Date('2023-02-03T12:00:00.000Z'),
            new Date('2023-02-03T12:00:05.000Z')
        );

        expect(result.unit).toEqual('second');
        expect(result.value).toEqual(-5);
    });

    test('selects minutes', () => {
        const result = selectUnit(
            new Date('2023-02-03T12:01:10.000Z'),
            new Date('2023-02-03T12:00:00.000Z')
        );

        expect(result.unit).toEqual('minute');
        expect(result.value).toEqual(1);
    });

    test('selects hours', () => {
        const result = selectUnit(
            new Date('2023-02-03T12:10:00.000Z'),
            new Date('2023-02-03T14:00:00.000Z')
        );

        expect(result.unit).toEqual('hour');
        expect(result.value).toEqual(-1);
    });

    test('selects days', () => {
        const result = selectUnit(
            new Date('2023-02-03T12:00:00.000Z'),
            new Date('2023-03-02T12:00:00.000Z')
        );

        expect(result.unit).toEqual('day');
        expect(result.value).toEqual(-27);
    });

    test('selects months', () => {
        const result = selectUnit(
            new Date('2023-02-03T12:00:00.000Z'),
            new Date('2024-02-02T12:00:00.000Z')
        );

        expect(result.unit).toEqual('month');
        expect(result.value).toEqual(-11);
    });

    test('selects years', () => {
        const result = selectUnit(
            new Date('2023-02-03T12:00:00.000Z'),
            new Date('2025-02-04T12:00:00.000Z')
        );

        expect(result.unit).toEqual('year');
        expect(result.value).toEqual(-2);
    });
});
