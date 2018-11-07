/* This seems to work if called with driver in env PATH like this:
   env PATH="$PATH:./node_modules/.bin/" node chrome-google-test.js */
var webdriver = require('selenium-webdriver');
var until = require('selenium-webdriver').until;
const path = require('path');
var pchr = path.normalize('selenium-webdriver/chrome');
console.log("path: " + pchr);
var chrome = require(pchr);
// var chrome = require('selenium-webdriver/chrome');

var capabilities = {
  // 'browserName' : 'firefox'
}
var thepath = path.normalize(__dirname + '/node_modules/.bin/chromedriver.exe');
console.log("path: " + thepath);

// var service = new chrome.ServiceBuilder(thepath).build();
// var driver = new chrome.createDriver(capabilities, service);
// var driver = new chrome.Driver();
var chrome = new webdriver.Builder()
  .forBrowser('chrome');
  
  // ServiceBuilder(thepath);
// var driver = new webdriver.Builder().forBrowser('chrome').build();
var driver = chrome.build();

driver.get('http://www.google.com/ncr');
driver.findElement(webdriver.By.name('q')).sendKeys('webdriver');
driver.findElement(webdriver.By.name('btnG')).click();
//driver.wait(until.titleIs('webdriver - Google Search'), 1000);

driver.wait(function() {
 return driver.getTitle().then(function(title) {
   return title === 'webdriver - Google Search';
 });
}, 1000);

driver.quit();
