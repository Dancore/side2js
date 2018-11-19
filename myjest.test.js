// tmp = path.normalize(tmp);
// console.log(tmp);

const tests = require("./BBA-test.js");
global.Key = require('selenium-webdriver').Key;
global.URL = require('url').URL;
global.BASE_URL = configuration.baseUrl || 'https://bbadev.peab.se';
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
