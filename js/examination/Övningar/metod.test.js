import { TemperatureConverter, StringUtils } from "./examination_1.js";
import { expect, jest } from '@jest/globals'

//const mockLogger = jest.fn();
/*
describe('Logger', () => {
    beforeEach(() => {
        mockLogger.mockReset();
    });
    test('Returns Farenheit', () => {
        mockLogger.mockReturnValue(2);
        const converter = new TemperatureConverter(mockLogger);
        expect(converter.celsiusToFahrenheit()).toBe(0);
        expect(mockLogger).not.toHaveBeenCalled();
    });
})
*/
/*
describe('Stor bokstav', () => {
    test('Returns Stor bokstav', () => {
        // Arrange
        const utils = new StringUtils(null);
        const input = 'abc'
        // Act
        const result = utils.capitalizeFirst(input)
        // Assert
        expect(result).toBe('Abc')

    });
})
*/
describe('Tom bokstav', () => {
    test('Returns tom sträng för tom input', () => {
        // Arrange
        const mockLogger = { log: jest.fn()}
        const utils = new StringUtils(mockLogger);
        const input = ''
        // Act
        const result = utils.capitalizeFirst(input)
        // Assert
        expect(result).toBe('')
        expect(mockLogger.log).toHaveBeenCalled();
        console.log(mockLogger.log.mock.calls);

    });


})