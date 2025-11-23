#!/bin/bash

# Test SSNHelper against all buggy versions

test_file="practice/practice_write_mocked_tests/tests/SSNHelper.test.js"

echo "Testing Correct version:"
sed -i "s|import { SSNHelper } from '../src/.*';|import { SSNHelper } from '../src/correct/SSNHelper';|" "$test_file"
npm test -- practice_write_mocked_tests/tests/SSNHelper.test.js 2>&1 | grep -E "(PASS|FAIL|Tests:)"
echo ""

echo "Testing BuggySSNHelperAllowDayUpTo30:"
sed -i "s|import { SSNHelper } from '../src/.*';|import { SSNHelper } from '../src/bugs/BuggySSNHelperAllowDayUpTo30';|" "$test_file"
npm test -- practice_write_mocked_tests/tests/SSNHelper.test.js 2>&1 | grep -E "(FAIL|Tests:|×)"
echo ""

echo "Testing BuggySSNHelperAllowMonth0:"
sed -i "s|import { SSNHelper } from '../src/.*';|import { SSNHelper } from '../src/bugs/BuggySSNHelperAllowMonth0';|" "$test_file"
npm test -- practice_write_mocked_tests/tests/SSNHelper.test.js 2>&1 | grep -E "(FAIL|Tests:|×)"
echo ""

echo "Testing BuggySSNHelperIncorrectFormat:"
sed -i "s|import { SSNHelper } from '../src/.*';|import { SSNHelper } from '../src/bugs/BuggySSNHelperIncorrectFormat';|" "$test_file"
npm test -- practice_write_mocked_tests/tests/SSNHelper.test.js 2>&1 | grep -E "(FAIL|Tests:|×)"
echo ""

echo "Testing BuggySSNHelperMessyLuhn:"
sed -i "s|import { SSNHelper } from '../src/.*';|import { SSNHelper } from '../src/bugs/BuggySSNHelperMessyLuhn';|" "$test_file"
npm test -- practice_write_mocked_tests/tests/SSNHelper.test.js 2>&1 | grep -E "(FAIL|Tests:|×)"
echo ""

echo "Testing BuggySSNHelperWrongLength:"
sed -i "s|import { SSNHelper } from '../src/.*';|import { SSNHelper } from '../src/bugs/BuggySSNHelperWrongLength';|" "$test_file"
npm test -- practice_write_mocked_tests/tests/SSNHelper.test.js 2>&1 | grep -E "(FAIL|Tests:|×)"
echo ""

echo "Testing BuggySSNHelperAllowDay00 (NEW):"
sed -i "s|import { SSNHelper } from '../src/.*';|import { SSNHelper } from '../src/bugs/BuggySSNHelperAllowDay00';|" "$test_file"
npm test -- practice_write_mocked_tests/tests/SSNHelper.test.js 2>&1 | grep -E "(FAIL|Tests:|×)"
echo ""

# Restore to correct version
sed -i "s|import { SSNHelper } from '../src/.*';|import { SSNHelper } from '../src/correct/SSNHelper';|" "$test_file"

echo "All tests completed. Restored to correct version."
