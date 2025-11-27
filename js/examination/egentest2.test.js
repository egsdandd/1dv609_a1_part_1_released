import { User } from './examination'
import { expect, jest } from '@jest/globals'

it('should throw excemption idomain not is lnu.se', () => {
    const mocken = {
        getDomainName: jest.fn().mockReturnValue('gmail.com')
    }
    expect(() =>
        new User('kalle', mocken)
    ).toThrow('Email must be from lnu.se domain')

    expect(mocken.getDomainName).toHaveBeenCalled()

})
