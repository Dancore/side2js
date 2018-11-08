/* This seems to work if called with driver in env PATH like this:
   env PATH="$PATH:./node_modules/.bin/" node google-test.js */
var webdriver = require('selenium-webdriver');
var until = require('selenium-webdriver').until;
const path = require('path');
var edge = require('selenium-webdriver/edge');

var capabilities = {
  // 'browserName' : 'firefox'
}
  
var service = new edge.ServiceBuilder()
     .setPort(55555)
     .build();

var options = new edge.Options();

var driver = edge.Driver.createSession(options, service);

driver.get('https://www.google.com').then(function(){
  driver.findElement(webdriver.By.name('q')).sendKeys('BrowserStack\n').then(function(){
    driver.getTitle().then(function(title) {
      console.log('The title is: ' + title);
      driver.quit();
    }).catch(error => { console.log('caught1', error.message); });
  }).catch(error => { console.log('caught2', error.message); });
}).catch(error => { console.log('caught3', error.message); });
