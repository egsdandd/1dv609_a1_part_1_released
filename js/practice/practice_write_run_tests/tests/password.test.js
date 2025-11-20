
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
    it('1 - constructor Should Not Store Plain Password As Hash For Valid Password', () => {
        const pw = new Password(validPassword1);
        expect(pw.getPasswordHash()).not.toBe(validPassword1);
    });

    // 2 Hitta BUG i BugDoesNotTrim.js
    it('2 - constructor Should Trim Spaces Before Hashing For Password With Spaces', () => {
        const pwWithSpaces = new Password(validPasswordWithSpaces);
        const pwWithoutSpaces = new Password(validPassword1);
        expect(pwWithSpaces.getPasswordHash()).toBe(pwWithoutSpaces.getPasswordHash());
    });

    // 3 Hitta BUG i BugPasswordAlwaysSame.js
    it('3 - isPasswordSame Should Return False For Different Passwords', () => {
        const pw1 = new Password(validPassword1);
        const pw2 = new Password(validPassword2);
        expect(pw1.isPasswordSame(pw2)).toBe(false);
    });

    // 4 Hitta BUG i BugMissingNumberCheck.js
    it('4 - constructor Should Throw No Number Found Exception For Password Without Numbers', () => {
        expect(() => new Password(noNumberPassword)).toThrow("No number found");
    });

    // 5 Hitta BUG i BugMissingPasswordCheck.js
    it('5 - constructor Should Throw Too Short Password Exception For Empty Password', () => {
        expect(() => new Password('')).toThrow("Too short password");
    });

    // 6 Hitta BUG i BugNeverContainsNumbers.js
    it('6 - constructor Should Not Throw Exception For Password With Numbers', () => {
        expect(() => new Password(validPassword1)).not.toThrow();
    });

    // 7 Hitta BUG i BugToShortPassword.js OCH BugWrongMessage.js (kombinerat test)
    it('7 - constructor Should Throw Too Short Password Exception For Password With Length 11', () => {
        expect(() => new Password(password11Chars)).toThrow('Too short password');
    });

    // 8 Hitta BUG i BugVeryShort.js
    it('8 - constructor Should Throw Too Short Password Exception For Password With Length 6', () => {
        expect(() => new Password(password6Chars)).toThrow('Too short password');
    });

    // 9 Hitta BUG i BugWrongHashingAlgorithm.js
    it('9 - getPasswordHash Should Not Have Collisions For Multiple Different Passwords', () => {
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
    it('11 - isPasswordSame Should Throw Invalid Argument Exception For Non-Password Instance', () => {
        const pw1 = new Password(validPassword1);
        expect(() => pw1.isPasswordSame("notAPasswordInstance")).toThrow("Invalid argument");
    });


});