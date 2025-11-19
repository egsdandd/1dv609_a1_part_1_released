#!/bin/bash

# Detailed test results for SSNHelper

test_file="practice/practice_write_mocked_tests/tests/SSNHelper.test.js"

echo "BuggySSNHelperAllowDayUpTo30:"
sed -i "s|import { SSNHelper } from '../src/.*';|import { SSNHelper } from '../src/bugs/BuggySSNHelperAllowDayUpTo30';|" "$test_file"
npm test -- practice_write_mocked_tests/tests/SSNHelper.test.js 2>&1 | grep -E "×" | head -5
echo ""

echo "BuggySSNHelperAllowMonth0:"
sed -i "s|import { SSNHelper } from '../src/.*';|import { SSNHelper } from '../src/bugs/BuggySSNHelperAllowMonth0';|" "$test_file"
npm test -- practice_write_mocked_tests/tests/SSNHelper.test.js 2>&1 | grep -E "×" | head -5
echo ""

echo "BuggySSNHelperIncorrectFormat:"
sed -i "s|import { SSNHelper } from '../src/.*';|import { SSNHelper } from '../src/bugs/BuggySSNHelperIncorrectFormat';|" "$test_file"
npm test -- practice_write_mocked_tests/tests/SSNHelper.test.js 2>&1 | grep -E "×" | head -5
echo ""

echo "BuggySSNHelperMessyLuhn:"
sed -i "s|import { SSNHelper } from '../src/.*';|import { SSNHelper } from '../src/bugs/BuggySSNHelperMessyLuhn';|" "$test_file"
npm test -- practice_write_mocked_tests/tests/SSNHelper.test.js 2>&1 | grep -E "×" | head -5
echo ""

echo "BuggySSNHelperWrongLength:"
sed -i "s|import { SSNHelper } from '../src/.*';|import { SSNHelper } from '../src/bugs/BuggySSNHelperWrongLength';|" "$test_file"
npm test -- practice_write_mocked_tests/tests/SSNHelper.test.js 2>&1 | grep -E "×" | head -5
echo ""

echo "BuggySSNHelperAllowDay00:"
sed -i "s|import { SSNHelper } from '../src/.*';|import { SSNHelper } from '../src/bugs/BuggySSNHelperAllowDay00';|" "$test_file"
npm test -- practice_write_mocked_tests/tests/SSNHelper.test.js 2>&1 | grep -E "×" | head -5
echo ""

# Restore
sed -i "s|import { SSNHelper } from '../src/.*';|import { SSNHelper } from '../src/correct/SSNHelper';|" "$test_file"
