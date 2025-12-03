import { User1 } from './examination.js';
import { describe, it, expect } from '@jest/globals';

describe('User1', () => {
    
    it('Should create user with valid lnu.se email', () => {
        const user = new User1('john', 'john.doe@lnu.se');
        
        expect(user.userName).toBe('john');
        expect(user.email).toBe('john.doe@lnu.se');
    });
    
    it('Should throw error for non-lnu.se email', () => {
        expect(() => 
            new User1('jane', 'jane.doe@gmail.com')
        ).toThrow('Email must be from lnu.se domain');
    });
    
    it('Should throw error for invalid email format', () => {
        expect(() => 
            new User1('bob', 'invalid-email')
        ).toThrow('Email must be from lnu.se domain');
    });
    
    it('Should throw error for empty email', () => {
        expect(() => 
            new User1('alice', '')
        ).toThrow('Email must be from lnu.se domain');
    });
});