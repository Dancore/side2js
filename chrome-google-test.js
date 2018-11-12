/* This seems to work if called with driver in env PATH like this:
   env PATH="$PATH:./node_modules/.bin/" node chrome-google-test.js */
var webdriver = require('selenium-webdriver');
var until = require('selenium-webdriver').until;
const path = require('path');
// var pchr = path.normalize('selenium-webdriver/chrome');
// console.log("path: " + pchr);
// // var chrome = require(pchr);
// var chrome = require('selenium-webdriver/chrome');

var capabilities = {
  // 'browserName' : 'firefox'
}
// var driverpath = path.normalize(__dirname + '/node_modules/.bin/chromedriver.exe');
// console.log("path: " + driverpath);

// var service = new chrome.ServiceBuilder(driverpath).build();
// var driver = new chrome.createDriver(capabilities, service);
// var driver = new chrome.Driver();
var driver = new webdriver.Builder()
  // .forBrowser('chrome')
  .forBrowser('firefox')
  .build();
  
  // ServiceBuilder(driverpath);
// var driver = new webdriver.Builder().forBrowser('chrome').build();
// var driver = chrome.build();

// driver.get('http://www.google.com/ncr');
// driver.findElement(webdriver.By.name('q')).sendKeys('webdriver');
// driver.findElement(webdriver.By.name('btnG')).click();
// //driver.wait(until.titleIs('webdriver - Google Search'), 1000);

// driver.wait(function() {
//  return driver.getTitle().then(function(title) {
//    return title === 'webdriver - Google Search';
//  });
// }, 1000);

// driver.quit();
webdriver.WebDriver.prototype.saveScreenshot = function(filename) {
  return driver.takeScreenshot().then(function(data) {
      fs.writeFile(filename, data.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
          if(err) throw err;
      });
  })
};

driver.get('https://www.google.com').then(function(){
  driver.findElement(webdriver.By.name('q')).sendKeys('BrowserStack\n').then(function(){
    driver.getTitle().then(function(title) {
      console.log('The title is: ' + title);
      driver.saveScreenshot('screenshot.png');
      driver.quit();
    }).catch(error => { console.log('caught1', error.message); });
  }).catch(error => { console.log('caught2', error.message); });
}).catch(error => { console.log('caught3', error.message); });
