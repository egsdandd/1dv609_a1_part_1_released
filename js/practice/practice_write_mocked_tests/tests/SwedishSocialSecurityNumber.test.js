import { SwedishSocialSecurityNumber } from '../src/correct/SwedishSocialSecurityNumber'
import { expect, jest } from '@jest/globals'
//import { SwedishSocialSecurityNumber } from '../src/bugs/BuggySwedishSocialSecurityNumberNoLenCheck'
//import { SwedishSocialSecurityNumber } from '../src/bugs/BuggySwedishSocialSecurityNumberNoTrim'
//import { SwedishSocialSecurityNumber } from '../src/bugs/BuggySwedishSocialSecutityNumberNoLuhn'
//import { SwedishSocialSecurityNumber } from '../src/bugs/BuggySwedishSocialSecutityNumberWrongYear'

const validSSN = '231013-2390' // Från Skatteverkets testdata, korrekt format och Luhn
const ssnWithWhitespace = '  231013-2390  ' // Med whitespace
const badLength = '231013-23901' // 12 tecken
const badFormat = '23101312390' // Saknar bindestreck
const invalidMonth = '230013-2390' // Ogiltig månad
const invalidDay = '231000-2390' // Ogiltig dag

// Ge mockarna namn så att felmeddelanden blir tydligare
/*
const mockHelper = {
  isCorrectLength: jest.fn().mockName('isCorrectLength'),
  isCorrectFormat: jest.fn().mockName('isCorrectFormat'),
  isValidMonth: jest.fn().mockName('isValidMonth'),
  isValidDay: jest.fn().mockName('isValidDay'),
  luhnisCorrect: jest.fn().mockName('luhnisCorrect'),
}
*/
const mockHelper = {
  isCorrectLength: jest.fn().mockImplementation((ssn) => ssn.length === 11),
  isCorrectFormat: jest.fn().mockImplementation((ssn) => /^\d{6}-\d{4}$/.test(ssn)),
  isValidMonth: jest.fn().mockImplementation((month) => {
    const m = parseInt(month)
    return m >= 1 && m <= 12
  }),
  isValidDay: jest.fn().mockImplementation((day) => {
    const d = parseInt(day)
    return d >= 1 && d <= 31
  }),
  luhnisCorrect: jest.fn().mockImplementation(() => true), // Förenkla
}
// Använd en jest-mock för att skapa mockHelper
describe('SwedishSocialSecurityNumber', () => {

  beforeEach(() => {
    // Återställ alla mocks innan varje test
    jest.clearAllMocks()
  })

  it('1 - constructor Should Not Throw Exception For Valid SSN With Whitespace', () => {
    // mockHelper.isCorrectLength.mockReturnValue(true)
    // mockHelper.isCorrectFormat.mockReturnValue(true)
    mockHelper.isValidMonth.mockReturnValue(true)
    mockHelper.isValidDay.mockReturnValue(true)
    mockHelper.luhnisCorrect.mockReturnValue(true)

    expect(() =>
      new SwedishSocialSecurityNumber(ssnWithWhitespace, mockHelper)
    ).not.toThrow()

    // Verifiera att mocken anropades
    // expect(mockHelper.isCorrectLength).not.toHaveBeenCalled() // Fel i BuggySwedishSocialSecurityNumberNoLenCheck
    expect(mockHelper.isCorrectLength).toHaveBeenCalled()
    expect(mockHelper.isCorrectFormat).toHaveBeenCalled()
    expect(mockHelper.isValidMonth).toHaveBeenCalled()
    expect(mockHelper.isValidDay).toHaveBeenCalled()
    expect(mockHelper.luhnisCorrect).toHaveBeenCalled()
  })

  it('2 - constructor Should Throw Too Short Exception For SSN With Incorrect Length', () => {
    mockHelper.isCorrectLength.mockReturnValue(false)

    expect(() =>
      new SwedishSocialSecurityNumber(badLength, mockHelper)
    ).toThrow('To short, must be 11 characters')
    expect(mockHelper.isCorrectLength).toHaveBeenCalled()
  })

  it('3 - constructor Should Throw Incorrect Format Exception For SSN With Incorrect Format', () => {
    mockHelper.isCorrectLength.mockReturnValue(true)
    mockHelper.isCorrectFormat.mockReturnValue(false)

    expect(() =>
      new SwedishSocialSecurityNumber(badFormat, mockHelper)
    ).toThrow('Incorrect format, must be: YYMMDD-XXXX')
    expect(mockHelper.isCorrectLength).toHaveBeenCalled()
    expect(mockHelper.isCorrectFormat).toHaveBeenCalled()
  })

  it('4 - constructor Should Throw Invalid Month Exception For SSN With Invalid Month', () => {
    mockHelper.isCorrectLength.mockReturnValue(true)
    mockHelper.isCorrectFormat.mockReturnValue(true)
    mockHelper.isValidMonth.mockReturnValue(false)

    expect(() =>
      new SwedishSocialSecurityNumber(invalidMonth, mockHelper)
    ).toThrow('Invalid month in SSN')
    expect(mockHelper.isCorrectLength).toHaveBeenCalled()
    expect(mockHelper.isCorrectFormat).toHaveBeenCalled()
    expect(mockHelper.isValidMonth).toHaveBeenCalled()
  })

  it('5 - constructor Should Throw Invalid Day Exception For SSN With Invalid Day', () => {
    mockHelper.isCorrectLength.mockReturnValue(true)
    mockHelper.isCorrectFormat.mockReturnValue(true)
    mockHelper.isValidMonth.mockReturnValue(true)
    mockHelper.isValidDay.mockReturnValue(false)

    expect(() =>
      new SwedishSocialSecurityNumber(invalidDay, mockHelper)
    ).toThrow('Invalid day in SSN')
    expect(mockHelper.isCorrectLength).toHaveBeenCalled()
    expect(mockHelper.isCorrectFormat).toHaveBeenCalled()
    expect(mockHelper.isValidMonth).toHaveBeenCalled()
    expect(mockHelper.isValidDay).toHaveBeenCalled()
  })

  it('6 - constructor Should Throw Invalid Luhn Exception For SSN With Incorrect Luhn Checksum', () => {
    mockHelper.isCorrectLength.mockReturnValue(true)
    mockHelper.isCorrectFormat.mockReturnValue(true)
    mockHelper.isValidMonth.mockReturnValue(true)
    mockHelper.isValidDay.mockReturnValue(true)
    mockHelper.luhnisCorrect.mockReturnValue(false)

    expect(() =>
      new SwedishSocialSecurityNumber(validSSN, mockHelper)
    ).toThrow("Invalid SSN according to Luhn's algorithm")
    expect(mockHelper.isCorrectLength).toHaveBeenCalled()
    expect(mockHelper.isCorrectFormat).toHaveBeenCalled()
    expect(mockHelper.isValidMonth).toHaveBeenCalled()
    expect(mockHelper.isValidDay).toHaveBeenCalled()
    expect(mockHelper.luhnisCorrect).toHaveBeenCalled()
  })

  it('7 - getters Should Return Correct Values For Valid SSN', () => {
    mockHelper.isCorrectLength.mockReturnValue(true)
    mockHelper.isCorrectFormat.mockReturnValue(true)
    mockHelper.isValidMonth.mockReturnValue(true)
    mockHelper.isValidDay.mockReturnValue(true)
    mockHelper.luhnisCorrect.mockReturnValue(true)

    const ssn = new SwedishSocialSecurityNumber(validSSN, mockHelper)
    expect(ssn.getYear()).toBe('23')
    expect(ssn.getMonth()).toBe('10')
    expect(ssn.getDay()).toBe('13')
    expect(ssn.getSerialNumber()).toBe('2390')

    expect(mockHelper.isCorrectLength).toHaveBeenCalled()
    expect(mockHelper.isCorrectFormat).toHaveBeenCalled()
    expect(mockHelper.isValidMonth).toHaveBeenCalled()
    expect(mockHelper.isValidDay).toHaveBeenCalled()
    expect(mockHelper.luhnisCorrect).toHaveBeenCalled()
  })
})
