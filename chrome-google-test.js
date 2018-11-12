/* This seems to work EVEN if *NOT* called with driver in env PATH like this:
   env PATH="$PATH:./node_modules/.bin/" node chrome-google-test.js 
   I also had to install chromedriver: npm i chromedriver -g */

var webdriver = require('selenium-webdriver');
var until = require('selenium-webdriver').until;
const path = require('path');
const fs = require('fs');
var chrome = require('selenium-webdriver/chrome');
var driverpath = (__dirname + '/node_modules/.bin/chromedriver.exe');
// driverpath = path.normalize(driverpath); // strangely this test on edge doesnt work if path is normalized.
console.log("driverpath: " + driverpath);

var service = new chrome.ServiceBuilder(driverpath)
  // .setPort(0) // Server port, 0 = any free port.
  .build();

var options = new chrome.Options();

var driver = chrome.Driver.createSession(options, service);

webdriver.WebDriver.prototype.saveScreenshot = function(filename) {
  return driver.takeScreenshot().then(function(data) {
      fs.writeFile(filename, data.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
          if(err) throw err;
      });
  })
};

driver.get('https://www.google.com').then(function(){
  driver.findElement(webdriver.By.name('q')).sendKeys('end to end testing\n').then(function(){
    driver.getTitle().then(function(title) {
      console.log('The title is: ' + title);
      driver.saveScreenshot('screenshot.png');
      driver.quit();
    }).catch(error => { console.log('caught1', error.message); });
  }).catch(error => { console.log('caught2', error.message); });
}).catch(error => { console.log('caught3', error.message); });
