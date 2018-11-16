// const jest = require('jest');
// var path = require('path');
// var tmp = "C:\\Apps\\nodejs\\node_modules\\selenium-side-runner\\node_modules\\jest-environment-selenium\\dist\\setup.js"
// var tmp = "C:\Apps\nodejs\node_modules\selenium-side-runner\node_modules\jest-environment-selenium\dist\setup.js"
// tmp = path.normalize(tmp);
// console.log(tmp);

const tests = require("./BBA-test.js");
global.Key = require('selenium-webdriver').Key;
global.URL = require('url').URL;
global.BASE_URL = configuration.baseUrl || 'https://bbadev.peab.se';
// global.BASE_URL = 'https://bbadev.peab.se';
let vars = {};
jest.setTimeout(300000);
describe("Default Suite", () => {
  it("Admin-user-attest1", async () => {
    await tests["Admin-user-attest1"](driver, vars);
    await driver.getTitle().then(title => {
      expect(title).toBeDefined();
    });
  });
});
beforeEach(() => {
  vars = {};
});
afterEach(async () => (cleanup()));
