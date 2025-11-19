#!/bin/bash

# Test SwedishSocialSecurityNumber against all buggy versions

test_file="practice/practice_write_mocked_tests/tests/SwedishSocialSecurityNumber.test.js"

versions=(
  "correct/SwedishSocialSecurityNumber"
  "bugs/BuggySwedishSocialSecurityNumberNoLenCheck"
  "bugs/BuggySwedishSocialSecurityNumberNoTrim"
  "bugs/BuggySwedishSocialSecutityNumberNoLuhn"
  "bugs/BuggySwedishSocialSecutityNumberWrongYear"
)

for version in "${versions[@]}"; do
  echo "=========================================="
  echo "Testing: $version"
  echo "=========================================="
  
  # Update import
  sed -i "s|import { SwedishSocialSecurityNumber } from '../src/.*'|import { SwedishSocialSecurityNumber } from '../src/$version'|" "$test_file"
  
  # Run tests
  npm test -- practice_write_mocked_tests/tests/SwedishSocialSecurityNumber.test.js 2>&1 | grep -E "(PASS|FAIL|Tests:|×)"
  
  echo ""
done

# Restore
sed -i "s|import { SwedishSocialSecurityNumber } from '../src/.*'|import { SwedishSocialSecurityNumber } from '../src/correct/SwedishSocialSecurityNumber'|" "$test_file"

echo "Done!"
