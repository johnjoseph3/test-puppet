const path = require('path');

import puppeteer from "puppeteer";

const APP = `file://${path.join(__dirname, 'test.html')}`;

let page;
let browser;
const width = 1920;
const height = 1080;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});
afterAll(() => {
  browser.close();
});

describe("UI Test", () => {
  test("H1 width", async () => {
    await page.goto(APP);
    const h1Width = await page.evaluate(() => document.querySelector('#header').offsetWidth );
    expect(h1Width).toEqual(1904);
  }, 16000);
});
