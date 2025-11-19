import { SSNHelper } from '../src/correct/SSNHelper';
//import { SSNHelper } from '../src/bugs/BuggySSNHelperAllowDayUpTo30';
//import { SSNHelper } from '../src/bugs/BuggySSNHelperAllowMonth0';
//import { SSNHelper } from '../src/bugs/BuggySSNHelperIncorrectFormat';
//import { SSNHelper } from '../src/bugs/BuggySSNHelperMessyLuhn';
//import { SSNHelper } from '../src/bugs/BuggySSNHelperWrongLength';
//import { SSNHelper } from '../src/bugs/BuggySSNHelperAllowDay00'; // The buggy version allowing day 00 was added

describe('SSNHelper Tests', () => {

    describe('SSNHelper isCorrectLength', () => {
        it('1 - returns true for SSN of length 11', () => {
            const helper = new SSNHelper();
            expect(helper.isCorrectLength('850215-1234')).toBe(true);
        });

        it('2 - returns false for SSN of length 12', () => {
            const helper = new SSNHelper();
            expect(helper.isCorrectLength('850215-12345')).toBe(false);
        });

        it('3 - returns false for SSN of length 10', () => {
            const helper = new SSNHelper();
            expect(helper.isCorrectLength('850215-123')).toBe(false);
        });
    });
    describe('SSNHelper isValidMonth', () => {
        it('4 - returns false for month "00"', () => {
            const helper = new SSNHelper();
            expect(helper.isValidMonth('00')).toBe(false);
        });
        it('5 - returns false for month "13"', () => {
            const helper = new SSNHelper();
            expect(helper.isValidMonth('13')).toBe(false);
        });
        it('6 - returns true for month "01"', () => {
            const helper = new SSNHelper();
            expect(helper.isValidMonth('01')).toBe(true);
        });
        it('7 - returns true for month "12"', () => {
            const helper = new SSNHelper();
            expect(helper.isValidMonth('12')).toBe(true);
        });
    });
    describe('SSNHelper isValidDay', () => {
        it('8 - returns false for day "00" this test was added as my own', () => {
            const helper = new SSNHelper();
            expect(helper.isValidDay('00')).toBe(false);
        });
        it('9 - returns false for day "32"', () => {
            const helper = new SSNHelper();
            expect(helper.isValidDay('32')).toBe(false);
        });
        it('10 - returns true for day "01"', () => {
            const helper = new SSNHelper();
            expect(helper.isValidDay('01')).toBe(true);
        });
        it('11 - returns true for day "31"', () => {
            const helper = new SSNHelper();
            expect(helper.isValidDay('31')).toBe(true);
        });
    });
    describe('SSNHelper isCorrectFormat', () => {
        it('12 - returns false for SSN with incorrect format', () => {
            const helper = new SSNHelper();
            expect(helper.isCorrectFormat('8502151234')).toBe(false);
        });
        it('13 - returns true for SSN with correct format', () => {
            const helper = new SSNHelper();
            expect(helper.isCorrectFormat('850215-1234')).toBe(true);
        });
    });
    describe('SSNHelper luhnisCorrect', () => {
        it('14 - returns false for SSN with incorrect Luhn checksum', () => {
            const helper = new SSNHelper();
            expect(helper.luhnisCorrect('850215-1235')).toBe(false);
        });
        it('15 - returns true for SSN with correct Luhn checksum', () => {
            const helper = new SSNHelper();
            expect(helper.luhnisCorrect('850215-1239')).toBe(true);
        });
    });
});