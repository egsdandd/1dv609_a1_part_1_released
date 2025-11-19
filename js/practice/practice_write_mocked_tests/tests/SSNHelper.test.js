import { SSNHelper } from '../src/correct/SSNHelper';
//import { SSNHelper } from '../src/bugs/BuggySSNHelperAllowDayUpTo30';
//import { SSNHelper } from '../src/bugs/BuggySSNHelperAllowMonth0';
//import { SSNHelper } from '../src/bugs/BuggySSNHelperIncorrectFormat';
//import { SSNHelper } from '../src/bugs/BuggySSNHelperMessyLuhn';
//import { SSNHelper } from '../src/bugs/BuggySSNHelperWrongLength';

describe('SSNHelper Tests', () => {

    describe('SSNHelper isCorrectLength', () => {
        test('returns true for SSN of length 11', () => {
            const helper = new SSNHelper();
            expect(helper.isCorrectLength('850215-1234')).toBe(true);
        });

        test('returns true for SSN of length 12', () => {
            const helper = new SSNHelper();
            expect(helper.isCorrectLength('850215-12345')).toBe(false);
        });

        test('returns false for SSN of length 10', () => {
            const helper = new SSNHelper();
            expect(helper.isCorrectLength('850215-123')).toBe(false);
        });
    });
    describe('SSNHelper isValidMonth', () => {
        test('returns false for month "00"', () => {
            const helper = new SSNHelper();
            expect(helper.isValidMonth('00')).toBe(false);
        });
        test('returns false for month "13"', () => {
            const helper = new SSNHelper();
            expect(helper.isValidMonth('13')).toBe(false);
        });
        test('returns true for month "01"', () => {
            const helper = new SSNHelper();
            expect(helper.isValidMonth('01')).toBe(true);
        });
        test('returns true for month "12"', () => {
            const helper = new SSNHelper();
            expect(helper.isValidMonth('12')).toBe(true);
        });
    });
    describe('SSNHelper isValidDay', () => {
        test('returns false for day "00"', () => {
            const helper = new SSNHelper();
            expect(helper.isValidDay('00')).toBe(false);
        });
        test('returns false for day "32"', () => {
            const helper = new SSNHelper();
            expect(helper.isValidDay('32')).toBe(false);
        });
        test('returns true for day "01"', () => {
            const helper = new SSNHelper();
            expect(helper.isValidDay('01')).toBe(true);
        });
        test('returns true for day "31"', () => {
            const helper = new SSNHelper();
            expect(helper.isValidDay('31')).toBe(true);
        });
    });
    describe('SSNHelper isCorrectFormat', () => {
        test('returns false for SSN with incorrect format', () => {
            const helper = new SSNHelper();
            expect(helper.isCorrectFormat('8502151234')).toBe(false);
        });
        test('returns true for SSN with correct format', () => {
            const helper = new SSNHelper();
            expect(helper.isCorrectFormat('850215-1234')).toBe(true);
        });
    });
    describe('SSNHelper luhnisCorrect', () => {
        test('returns false for SSN with incorrect Luhn checksum', () => {
            const helper = new SSNHelper();
            expect(helper.luhnisCorrect('850215-1235')).toBe(false);
        });
        test('returns true for SSN with correct Luhn checksum', () => {
            const helper = new SSNHelper();
            expect(helper.luhnisCorrect('850215-1239')).toBe(true);
        });
    });
});