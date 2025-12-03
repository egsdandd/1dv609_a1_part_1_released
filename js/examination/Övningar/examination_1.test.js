import { Calculator, UserValidator, DiscountCalculator, FileProcessor, EmailSender, ShoppingCart } from "./examination_1";
import { describe, jest } from '@jest/globals';
describe('Calculator add', () => {
    it('1 - add Should Return Correct Sum And Log Operation', () => {
        const mockLogger = {
            log: jest.fn().mockName('log'),
        };
        const calculator = new Calculator(mockLogger);
        const result = calculator.add(2, 3);
        expect(result).toBe(5);
        expect(mockLogger.log).toHaveBeenCalledWith('add', 2, 3, 5);
    });
});

describe('UserValidator validate', () => {
    it('2 - validate Should Return False For Invalid Email And Weak Password', () => {
        const mockEmailChecker = {
            isValid: jest.fn().mockReturnValue(false),
        };
        const mockPasswordChecker = {
            isStrong: jest.fn().mockReturnValue(false),
        };
        const userValidator = new UserValidator(mockEmailChecker, mockPasswordChecker);
        const result = userValidator.validate('invalid-email', 'weakpassword');
        expect(result).toBe(false);
        expect(mockEmailChecker.isValid).toHaveBeenCalledWith('invalid-email');
        expect(mockPasswordChecker.isStrong).toHaveBeenCalledWith('weakpassword');
    });
});

describe('DiscountCalculator calculatePrice', () => {
    it('3 - calculatePrice Should Apply Discount Correctly', () => {
        const mockPricingService = {
            getPrice: jest.fn().mockReturnValue(100),
        };
        const discountCalculator = new DiscountCalculator(mockPricingService);
        const result = discountCalculator.calculatePrice('BLACKFRIDAY');
        expect(result).toBe(80);
        expect(mockPricingService.getPrice).toHaveBeenCalledWith('BLACKFRIDAY');
    });
});

describe('DiscountCalculator 2', () => {
    let mockDateProvider;
    let mockCustomerService;
    let discountCalculator;

    beforeEach(() => {
        mockDateProvider = {
            isToday: jest.fn().mockReturnValue(true),
        };
        mockCustomerService = {
            getCustomer: jest.fn().mockReturnValue({ id: 1, name: 'John Doe' }),
        };
        discountCalculator = new DiscountCalculator(mockPricingService, mockDateProvider, mockCustomerService);
    });

    it('4 - calculatePrice Should Apply Premium Customer Discount On Weekend', () => {
        mockDateProvider.isToday.mockReturnValue(true);
        mockCustomerService.getCustomer.mockReturnValue({ id: 1, name: 'John Doe', isPremium: true });
        const result = discountCalculator.calculatePrice('BLACKFRIDAY');
        expect(result).toBe(70);
    });
    it('5 - calculatePrice Should Not Apply Discount On Weekday For Regular Customer', () => {
        mockDateProvider.isToday.mockReturnValue(false);
        mockCustomerService.getCustomer.mockReturnValue({ id: 2, name: 'Jane Smith', isPremium: false });
        const result = discountCalculator.calculatePrice('BLACKFRIDAY');
        expect(result).toBe(100);
    });
});

