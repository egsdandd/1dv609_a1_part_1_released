//You are going to write tests for the examination.js 

// import { Password } from "./examination.js"; // Uncomment when Password class is added

/*
describe('Examination tests', () => {
    test('placeholder', () => {
        expect(false).toBe(false);
    });

    
});
*/
// Note: The above test suite is a placeholder. You will need to implement actual tests for the Person class or any other classes/functions that are added to examination.js in the future.
import { Person } from "./examination.js";

describe('Person class tests', () => {
    test('should create a person with a name', () => {
        const person = new Person('Alice');
        expect(person.name).toBe('Alice');
    });
});
