const tests = {};
tests["Admin-user-attest1"] = async (driver, vars, opts) => {
  await driver.get((new URL("/", BASE_URL)).href);
  await driver.manage().window().setSize(...(`1734x1400`.split("x").map((s) => parseInt(s))));
  await driver.wait(until.elementLocated(By.linkText(`Administration`)), configuration.timeout);
  await driver.findElement(By.linkText(`Administration`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.linkText(`Användare`)), configuration.timeout);
  await driver.findElement(By.linkText(`Användare`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`input.input.search`)), configuration.timeout);
  await driver.findElement(By.css(`input.input.search`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`input.input.search`)), configuration.timeout);
  await driver.findElement(By.css(`input.input.search`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`kopparhed`);
    });
  });
  await driver.wait(until.elementLocated(By.css(`button.button.search`)), configuration.timeout);
  await driver.findElement(By.css(`button.button.search`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.linkText(`PEAB\\PSDANKOP`)), configuration.timeout);
  await driver.findElement(By.linkText(`PEAB\\PSDANKOP`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.linkText(`Attesträttigheter`)), configuration.timeout);
  await driver.findElement(By.linkText(`Attesträttigheter`)).then(element => {
    return element.click();
  });
};
module.exports = tests;
