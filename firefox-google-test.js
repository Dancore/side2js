var webdriver = require('selenium-webdriver');
var By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until,
    firefox = require('selenium-webdriver/firefox');

var driver = new firefox.Driver();
//var driver = new webdriver.Builder().
//   withCapabilities(webdriver.Capabilities.chrome()).build();

driver.get('http://www.google.com/ncr');
driver.findElement(By.name('q')).sendKeys('webdriver');
driver.findElement(By.name('btnG')).click();
driver.wait(until.titleIs('webdriver - Google Search'), 1000);
driver.quit();
