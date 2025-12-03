import { User } from "./examination.js";
import { expect, jest } from '@jest/globals'

describe('User', () => {
    
    test('Should create user with valid lnu.se email', () => {
        // Arrange
        const mockEmail = {
            getDomainName: jest.fn().mockReturnValue('lnu.se')
        };
        // Act
        const user = new User('kalle', mockEmail);
        // Assert
        expect(user.userName).toBe('kalle');
        expect(user.email).toBe(mockEmail);
        expect(mockEmail.getDomainName).toHaveBeenCalled();
    });
    
    test('Should throw error for non-lnu.se email', () => {
        // Arrange
        const mockEmail = {
            getDomainName: jest.fn().mockReturnValue('gmail.com')
        };
        // Act + Assert
        expect(() => 
            new User('kalle', mockEmail)
        ).toThrow('Email must be from lnu.se domain');
        expect(mockEmail.getDomainName).toHaveBeenCalled();
    });
});
