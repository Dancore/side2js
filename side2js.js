/* Parse Selenium side script and translate to (node) JS. */

const selianize = require('selianize').default;
const path = require('path');
const fs = require('fs');
const beautify = require('js-beautify').js;
var argv = process.argv;
var sidefile = argv[2];
var jsfile = null;
if (!argv[2]) {
  console.log('Usage: ' + path.basename(argv[1]) + ' side-script[s] [output-path]');
  console.warn('Quitting (nothing to do)');
  process.exit();
}

// var filedata = fs.readFileSync(sidefile).toString();
const obj = JSON.parse(fs.readFileSync(sidefile).toString());
console.log('Side file ' + sidefile + ': ' + obj.id);
if (argv[3]) jsfile = argv[3];
else jsfile = obj.name + "-test.js";

selianize(obj).then(
  code => {
    // code.tests.forEach(test => {
    //   console.log('selianized code: \n' + test.code + '\n');
    // });
    const tests = code.tests
      .reduce((tests, test) => {
        // console.log('selianized test: ' + test.name + ' ' + test.code);
        return (tests += test.code);
      }, 'const tests = {};')
      .concat(';module.exports = tests;');
    fs.writeFileSync(obj.name + "-test.js", beautify(tests, { indent_size: 2, space_in_empty_paren: true }));
    code.suites.forEach(suite => {
      console.log('suite: ' + suite.name);
      // fs.writeFileSync(obj.name + ".test.js", code);
      if (!suite.tests) {
        // not parallel
        console.log('no tests?: ' + suite.name);
      } else if (suite.tests.length) {
        // fs.mkdirSync(path.join(projectPath, suite.name));
        // parallel suite
        suite.tests.forEach(test => {
          console.log('selianized test: ' + test.name);
        });
      }
    });
  }, 
  error => { console.log('caught', error.message); } 
);
