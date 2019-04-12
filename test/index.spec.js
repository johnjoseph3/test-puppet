const path = require('path');
import puppeteer from "puppeteer";

const dotenv = require('dotenv');
dotenv.config();

const APP = `file://${path.join(__dirname, 'test.html')}`;

let page;
let browser;
const width = parseInt(process.env.BROWSER_WIDTH);
const height = 1080;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
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
  test("Header width", async () => {
    await page.goto(APP);

    const headerWidth = await page.evaluate(() =>
      document.querySelector('#header').offsetWidth
    );

    expect(headerWidth).toEqual(1904);
  }, 16000);

  test("Flex columns widths", async () => {
    await page.goto(APP);

    const firstFlexWidth = await page.evaluate(() =>
      document.querySelector('#first-flex').offsetWidth
    );

    const secondFlexWidth = await page.evaluate(() =>
      document.querySelector('#second-flex').offsetWidth
    );

    expect(firstFlexWidth).toEqual(952);
    expect(secondFlexWidth).toEqual(firstFlexWidth);
  }, 16000);
});

