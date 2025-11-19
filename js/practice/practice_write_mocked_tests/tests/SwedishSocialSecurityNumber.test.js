import { SwedishSocialSecurityNumber } from '../src/correct/SwedishSocialSecurityNumber'

// Mock Helper med grundläggande logik
const validSSN = '231013-2390' // Från Skatteverkets testdata, korrekt format och Luhn
const mockHelper = {
  isNotCorrectLength: ssn => ssn.length !== 11,
  isCorrectFormat: ssn => /^\d{6}-\d{4}$/.test(ssn),
  isValidMonth: month => parseInt(month, 10) >= 1 && parseInt(month, 10) <= 12,
  isValidDay: day => parseInt(day, 10) >= 1 && parseInt(day, 10) <= 31,
  luhnisCorrect: ssn => ssn === validSSN, // En enkel stub för demonstration
}

describe('SwedishSocialSecurityNumber', () => {

  test('accepts valid SSN', () => {
    expect(() =>
      new SwedishSocialSecurityNumber(validSSN, mockHelper)
    ).not.toThrow()
  })

  test('throws error for incorrect length', () => {
    const badLength = '231013-23901' // 12 tecken
    expect(() =>
      new SwedishSocialSecurityNumber(badLength, mockHelper)
    ).toThrow('To short, must be 11 characters')
  })

  test('throws error for incorrect format', () => {
    const badFormat = '23101312390'
    expect(() =>
      new SwedishSocialSecurityNumber(badFormat, mockHelper)
    ).toThrow('Incorrect format, must be: YYMMDD-XXXX')
  })

  test('throws error for invalid month', () => {
    // Manipulera så att getMonth() returnerar "00"
    const ssn = '230013-2390' // Month "00"
    expect(() =>
      new SwedishSocialSecurityNumber(ssn, mockHelper)
    ).toThrow('Invalid month in SSN')
  })

  test('throws error for invalid day', () => {
    // Manipulera så att getDay() returnerar "00"
    const ssn = '231000-2390' // Day "00"
    expect(() =>
      new SwedishSocialSecurityNumber(ssn, mockHelper)
    ).toThrow('Invalid month in SSN')
  })

  test('throws error for incorrect Luhn checksum', () => {
    // Mocka så att helper returnerar false på luhnisCorrect
    const mockWrongLuhn = { ...mockHelper, luhnisCorrect: () => false }
    expect(() =>
      new SwedishSocialSecurityNumber(validSSN, mockWrongLuhn)
    ).toThrow("Invalid SSN according to Luhn's algorithm")
  })

  test('getter methods return correct values', () => {
    const ssn = new SwedishSocialSecurityNumber(validSSN, mockHelper)
    expect(ssn.getYear()).toBe('23')
    expect(ssn.getMonth()).toBe('10')
    expect(ssn.getDay()).toBe('13')
    expect(ssn.getSerialNumber()).toBe('2390')
  })
})
