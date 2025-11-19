



class SSNHelper {

    isCorrectLength(stringInput) {
        return stringInput.length == 11; //YYMMDD-XXXX
    }
    isCorrectFormat(stringInput) {
        const ssnRegex = /^\d{6}-\d{4}$/;
        return ssnRegex.test(stringInput);
    }
    isValidMonth(monthString) {
        const month = parseInt(monthString, 10);
        return month >= 1 && month <= 12;
    }
    isValidDay(dayString) {
        const day = parseInt(dayString, 10);
        // BUG: Allows day 00 (should be >= 1)
        return day >= 0 && day <= 31;
    }

    luhnisCorrect(stringInput) {

        const digits = stringInput.replace('-', '').split('').map(Number);
        let sum = 0;
        for (let i = 0; i < digits.length; i++) {
            let digit = digits[i];
            if (i % 2 === 0) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
        }
        return sum % 10 === 0;
    }
}

export { SSNHelper }
