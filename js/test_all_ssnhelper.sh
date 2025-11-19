#!/bin/bash

# Script to test all buggy versions of SSNHelper

echo "Testing SSNHelper against all versions..."
echo ""

# Array of all versions
versions=(
  "correct/SSNHelper"
  "bugs/BuggySSNHelperAllowDayUpTo30"
  "bugs/BuggySSNHelperAllowMonth0"
  "bugs/BuggySSNHelperIncorrectFormat"
  "bugs/BuggySSNHelperMessyLuhn"
  "bugs/BuggySSNHelperWrongLength"
  "bugs/BuggySSNHelperAllowDay00"
)

test_file="practice/practice_write_mocked_tests/tests/SSNHelper.test.js"

for version in "${versions[@]}"; do
  echo "=========================================="
  echo "Testing: $version"
  echo "=========================================="
  
  # Update import in test file
  sed -i "s|import { SSNHelper } from '../src/.*';|import { SSNHelper } from '../src/$version';|" "$test_file"
  
  # Run tests and capture result
  npm test -- practice_write_mocked_tests/tests/SSNHelper.test.js 2>&1 | grep -E "(PASS|FAIL|Tests:)"
  
  echo ""
done

# Restore to correct version
sed -i "s|import { SSNHelper } from '../src/.*';|import { SSNHelper } from '../src/correct/SSNHelper';|" "$test_file"

echo "All tests completed. Test file restored to correct version."
