const path = require('path');
const puppeteer = require('puppeteer');

(async() => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${path.join(__dirname, 'test.html')}`);
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();