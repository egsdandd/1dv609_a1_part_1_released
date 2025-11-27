import { User } from "./examination.js";
import { expect, jest } from '@jest/globals'

describe('User', () => {
    
    test('Should create user with valid lnu.se email', () => {
        const mockEmail = {
            getDomainName: jest.fn().mockReturnValue('lnu.se')
        };
        
        const user = new User('kalle', mockEmail);
        
        expect(user.userName).toBe('kalle');
        expect(user.email).toBe(mockEmail);
        expect(mockEmail.getDomainName).toHaveBeenCalled();
    });
    
    test('Should throw error for non-lnu.se email', () => {
        const mockEmail = {
            getDomainName: jest.fn().mockReturnValue('gmail.com')
        };
        
        expect(() => 
            new User('kalle', mockEmail)
        ).toThrow('Email must be from lnu.se domain');
        
        expect(mockEmail.getDomainName).toHaveBeenCalled();
    });
    
    test('Should throw error for mail.se domain', () => {
        const mockEmail = {
            getDomainName: jest.fn().mockReturnValue('mail.se')
        };
        
        expect(() => 
            new User('kalle', mockEmail)
        ).toThrow('Email must be from lnu.se domain');
        
        expect(mockEmail.getDomainName).toHaveBeenCalled();
    });
});
