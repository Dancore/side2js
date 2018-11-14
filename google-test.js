/* This seems to work EVEN if *NOT*  called with driver in env PATH like this:
   env PATH="$PATH:./node_modules/.bin/" node google-test.js 
   I also had to install edgedriver like this: # npm i edgedriver -g */
var webdriver = require('selenium-webdriver');
var until = require('selenium-webdriver').until;
var selianize = require('selianize').default;
const path = require('path');
const fs = require('fs');
var beautify = require('js-beautify').js;
var edge = require('selenium-webdriver/edge');
var driverpath = (__dirname + '/node_modules/.bin/MicrosoftWebDriver.exe');
// driverpath = path.normalize(driverpath); // strangely this test on Edge doesnt work if path is normalized.
console.log("driverpath: " + driverpath);

var service = new edge.ServiceBuilder(driverpath)
  .setPort(0) // Server port, 0 = any free port.
  .build();

// var options = new edge.Options();

// var driver = edge.Driver.createSession(options, service);

webdriver.WebDriver.prototype.saveScreenshot = function(filename) {
  return driver.takeScreenshot().then(function(data) {
      fs.writeFile(filename, data.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
          if(err) throw err;
      });
  })
};

// driver.get('https://www.google.com').then(function(){
//   driver.findElement(webdriver.By.name('q')).sendKeys('end to end testing\n').then(function(){
//     driver.getTitle().then(function(title) {
//       console.log('The title is: ' + title);
//       driver.saveScreenshot('screenshot.png');
//       driver.quit();
//     }).catch(error => { console.log('caught1', error.message); });
//   }).catch(error => { console.log('caught2', error.message); });
// }).catch(error => { console.log('caught3', error.message); });

var sidefile = "BBA.side";
// var filedata = fs.readFileSync(sidefile).toString();
const obj = JSON.parse(fs.readFileSync(sidefile).toString());
console.log('Side file ' + sidefile + ': ' + obj.id);
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
    fs.writeFileSync(obj.name + ".test.js", beautify(tests, { indent_size: 2, space_in_empty_paren: true }));
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
