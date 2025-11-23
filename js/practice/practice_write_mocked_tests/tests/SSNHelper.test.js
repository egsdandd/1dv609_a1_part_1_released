import { SSNHelper } from '../src/correct/SSNHelper';
//import { SSNHelper } from '../src/bugs/BuggySSNHelperAllowDayUpTo30';
//import { SSNHelper } from '../src/bugs/BuggySSNHelperAllowMonth0';
//import { SSNHelper } from '../src/bugs/BuggySSNHelperIncorrectFormat';
//import { SSNHelper } from '../src/bugs/BuggySSNHelperMessyLuhn';
//import { SSNHelper } from '../src/bugs/BuggySSNHelperWrongLength';
//import { SSNHelper } from '../src/bugs/BuggySSNHelperAllowDay00';

describe('SSNHelper Tests', () => {

    describe('SSNHelper isCorrectLength', () => {
        it('1 - isCorrectLength Should Return False For SSN With Length 12', () => {
            const helper = new SSNHelper();
            expect(helper.isCorrectLength('850215-12345')).toBe(false);
        });
    });

    describe('SSNHelper isValidMonth', () => {
        it('2 - isValidMonth Should Return False For Month 00', () => {
            const helper = new SSNHelper();
            expect(helper.isValidMonth('00')).toBe(false);
        });
    });

    describe('SSNHelper isValidDay', () => {
        it('3 - isValidDay Should Return False For Day 00 (Added Test)', () => {
            const helper = new SSNHelper();
            expect(helper.isValidDay('00')).toBe(false);
        });

        it('4 - isValidDay Should Return True For Day 31', () => {
            const helper = new SSNHelper();
            expect(helper.isValidDay('31')).toBe(true);
        });
    });

    describe('SSNHelper isCorrectFormat', () => {
        it('5 - isCorrectFormat Should Return False For SSN With Incorrect Format', () => {
            const helper = new SSNHelper();
            expect(helper.isCorrectFormat('8502151234')).toBe(false);
        });
    });

    describe('SSNHelper luhnisCorrect', () => {
        it('6 - luhnisCorrect Should Return True For SSN With Correct Luhn Checksum', () => {
            const helper = new SSNHelper();
            expect(helper.luhnisCorrect('850215-1239')).toBe(true);
        });
    });
});