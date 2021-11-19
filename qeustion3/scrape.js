const puppeteer = require("puppeteer");
let param = [];

process.argv.forEach(function (val, index, array) {
  if (index > 1) {
    param = val;
  }
});

async function getDesc() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://codequiz.azurewebsites.net/");
  const form = await page.$("body > input[type=button]");
  await form.evaluate((form) => form.click());

  const tablePage = await browser.newPage();
  await tablePage.goto("https://codequiz.azurewebsites.net/");
  const table = await tablePage.$("body > table");
  let data = "";
  switch (param) {
    case "B-INCOMESSF":
      data = await table.$$eval(
        "body > table > tbody > tr:nth-child(2) > td:nth-child(2)",
        (tds) =>
          tds.map((td) => {
            return td.innerText;
          })
      );
      break;
    case "BM70SSF":
      data = await table.$$eval(
        "body > table > tbody > tr:nth-child(3) > td:nth-child(2)",
        (tds) =>
          tds.map((td) => {
            return td.innerText;
          })
      );
      break;
    case "BEQSSF":
      data = await table.$$eval(
        "body > table > tbody > tr:nth-child(4) > td:nth-child(2)",
        (tds) =>
          tds.map((td) => {
            return td.innerText;
          })
      );
      break;
    case "B-FUTURESSF":
      data = await table.$$eval(
        "body > table > tbody > tr:nth-child(5) > td:nth-child(2)",
        (tds) =>
          tds.map((td) => {
            return td.innerText;
          })
      );
      break;
  }

  console.log(data);

  await browser.close;
}

getDesc();
