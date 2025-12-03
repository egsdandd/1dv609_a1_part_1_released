class Die {
    constructor(sides = 6, randomFunc = Math.random) {
        this.sides = sides;
        this.randomFunc = randomFunc;
    }
    roll() {
        return Math.floor(this.randomFunc() * this.sides) + 1;
    }
}
export { Die };

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
        this.userName = userName;
        this.email = email;

        if (this.#getDomainName(email) !== 'lnu.se') {
            throw new Error('Email must be from lnu.se domain');
        }
        // this.userName = userName; Måste stå innan anrop till getDomainName
        // this.email = email;
    }
    #getDomainName(email) {
        return this.email.split('@')[1]
    }
}
export { User1 };

class Temperature {
  constructor(value, unit) {
    if (unit !== 'C' && unit !== 'F') {
      throw new Error('Unit must be C or F');
    }
    this.value = value;
    this.unit = unit;
  }
  toCelsius() {
    return this.unit === 'C'
      ? this.value
      : (this.value - 32) * 5/9;
  }
  toFahrenheit() {
    return this.unit === 'F'
      ? this.value
      : this.value * 9/5 + 32;
  }
}
export { Temperature };

class Invoice {
  constructor(customer, items, totalCalculator) {
    if (!customer.isActive()) {
      throw new Error('Inactive customer');
    }
    if (!items || items.length === 0) {
      throw new Error('Invoice must have items');
    }
    this.customer = customer;
    this.items = items;
    this.total = totalCalculator.calculate(items);
  }
}
export { Invoice };

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