describe('DiscountCalculator 3', () => {
    let mockDateProvider;
    let mockCustomerService;
    let discountCalculator;
    beforeEach(() => {
        mockDateProvider = { getCurrentDate: jest.fn() };
        mockCustomerService = { isPremium: jest.fn() };
        discountCalculator = new DiscountCalculator(mockDateProvider, mockCustomerService);
    });
    it('6 - calculatePrice Should Apply No Discount For Non-Premium Customer On Non-Weekend', () => {
        mockDateProvider.getCurrentDate.mockReturnValue(new Date('2024-06-12')); // Wednesday
        mockCustomerService.isPremium.mockReturnValue(false);
        const result = discountCalculator.calculatePrice(200, 3);
        expect(result).toBe(200);
    });
});
describe('Copilot - DiscountCalculator calculatePrice', () => {

    it('Should apply discount for premium customer', () => {
        // 1. Mocka dateProvider
        const mockDateProvider = {
            getCurrentDate: jest.fn().mockReturnValue(new Date('2025-01-15'))
        };

        // 2. Mocka customerService
        const mockCustomerService = {
            isPremium: jest.fn().mockReturnValue(true) // Premium-kund
        };

        // 3. Skapa calculator
        const calculator = new DiscountCalculator(mockDateProvider, mockCustomerService);

        // 4. Anropa metoden
        const price = calculator.calculatePrice(100, 'customer123');

        // 5. Verifiera resultat (t.ex. 10% rabatt)
        expect(price).toBe(90); // Förväntar 10% rabatt

        // 6. Verifiera att mockarna anropades
        expect(mockCustomerService.isPremium).toHaveBeenCalledWith('customer123');
        expect(mockDateProvider.getCurrentDate).toHaveBeenCalled();
    });

    it('Should NOT apply discount for regular customer', () => {
        const mockDateProvider = {
            getCurrentDate: jest.fn().mockReturnValue(new Date('2025-01-15'))
        };

        const mockCustomerService = {
            isPremium: jest.fn().mockReturnValue(false) // INTE premium
        };

        const calculator = new DiscountCalculator(mockDateProvider, mockCustomerService);
        const price = calculator.calculatePrice(100, 'customer456');

        expect(price).toBe(100); // Ingen rabatt
        expect(mockCustomerService.isPremium).toHaveBeenCalledWith('customer456');
    });

    it('Should apply extra discount on Black Friday', () => {
        const mockDateProvider = {
            getCurrentDate: jest.fn().mockReturnValue(new Date('2025-11-29')) // Black Friday
        };

        const mockCustomerService = {
            isPremium: jest.fn().mockReturnValue(false)
        };

        const calculator = new DiscountCalculator(mockDateProvider, mockCustomerService);
        const price = calculator.calculatePrice(100, 'customer789');

        expect(price).toBe(80); // 20% Black Friday rabatt
    });
});

describe('FileProcessor process', () => {
    it('Should read, validate, and write file content', () => {
        // 1. Mocka filkomponenter
        const mockFileReader = {
            read: jest.fn().mockReturnValue('file content')
        };
        const mockValidator = {
            isValid: jest.fn().mockReturnValue(true)
        };
        const mockFileWriter = {
            write: jest.fn()
        };

        // 2. Skapa en instans av FileProcessor med mockarna
        const fileProcessor = new FileProcessor(mockFileReader, mockValidator, mockFileWriter);

        // 3. Anropa process-metoden
        const result = fileProcessor.process('input.txt', 'output.txt');

        // 4. Testa buggen - returnerar false och läser aldrig filen
        expect(result).toBe(false);
        expect(mockFileReader.read).not.toHaveBeenCalled();
        expect(mockValidator.isValid).not.toHaveBeenCalled();
        expect(mockFileWriter.write).not.toHaveBeenCalled();
    });
});

describe('EmailSender sendEmail', () => {
    it('Should render template and send email', () => {
        // 1. Mocka SMTP-klient och mallmotor
        const mockSmtpClient = {
            send: jest.fn()
        };
        const mockTemplateEngine = {
            render: jest.fn().mockReturnValue('rendered email content')
        };

        // 2. Skapa en instans av EmailSender med mockarna
        const emailSender = new EmailSender(mockSmtpClient, mockTemplateEngine);

        // 3. Anropa sendEmail-metoden
        const result = emailSender.sendEmail('to@example.com', 'templateName', {});

        // 4. Testa buggen - returnerar false istället för att skicka
        expect(result).toBe(false);

        // 5. Buggen: mockarna anropas ALDRIG
        expect(mockTemplateEngine.render).not.toHaveBeenCalled();
        expect(mockSmtpClient.send).not.toHaveBeenCalled();
    });
});

describe('ShoppingCart calculateTotal', () => {
    it('Should calculate total price with tax for available items', () => {
        // 1. Mocka prisservice, skatteberäknare och lagerkontroll
        const mockPriceService = {
            getPrice: jest.fn().mockReturnValue(100)
        };
        const mockTaxCalculator = {
            calculateTax: jest.fn().mockReturnValue(25)
        };
        const mockInventoryService = {
            isInStock: jest.fn().mockReturnValue(true)
        };

        // 2. Skapa en instans av ShoppingCart med mockarna
        const shoppingCart = new ShoppingCart(mockPriceService, mockTaxCalculator, mockInventoryService);

        // 3. Anropa calculateTotal-metoden
        const total = shoppingCart.calculateTotal(['item1', 'item2']);

        // 4. Verifiera att metoderna anropades med rätt argument
        expect(mockPriceService.getPrice).toHaveBeenCalledWith('item1');
        expect(mockPriceService.getPrice).toHaveBeenCalledWith('item2');
        expect(mockTaxCalculator.calculateTax).toHaveBeenCalledWith(200);
        expect(total).toBe(225);
    });
});