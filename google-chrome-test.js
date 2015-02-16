var webdriver = require('selenium-webdriver');
var until = require('selenium-webdriver').until;

var capabilities = {
  // 'browserName' : 'firefox'
}

var chrome = require('selenium-webdriver/chrome');
var service = new chrome.ServiceBuilder(__dirname + '/node_modules/.bin/chromedriver').build();
var driver = new chrome.createDriver(capabilities, service);

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
