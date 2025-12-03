import { Die } from "./examination.js";
import { expect, jest } from '@jest/globals'

const mockRandom = jest.fn();

describe('Die', () => {
    beforeEach(() => {
        mockRandom.mockReset();
    });
    test('will always return 7, 1*6+1 due to the way the roll method is implemented', () => {

        mockRandom.mockReturnValue(1.0);
        const die = new Die(6, mockRandom);

        expect(die.roll()).toBe(7);
        expect(mockRandom).toHaveBeenCalled();
    });
    test('should use default sides (6) when not provided', () => {
        mockRandom.mockReturnValue(0.5);
        const die = new Die(undefined, mockRandom);  // Använder default sides = 6
        expect(die.roll()).toBe(4);  // 0.5 * 6 = 3, floor = 3, +1 = 4
    });

    test('should use default Math.random when randomFunc not provided', () => {
        const die = new Die(6);  // Använder default randomFunc = Math.random
        const result = die.roll();
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(6);
    });

    test('should use all defaults when no parameters provided', () => {
        const die = new Die();  // Båda defaults används
        const result = die.roll();
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(6);
    });
});
