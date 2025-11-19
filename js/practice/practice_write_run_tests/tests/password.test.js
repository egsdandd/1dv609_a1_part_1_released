
// Select one of the Password versions to test

// import { Password } from '../src/BugDoesNotHash' // 1
//import { Password } from '../src/BugDoesNotTrim' // 2
// import { Password } from '../src/BugisPasswordAlwaysSame' // 3
// import { Password } from '../src/BugMissingNumberCheck' // 4
// import { Password } from '../src/BugMissingPasswordCheck' // 5
// import { Password } from '../src/BugNeverContainsNumbers' // 6
// import { Password } from '../src/BugToShortPassword' // 7
// import { Password } from '../src/BugVeryShort' // 8
// import { Password } from '../src/BugWrongHashingAlgorithm' // 9
//import { Password } from '../src/BugWrongMessage' // 10
import { Password } from '../src/Correct'

describe('Password class, test suite', () => {
    //put constants here to increase readability
    const emptyPassword = '';
    const shortPassword = 'short';
    const noNumberPassword = 'longenoughpassword';
    const validPassword1 = 'validPassword1';
    const validPassword2 = 'anotherValidPassword2';
    const validPasswordWithSpaces = '   validPassword1   ';
    const password11Chars = '0123456789a'; // 11 tecken totalt
    const password6Chars = 'a1b2c3'; // 6 tecken totalt

    // 1 Hitta BUG i BugDoesNotHash.js
    it('1 should not store the plain password as hash', () => {
        const pw = new Password(validPassword1);
        expect(pw.getPasswordHash()).not.toBe(validPassword1);
    });

    // 2 Hitta BUG i BugDoesNotTrim.js
    it('2 should trim spaces before hasing password', () => {
        const pwWithSpaces = new Password(validPasswordWithSpaces);
        const pwWithoutSpaces = new Password(validPassword1);
        expect(pwWithSpaces.getPasswordHash()).toBe(pwWithoutSpaces.getPasswordHash());
    });

    // 3 Hitta BUG i BugPasswordAlwaysSame.js
    it('3 should return false for different passwords', () => {
        const pw1 = new Password(validPassword1);
        const pw2 = new Password(validPassword2);
        expect(pw1.isPasswordSame(pw2)).toBe(false);
    });

    // 4 Hitta BUG i BugMissingNumberCheck.js
    it('4 should throw error for password without numbers', () => {
        expect(() => new Password(noNumberPassword)).toThrow("No number found");
    });

    // 5 Hitta BUG i BugMissingPasswordCheck.js
    it('5 should throw error for missing password', () => {
        expect(() => new Password('')).toThrow("Too short password");
    });

    // 6 Hitta BUG i BugNeverContainsNumbers.js
    it('6 should throw error for password with a number due to broken containsNumber', () => {
        expect(() => new Password(validPassword1)).not.toThrow();
    });

    // 7 Hitta BUG i BugToShortPassword.js OCH BugWrongMessage.js (kombinerat test)
    it('7 should throw "Too short password" error for password with length 11', () => {
        expect(() => new Password(password11Chars)).toThrow('Too short password');
    });

    // 8 Hitta BUG i BugVeryShort.js
    it('8 should throw "Too short password" error for password with length ', () => {

        expect(() => new Password(password6Chars)).toThrow('Too short password');
    });

    // 9 Hitta BUG i BugWrongHashingAlgorithm.js
    it('9 should not have collisions among many passwords', () => {
        const passwords = [
            'abcdefgh1234',
            'abcde12345678',
            'longerpassw0rd123',
            'uniquePwd09876',
            'Diff123456789',
            'yetAnother1234'
        ]

        const hashes = passwords.map(pw => new Password(pw).getPasswordHash())

        // Kontrollera att alla är unika (ingen kollision)
        const hasDuplicates = hashes.length !== new Set(hashes).size
        expect(hasDuplicates).toBe(false)
    });

    // 11 Extra test for isPasswordSame with invalid argument
    it('11 -should throw error when comparing with non-Password instance', () => {
        const pw1 = new Password(validPassword1);
        expect(() => pw1.isPasswordSame("notAPasswordInstance")).toThrow("Invalid argument");
    });


});