/* This seems to work if called with driver in env PATH like this:
   env PATH="$PATH:./node_modules/.bin/" node google-test.js */
var webdriver = require('selenium-webdriver');
var until = require('selenium-webdriver').until;
const path = require('path');
var edge = require('selenium-webdriver/edge');
var driverpath = (__dirname + '/node_modules/.bin/MicrosoftWebDriver.exe');
// driverpath = path.normalize(driverpath); // strangely this test on Edge doesnt work if path is normalized.
console.log("driverpath: " + driverpath);

var service = new edge.ServiceBuilder(driverpath)
  .setPort(0) // Server port, 0 = any free port.
  .build();

var options = new edge.Options();

var driver = edge.Driver.createSession(options, service);

driver.get('https://www.google.com').then(function(){
  driver.findElement(webdriver.By.name('q')).sendKeys('end to end testing\n').then(function(){
    driver.getTitle().then(function(title) {
      console.log('The title is: ' + title);
      driver.quit();
    }).catch(error => { console.log('caught1', error.message); });
  }).catch(error => { console.log('caught2', error.message); });
}).catch(error => { console.log('caught3', error.message); });
