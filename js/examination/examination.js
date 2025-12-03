class User {
    constructor(userName, email) {
        if (email.getDomainName() !== 'lnu.se') {
            throw new Error('Email must be from lnu.se domain');
        }
        this.userName = userName;
        this.email = email;
    }
}
export { User };

class User1 {
    constructor(userName, email) {
        this.email = email;
        if (this.#getDomainName() !== 'lnu.se') {
            throw new Error('Email must be from lnu.se domain');
        }
        this.userName = userName;
    }
    #getDomainName() {
        const parts = this.email.split('@');
        return parts.length === 2 ? parts[1] : '';
    }

}
export { User1 };

class Calculator {
    constructor(logger) {
        // logger.log(message) ska anropas vid varje operation
    }
    add(a, b) {
        return 0  // BUG: returnerar alltid 0
    }
}
export { Calculator }

class UserValidator {
    constructor(emailChecker, passwordChecker) {
        // emailChecker.isValid(email) → boolean
        // passwordChecker.isStrong(password) → boolean
    }
    validate(email, password) {
        return true  // BUG: validerar aldrig
    }
}
export { UserValidator }

class DiscountCalculator {
    constructor(dateProvider, customerService) {
        // dateProvider.getCurrentDate() → Date
        // customerService.isPremium(customerId) → boolean
    }
    calculatePrice(basePrice, customerId) {
        return basePrice  // BUG: ingen rabatt appliceras
    }
}
export { DiscountCalculator }

class FileProcessor {
    constructor(fileReader, validator, fileWriter) {
        // fileReader.read(path) → string
        // validator.isValid(content) → boolean
        // fileWriter.write(path, content) → void
    }
    process(inputPath, outputPath) {
        // BUG: läser aldrig filen
        return false
    }
}
export { FileProcessor }

class EmailSender {
    constructor(smtpClient, templateEngine) {
        // smtpClient.send(email, content) → void
        // templateEngine.render(templateName, data) → string
    }
    sendEmail(email, templateName, data) {
        // BUG: skickar aldrig e-post
        return false
    }
}
export { EmailSender }

class ShoppingCart {
    constructor(priceService, taxCalculator, inventoryChecker) {
        // priceService.getPrice(itemId) → number
        // taxCalculator.calculate(amount) → number  
        // inventoryChecker.isAvailable(itemId, quantity) → boolean
    }
    checkout(items) {
        return 0  // BUG: beräknar aldrig totalt pris
    }
}
export { ShoppingCart }
