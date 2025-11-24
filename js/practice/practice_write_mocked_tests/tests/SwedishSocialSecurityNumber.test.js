import { SwedishSocialSecurityNumber } from '../src/correct/SwedishSocialSecurityNumber'
// import { SwedishSocialSecurityNumber } from '../src/bugs/BuggySwedishSocialSecurityNumberNoLenCheck'
//import { SwedishSocialSecurityNumber } from '../src/bugs/BuggySwedishSocialSecurityNumberNoTrim'
//import { SwedishSocialSecurityNumber } from '../src/bugs/BuggySwedishSocialSecurityNumberNoLuhn'
//import { SwedishSocialSecurityNumber } from '../src/bugs/BuggySwedishSocialSecurityNumberWrongYear'
// Mock Helper med grundläggande logik

const validSSN = '231013-2390' // Från Skatteverkets testdata, korrekt format och Luhn
const ssnWithWhitespace = '  231013-2390  ' // Med whitespace
const badLength = '231013-23901' // 12 tecken


const mockHelper = {
  isCorrectLength: ssn => ssn.length === 11,
  isCorrectFormat: ssn => /^\d{6}-\d{4}$/.test(ssn),
  isValidMonth: month => parseInt(month, 10) >= 1 && parseInt(month, 10) <= 12,
  isValidDay: day => parseInt(day, 10) >= 1 && parseInt(day, 10) <= 31,
  luhnisCorrect: ssn => ssn === validSSN, // En enkel stub för demonstration
}

describe('SwedishSocialSecurityNumber', () => {

  it('1 - constructor Should Not Throw Exception For Valid SSN With Whitespace', () => {
    expect(() =>
      new SwedishSocialSecurityNumber(ssnWithWhitespace, mockHelper)
    ).not.toThrow()
  })

  it('2 - constructor Should Throw Too Short Exception For SSN With Incorrect Length', () => {
    expect(() =>
      new SwedishSocialSecurityNumber(badLength, mockHelper)
    ).toThrow('To short, must be 11 characters')
  })

  it('3 - constructor Should Throw Invalid Luhn Exception For SSN With Incorrect Luhn Checksum', () => {
    // Mocka så att helper returnerar false på luhnisCorrect
    const mockWrongLuhn = { ...mockHelper, luhnisCorrect: () => false }
    expect(() =>
      new SwedishSocialSecurityNumber(validSSN, mockWrongLuhn)
    ).toThrow("Invalid SSN according to Luhn's algorithm")
  })

  // Test 4 i SwedishSocialSecurityNumber har 4 expects men de testar relaterade getters (motiverat)
  it('4 - getters Should Return Correct Values For Valid SSN', () => {
    const ssn = new SwedishSocialSecurityNumber(validSSN, mockHelper)
    expect(ssn.getYear()).toBe('23')
    expect(ssn.getMonth()).toBe('10')
    expect(ssn.getDay()).toBe('13')
    expect(ssn.getSerialNumber()).toBe('2390')
  })
})
