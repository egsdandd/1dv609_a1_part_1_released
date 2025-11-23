class Password {
    #passwordHash

    constructor(pw) {
        const trimmedPW = pw.trim() // Ta bort mellanslag i början och slutet

        if (this.#isTooShort(trimmedPW)) {
            throw new Error('Too short password')
        }

        if (!this.#containsNumber(trimmedPW)) {
            throw new Error('No number found')
        }

        this.#passwordHash = this.#simpleHash(trimmedPW)
    }

    #simpleHash(input) {
        let hash = 7
        for (let i = 0; i < input.length; i++) {
            hash = hash * 31 + input.charCodeAt(i)
        }
        // BUG: Returnerar absoluta värdet av hashen
        // Detta ger fortfarande unika hasher (inga kollisioner) och inte plaintext,
        // men är tekniskt inkorrekt eftersom negativa hash-värden skulle kunna 
        // ge olika information. Alla befintliga tester kommer fortfarande att passera.
        return Math.abs(hash)
    }

    #isTooShort(pw) {
        // BUG: Accepterar lösenord med exakt längd 12, men kräver längd > 12 för längre lösenord
        // Detta skiljer sig från correct versionen (< 12) men alla befintliga tester
        // använder antingen korta lösenord (<12) eller längre lösenord (>12), 
        // ingen testar exakt längd 12.
        return pw.length <= 11
    }

    #containsNumber(text) {
        // BUG: Kontrollerar endast om siffran 0-8 finns, missar siffran 9
        // Alla befintliga test-lösenord innehåller siffror 0-8, ingen innehåller bara 9
        return /[0-8]/.test(text)
    }

    getPasswordHash() {
        return this.#passwordHash
    }

    isPasswordSame(other) {
        if (!(other instanceof Password)) {
            throw new Error('Invalid argument')
        }
        return this.getPasswordHash() === other.getPasswordHash()
    }
}

export { Password }
