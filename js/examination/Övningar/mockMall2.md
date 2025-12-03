# Steg-för-steg: Mock för testa constructor

Typexempel för test av konstruktor:

Grundregel:

Testar VÄRDE? → expect(värde).toBe(...)
Testar KRASCH? → expect( () => kodSomKraschar ).toThrow(...) - testar funktion!! Obs () =>

Tänkstrategi:

1. Läs signaturen → Vad ska metoderna göra?
2. Identifiera ansvar → Två separata kontrakt
3. Skriv tester för varje ansvar (en sak per test)
4. Kontrollera edge cases

Kör Red → Green → Refactor

Här är en implementering:

--------------------------------------
class User {
    constructor(userName, email) {
        if (email.getDomainName() !== 'lnu.se') {  // OBS - getDomainName() måste mockas
            throw new Error('Email must be from lnu.se domain');
        }
        this.userName = userName;
        this.email = email;
    }
}
export { User };
------------------------------------

import { User } from "./examination.js";
import { expect, jest } from '@jest/globals'

describe('Test av userclass 1 rätt och 1 fel', () => {
  it('should return user in lnu.se', () => {
    // Arrange
    const mockEmail = { getDomainName: jest.fn(() => 'lnu.se') } //Skapa mock som en funktion
    // Act
    const user = new User('kalle', mockEmail)
    // Assert
    expect(user.userName).toBe('kalle')
    expect(user.email).toBe(mockEmail)
  })
  it('should throw error for not in lnu.se', () => {
    // Act
    const mockEmail = { getDomainName: jest.fn(() => 'gmail.com') }
    // Arrange + Assert
    expect(() => new User('kalle', mockEmail)).toThrow('Email must be from lnu.se domain')
  })
})




