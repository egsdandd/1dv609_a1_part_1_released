import { User } from './examination'
import { expect, jest } from '@jest/globals'

describe('User', () => {
    it('should create user from lnu.se', () => {
        const mockDomain = {
            getDomainName: jest.fn().mockReturnValue('lnu.se')
        }

        const user = new User('kalle', mockDomain)

        expect(user.userName).toBe('kalle')
        expect(user.email).toBe(mockDomain)
        expect(mockDomain.getDomainName).toHaveBeenCalled()
    })

    it('should throw error for non-lnu.se domain', () => {
        const mockDomain = {
            getDomainName: jest.fn().mockReturnValue('gmail.com')
        }
        expect(() =>
            new User('kalle', mockDomain)
        ).toThrow('Email must be from lnu.se domain')
        expect(mockDomain.getDomainName).toHaveBeenCalled()
    })
})

/*
import { User } from './examination'
import { expect, jest } from '@jest/globals'

describe('XXX', () => {
    it('should ....', () => {
        const mocken = {
            metoden: jest.fn().mockReturnValue('lnu.se')
    }

    const variabel = new Class(arg1,arg2...)
    
    expect(variabel.argument1).toBe('yyy')
    expect(variabel.argument2).tobe(mock)
    expect(mocken.metod).toHaveBeenCalled()
    }

    it('should ....', () => {
        const mocken = {
            metoden: jest.fn().mockReturnValue('gmail.se')
    }
        expect(() =>
            new User('kalle', mocken)
        ).toThrow('Email must be from lnu.se domain')

        expect(mocken.metod).toHaveBeenCalled()


*/