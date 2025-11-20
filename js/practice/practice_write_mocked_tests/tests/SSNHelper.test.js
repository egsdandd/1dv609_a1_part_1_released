import { SSNHelper } from '../src/correct/SSNHelper';
//import { SSNHelper } from '../src/bugs/BuggySSNHelperAllowDayUpTo30';
//import { SSNHelper } from '../src/bugs/BuggySSNHelperAllowMonth0';
//import { SSNHelper } from '../src/bugs/BuggySSNHelperIncorrectFormat';
//import { SSNHelper } from '../src/bugs/BuggySSNHelperMessyLuhn';
//import { SSNHelper } from '../src/bugs/BuggySSNHelperWrongLength';
//import { SSNHelper } from '../src/bugs/BuggySSNHelperAllowDay00'; // The buggy version allowing day 00 was added

describe('SSNHelper Tests', () => {

    describe('SSNHelper isCorrectLength', () => {
        it('1 - isCorrectLength Should Return True For SSN With Length 11', () => {
            const helper = new SSNHelper();
            expect(helper.isCorrectLength('850215-1234')).toBe(true);
        });

        it('2 - isCorrectLength Should Return False For SSN With Length 12', () => {
            const helper = new SSNHelper();
            expect(helper.isCorrectLength('850215-12345')).toBe(false);
        });

        it('3 - isCorrectLength Should Return False For SSN With Length 10', () => {
            const helper = new SSNHelper();
            expect(helper.isCorrectLength('850215-123')).toBe(false);
        });
    });
    describe('SSNHelper isValidMonth', () => {
        it('4 - isValidMonth Should Return False For Month 00', () => {
            const helper = new SSNHelper();
            expect(helper.isValidMonth('00')).toBe(false);
        });
        it('5 - isValidMonth Should Return False For Month 13', () => {
            const helper = new SSNHelper();
            expect(helper.isValidMonth('13')).toBe(false);
        });
        it('6 - isValidMonth Should Return True For Month 01', () => {
            const helper = new SSNHelper();
            expect(helper.isValidMonth('01')).toBe(true);
        });
        it('7 - isValidMonth Should Return True For Month 12', () => {
            const helper = new SSNHelper();
            expect(helper.isValidMonth('12')).toBe(true);
        });
    });
    describe('SSNHelper isValidDay', () => {
        it('8 - isValidDay Should Return False For Day 00 (Added Test)', () => {
            const helper = new SSNHelper();
            expect(helper.isValidDay('00')).toBe(false);
        });
        it('9 - isValidDay Should Return False For Day 32', () => {
            const helper = new SSNHelper();
            expect(helper.isValidDay('32')).toBe(false);
        });
        it('10 - isValidDay Should Return True For Day 01', () => {
            const helper = new SSNHelper();
            expect(helper.isValidDay('01')).toBe(true);
        });
        it('11 - isValidDay Should Return True For Day 31', () => {
            const helper = new SSNHelper();
            expect(helper.isValidDay('31')).toBe(true);
        });
    });
    describe('SSNHelper isCorrectFormat', () => {
        it('12 - isCorrectFormat Should Return False For SSN With Incorrect Format', () => {
            const helper = new SSNHelper();
            expect(helper.isCorrectFormat('8502151234')).toBe(false);
        });
        it('13 - isCorrectFormat Should Return True For SSN With Correct Format', () => {
            const helper = new SSNHelper();
            expect(helper.isCorrectFormat('850215-1234')).toBe(true);
        });
    });
    describe('SSNHelper luhnisCorrect', () => {
        it('14 - luhnisCorrect Should Return False For SSN With Incorrect Luhn Checksum', () => {
            const helper = new SSNHelper();
            expect(helper.luhnisCorrect('850215-1235')).toBe(false);
        });
        it('15 - luhnisCorrect Should Return True For SSN With Correct Luhn Checksum', () => {
            const helper = new SSNHelper();
            expect(helper.luhnisCorrect('850215-1239')).toBe(true);
        });
    });
});