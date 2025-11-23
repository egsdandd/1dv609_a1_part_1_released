#!/bin/bash

# Test SwedishSocialSecurityNumber against all buggy versions

test_file="practice/practice_write_mocked_tests/tests/SwedishSocialSecurityNumber.test.js"

echo "Testing Correct version:"
sed -i "1s|.*|import { SwedishSocialSecurityNumber } from '../src/correct/SwedishSocialSecurityNumber'|" "$test_file"
npm test -- practice_write_mocked_tests/tests/SwedishSocialSecurityNumber.test.js 2>&1 | grep -E "(PASS|FAIL|Tests:)"
echo ""

echo "Testing BuggySwedishSocialSecurityNumberNoLenCheck:"
sed -i "1s|.*|import { SwedishSocialSecurityNumber } from '../src/bugs/BuggySwedishSocialSecurityNumberNoLenCheck'|" "$test_file"
npm test -- practice_write_mocked_tests/tests/SwedishSocialSecurityNumber.test.js 2>&1 | grep -E "(FAIL|Tests:|×)"
echo ""

echo "Testing BuggySwedishSocialSecurityNumberNoTrim:"
sed -i "1s|.*|import { SwedishSocialSecurityNumber } from '../src/bugs/BuggySwedishSocialSecurityNumberNoTrim'|" "$test_file"
npm test -- practice_write_mocked_tests/tests/SwedishSocialSecurityNumber.test.js 2>&1 | grep -E "(FAIL|Tests:|×)"
echo ""

echo "Testing BuggySwedishSocialSecutityNumberNoLuhn:"
sed -i "1s|.*|import { SwedishSocialSecurityNumber } from '../src/bugs/BuggySwedishSocialSecutityNumberNoLuhn'|" "$test_file"
npm test -- practice_write_mocked_tests/tests/SwedishSocialSecurityNumber.test.js 2>&1 | grep -E "(FAIL|Tests:|×)"
echo ""

echo "Testing BuggySwedishSocialSecutityNumberWrongYear:"
sed -i "1s|.*|import { SwedishSocialSecurityNumber } from '../src/bugs/BuggySwedishSocialSecutityNumberWrongYear'|" "$test_file"
npm test -- practice_write_mocked_tests/tests/SwedishSocialSecurityNumber.test.js 2>&1 | grep -E "(FAIL|Tests:|×)"
echo ""

# Restore to correct version
sed -i "1s|.*|import { SwedishSocialSecurityNumber } from '../src/correct/SwedishSocialSecurityNumber'|" "$test_file"

echo "All tests completed. Restored to correct version."
