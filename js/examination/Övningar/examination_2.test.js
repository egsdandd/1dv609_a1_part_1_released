import { TemperatureConverter, LoginManager, BookingService } from './examination_1';
import { describe, expect, jest } from '@jest/globals';
/*
const mockLogger = {
    log: jest.fn()
};

describe('TemperatureConverter', () => {
    beforeEach(() => {
        mockLogger.log.mockReset();
    });
    test('celsiusToFahrenheit converts correctly and logs the operation', () => {
        const converter = new TemperatureConverter(mockLogger);
        const result = converter.celsiusToFahrenheit(0);
        expect(result).toBe(0);
        expect(mockLogger.log).toHaveBeenCalledWith('Converted 0C to 32F');
    });
});
*/
describe('LoginManager', () => {
    const mockUserRepository = {
        findByUsername: jest.fn()
    };
    const mockLogger = {
        log: jest.fn()
    };
    const loginManager = new LoginManager(mockUserRepository, mockLogger);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('login succeeds with correct credentials', () => {
        mockUserRepository.findByUsername.mockResolvedValue({ id: 1, username: 'testuser', password: 'password' });
        const result = loginManager.login('testuser', 'password');
        expect(result).toEqual({ id: 1, username: 'testuser' });
        expect(mockLogger.log).toHaveBeenCalledWith('User testuser logged in');
    });

    test('login fails with incorrect credentials', () => {
        mockUserRepository.findByUsername.mockResolvedValue(null);
        const result = loginManager.login('testuser', 'wrongpassword');
        expect(result).toBeNull();
        expect(mockLogger.log).toHaveBeenCalledWith('Failed login attempt for user testuser');
    });
});

describe('BookingService', () => {
    const mockCalendarService = {
        isTimeSlotAvailable: jest.fn()
    };
    const mockNotificationService = {
        sendConfirmation: jest.fn()
    };
    const bookingService = new BookingService(mockCalendarService, mockNotificationService);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('bookAppointment succeeds with available time slot', () => {
        mockCalendarService.isTimeSlotAvailable.mockReturnValue(true);
        const result = bookingService.bookAppointment(1, new Date(), '10:00');
        expect(result).toBe(true);
        expect(mockNotificationService.sendConfirmation).toHaveBeenCalledWith(1, expect.any(Object));
    });

    test('bookAppointment fails with unavailable time slot',() => {
        mockCalendarService.isTimeSlotAvailable.mockReturnValue(false);
        const result = bookingService.bookAppointment(1, new Date(), '10:00');
        expect(result).toBe(false);
        expect(mockNotificationService.sendConfirmation).not.toHaveBeenCalled();
    });
});

        