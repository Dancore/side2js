// tmp = path.normalize(tmp);
// console.log(tmp);

const tests = require("./tests/");
global.Key = require('selenium-webdriver').Key;
global.URL = require('url').URL;
global.BASE_URL = configuration.baseUrl || 'https://bbadev.peab.se';
let vars = {};
jest.setTimeout(300000);

console.log(Object.entries(tests));
tests.forEach( obj => { Object.entries(obj).forEach(( [key, fnk]) => { 
    console.log(`test name: ${key}`); // + '\ntest function:\n' + fnk );
  });
});
// process.exit;

describe("Auto Test Suite", () => {
  // it("Admin-user-attest1", async () => {
  //   await tests["Admin-user-attest1"](driver, vars);
  //   await driver.getTitle().then(title => {
  //     expect(title).toBeDefined();
  //   });
  // });
  tests.forEach( obj => { Object.entries(obj).forEach(( [key, fnk]) => {
    it("obj", async () => { 
      await fnk(driver, vars);
      await driver.getTitle().then(title => { 
        expect(title).toBeDefined();
      });
    });
    });
  });

});
beforeEach(() => {
  vars = {};
});
afterEach(async () => (cleanup()));
