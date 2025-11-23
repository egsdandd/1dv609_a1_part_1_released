# Bugg-täckningstabell för Password Testsvit

## Analys av Testsvitens Buggtäckning

Denna tabell visar vilka tester som passerar (✅) eller failar (❌) för varje version av Password-klassen. Ett failande test indikerar att testet lyckades upptäcka den buggen.

| Testnamn | Correct | BugDoesNotHash | BugDoesNotTrim | BugisPasswordAlwaysSame | BugMissingNumberCheck | BugMissingPasswordCheck | BugNeverContainsNumbers | BugToShortPassword | BugVeryShort | BugWrongHashingAlgorithm | BugWrongMessage |
|-----------|---------|----------------|----------------|-------------------------|----------------------|------------------------|------------------------|-------------------|--------------|-------------------------|----------------|
| **1 - should not store the plain password as hash** | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **2 - should trim spaces before hashing password** | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **3 - should return false for different passwords** | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **4 - should throw error for password without numbers** | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **5 - should throw error for missing password** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **6 - should throw error for password with a number due to broken containsNumber** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ |
| **7 - should throw error for password with length 11 (too short bug)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ |
| **8 - should throw error for password with length 7 (very short bug)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **9 - should not have collisions among many passwords** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| **11 - should throw error when comparing with non-Password instance** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Täckning** | ~100% | ~100% | ~100% | ~100% | ~100% | ~100% | ~100% | ~100% | ~100% | ~100% | ~100% |

## Analyssammanfattning

### Buggdetektering

- **Totalt antal buggar**: 10 buggiga versioner
- **Totalt antal tester**: 10 tester (1-9 och 11)
- **Buggar detekterade**: Varje bugg fångas av minst ett specifikt test (test 1-9)
- **Test 11**: Extra valideringstest som passerar för alla versioner

### Testredundansanalys

**Inga redundanta tester upptäckta** - Varje test från 1-9 fångar minst en unik bugg:

1. **Test 1** - Fångar unikt BugDoesNotHash
2. **Test 2** - Fångar unikt BugDoesNotTrim
3. **Test 3** - Fångar unikt BugisPasswordAlwaysSame
4. **Test 4** - Fångar unikt BugMissingNumberCheck
5. **Test 5** - Fångar unikt BugMissingPasswordCheck
6. **Test 6** - Fångar unikt BugNeverContainsNumbers
7. **Test 7** - Fångar BugToShortPassword OCH BugWrongMessage (båda med längd 11)
8. **Test 8** - Fångar unikt BugVeryShort
9. **Test 9** - Fångar unikt BugWrongHashingAlgorithm
11. **Test 11** - Ytterligare validering (fångar inga unika buggar men testar typkontroll)

**Notering**: Test 7 är extra effektivt eftersom det fångar 2 buggar med samma testdata (lösenord med längd 11 tecken).

### Rekommendationer

**Test 11 Status**: Även om Test 11 inte fångar några av de tillhandahållna buggarna, tjänar det ett annat syfte - validerar typkontroll för `isPasswordSame`-metoden. Överväg att:

- **Behåll det** om du vill ha omfattande täckning av input-validering
- **Ta bort det** om du optimerar för minimal buggdetekteringssvit

**Optimal Testsvit**: Test 1-9 utgör en minimal svit där varje test fångar minst en unik bugg. Test 7 fångar effektivt 2 buggar.

### Kodtäckningsnoteringar

Täckningen är cirka 100% för alla versioner eftersom:

- Testsviten täcker alla viktiga kodvägar
- Konstruktorns valideringslogik testas
- Hashningsfunktionalitet testas
- Jämförelsemetoder testas
- Kantfall (korta lösenord, saknade siffror, etc.) täcks

Obs: Exakta täckningsprocentsatser skulle behöva verifieras genom att köra täckningsverktyg mot varje enskild version.
