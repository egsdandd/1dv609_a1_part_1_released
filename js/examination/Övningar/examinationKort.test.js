import { Die } from './examination';
import { expect, jest } from '@jest/globals';

const mockRandom = jest.fn();
describe('Die', () => {
    beforeEach(() => {
        mockRandom.mockReset();
    });
    test('will always return 1 due to the way the roll method is implemented', () => {
        const die = new Die(6, mockRandom);
        mockRandom.mockReturnValue(0);
        expect(die.roll()).toBe(1);
    });
});