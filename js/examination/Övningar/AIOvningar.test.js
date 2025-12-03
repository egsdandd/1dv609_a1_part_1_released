import { Die, User, User1, Temperature, Invoice, StringUtils } from "./examination.js";
import { afterEach, describe, expect, jest } from '@jest/globals'

describe('Test av userclass (User)', () => {
  it('should return user in lnu.se', () => {
    // Arrange
    const mockEmail = { getDomainName: jest.fn(() => 'lnu.se') }
    // Act 
    const user = new User('kalle', mockEmail)
    // Assert
    expect(user.userName).toBe('kalle')
    expect(user.email).toBe(mockEmail)
  })

  it('should throw error for not in lnu.se', () => {
    // Act
    const mockEmail = { getDomainName: jest.fn(() => 'gmail.com') }
    // Arrange
    // Assert
    expect(() => new User('kalle', mockEmail)).toThrow('Email must be from lnu.se domain')
  })
})

describe('User - private #getDomainName (User1)', () => {
  it('creates valid', () => {
    const user = new User1('kalle', 'kalle@lnu.se')
    expect(user.userName).toBe('kalle')
    expect(user.email).toBe('kalle@lnu.se')
  })
  it('throws error when not lnu.se', () => {
    act = () => new User1('kalle', 'kalle@gmail.com')
    expect(act).toThrow('Email must be from lnu.se domain')
})

describe('Tom bokstav', () => {
  test('Returns tom sträng för tom input', () => {
    // Arrange
    const mockLogger = { log: jest.fn() }
    const utils = new StringUtils(mockLogger);
    const input = ''
    // Act
    const result = utils.capitalizeFirst(input)
    // Assert
    expect(result).toBe('')
    expect(mockLogger.log).toHaveBeenCalled();
  });
})


describe('Temperature - Farenheit, Celsius', () => {
  it('creates valid', () => {
    const temp = new Temperature(10, 'C')
    expect(temp.value).toBe(10)
    expect(temp.unit).toBe('C')
  })
  it('throws error when not F/C', () => {
    expect(() => new Temperature(10, 'K')).toThrow('Unit must be C or F')
  })
  it('Kolla konvertering till Celsius', () => {
    const temp = new Temperature(32, 'F')
    expect(temp.toCelsius()).toBe(0)
  })
  it('Kolla konvertering till Farenheit', () => {
    const temp = new Temperature(0, 'C')
    expect(temp.toFahrenheit()).toBe(32)
  })
  it('Kolla konvertering till Celsius', () => {
    const temp = new Temperature(-40, 'F')
    expect(temp.toCelsius()).toBe(-40)
  })
  it('Kolla konvertering till Farenheit', () => {
    const temp = new Temperature(-40, 'C')
    expect(temp.toFahrenheit()).toBe(-40)
  })
})

describe('Invoice', () => {
  test('Mocktester - Construktor', () => {
    // Arrange
    const mockCustomer = { isActive: jest.fn().mockReturnValue(false) }
    const mockCalculator = { calculate: jest.fn() }
    const items = [{ price: 10, quantity: 1 }]

    // Act

    // Assert
    expect(() => new Invoice(mockCustomer, items, mockCalculator)).toThrow('Inactive customer')
  });

  test('Mocktester - Calculator called', () => {
    // Arrange
    const mockCustomer = { isActive: jest.fn().mockReturnValue(true) }
    const mockCalculator = { calculate: jest.fn() }
    const items = [{ price: 10, quantity: 1 }]

    // Act
    const invoice = new Invoice(mockCustomer, items, mockCalculator)

    // Assert
    expect(mockCalculator.calculate).toHaveBeenCalledWith(items)
  });
})

describe('Die Class', () => {
  afterEach(() => { jest.clearAllMocks() })
  test('Mocktester - Die', () => {
    // Arrange
    const mockRandom = jest.fn().mockReturnValueOnce(0)
    const die = new Die(6, mockRandom)
    // Act
    const result = die.roll()
    // Assert
    expect(result).toBe(1)
    expect(mockRandom).toHaveBeenCalledTimes(1)
    // expect(die.roll()).toBe(1)
    expect(mockRandom).toHaveBeenCalled
  });
})

describe('Test av userclass 1 rätt och 1 fel', () => {
  it('should throw error for not in lnu.se', () => {
    // Arrange
    const mockMail = { getDomainName: jest.fn().mockReturnValue('gmail.com') }

    // Act
    const act = () => new User('testUser', mockMail)

    // Assert
    expect(act).toThrow('Email must be from lnu.se domain')
    expect(mockMail.getDomainName).toHaveBeenCalledTimes(1);
  })
  it('should return user in lnu.se', () => {
    // Arrange
    const mockMail = { getDomainName: jest.fn().mockReturnValue('lnu.se') }
    // Act
    const user = new User('testUser', mockMail)
    //  Assert
    expect(user.userName).toBe('testUser')
    expect(user.email).toBe(mockMail)
    expect(mockMail.getDomainName).toHaveBeenCalledTimes(1);
  })
})