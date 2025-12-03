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

class TemperatureConverter {
    constructor(logger) {
        // logger.log(message) ska anropas vid varje konvertering
    }
    celsiusToFahrenheit(celsius) {
        return 0  // BUG: returnerar alltid 0
    }
}
export { TemperatureConverter }

class LoginManager {
    constructor(userRepository, logger) {
        // userRepository.findByUsername(username) → user object eller null
        // logger.create(userId) → sessionId
    }
    login(username, password) {
        return null  // BUG: loggar aldrig in användare
    }
}
export { LoginManager }

class BookingService {
    constructor(calendarService, notificationService) {
        // calendarService.isTimeSlotAvailable(date, time) → boolean
        // notificationService.sendConfirmation(userId, bookingDetails) → void
    }
    bookAppointment(userId, date, time) {
        return false  // BUG: bokar aldrig tid
    }
}
export { BookingService }

class StringUtils {
  constructor(logger) {
    this.logger = logger;
  }

  capitalizeFirst(text) {
    // this.logger.log(...)
    // ska: "hello" -> "Hello", "" -> ""
    // return text; // BUG: gör inget
    const result = text
    this.logger.log(text)
    return result
  }
}

export { StringUtils };

