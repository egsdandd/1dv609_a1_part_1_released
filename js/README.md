# Javascript version

The js project is arranged as follows

* /examination/ folder is placeholder for the examination, dont change it until then
* /practice/ folder contains the code for the two practice tasks
* /practice/\*task\*/src contains correct and buggy versions of the system under test, you should not change these classes, but may need to read them
* /practice/\*task\*/tests/password.test.js this is where you add your tests
* /practice/\*task\*/tests/

## Selecting version of Password

select which version of Password by commenting out/in in the top of the file password.test.js

```js
...
import { Password } from '../src/sut_versions/BugMissingNumberCheck';
//import { Password } from '../src/sut_versions/BugWrongMessage'; 
//import { Password } from '../src/Correct'; 
...

Move into js folder
```bash
cd js
```

Install tools with:

```bash
npm install
```

Run all test suites:

```bash
npm test
```

Example output:

```bash
 PASS  practice/practice_write_run_tests/tests/password.test.js                                                                                                                                                                                                             
 PASS  examination/examination.test.js
------------|---------|----------|---------|---------|-------------------                                                                                                                                                                                                   
File        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------|---------|----------|---------|---------|-------------------
All files   |    5.55 |        0 |       0 |    5.88 |                  
 Correct.js |    5.55 |        0 |       0 |    5.88 | 3-40             
------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.838 s, estimated 1 s
```
